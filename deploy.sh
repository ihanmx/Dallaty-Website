#!/bin/bash
# ===========================================
# Dallaty Website - Deployment Script
# ===========================================
# Run with: chmod +x deploy.sh && ./deploy.sh
# ===========================================

set -e  # Exit on error

echo "🚀 Starting Dallaty Website Deployment..."
echo "=========================================="

# Variables
APP_DIR="/var/www/dallaty"
SERVER_DIR="$APP_DIR/server"
CLIENT_DIR="$APP_DIR/client"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${GREEN}[STEP]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ===========================================
# 1. System Updates
# ===========================================
print_step "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# ===========================================
# 2. Setup Swap (Prevent OOM)
# ===========================================
print_step "Checking Swap Space..."
if [ $(swapon --show | wc -l) -eq 0 ]; then
    print_step "Creating 2GB Swap File..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    echo "Swap created successfully."
else
    echo "Swap already exists."
fi

# ===========================================
# 3. Install Node.js (LTS)
# ===========================================
print_step "Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo "Node.js version: $(node -v)"
    echo "NPM version: $(npm -v)"
else
    echo "Node.js already installed: $(node -v)"
fi

# ===========================================
# 3. Install PostgreSQL
# ===========================================
print_step "Installing PostgreSQL..."
if ! command -v psql &> /dev/null; then
    sudo apt install -y postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
else
    echo "PostgreSQL already installed"
fi

# ===========================================
# 4. Install Nginx
# ===========================================
print_step "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
else
    echo "Nginx already installed"
fi

# ===========================================
# 5. Install PM2
# ===========================================
print_step "Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
else
    echo "PM2 already installed"
fi

# ===========================================
# 6. Create Application Directory
# ===========================================
print_step "Creating application directory..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# ===========================================
# 7. Create PM2 Log Directory
# ===========================================
print_step "Creating PM2 log directory..."
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# ===========================================
# 8. Setup Database
# ===========================================
print_step "Setting up PostgreSQL database..."
echo "Creating database and user..."

# Generate random password
DB_PASSWORD=$(openssl rand -base64 16)
echo ""
echo "=========================================="
echo -e "${YELLOW}IMPORTANT: Save this database password!${NC}"
echo "Database Password: $DB_PASSWORD"
echo "=========================================="
echo ""

sudo -u postgres psql << EOF
CREATE DATABASE dhallaty;
ALTER USER postgres WITH PASSWORD '$DB_PASSWORD';
\c dhallaty
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150),
    description TEXT,
    location VARCHAR(100),
    file VARCHAR(255),
    resource VARCHAR(100),
    terms BOOLEAN DEFAULT false,
    fees BOOLEAN DEFAULT false
);
EOF

echo "Database 'dhallaty' created successfully!"

# ===========================================
# 9. Copy Application Files
# ===========================================
print_step "Copying application files to $APP_DIR..."
# Copy from current directory to target directory
# We assume the script is run from the directory where the 'server' and 'client' folders are located.
if [ -d "./server" ] && [ -d "./client" ]; then
    echo "Files found. Copying..."
    # Create destination directories first
    sudo mkdir -p $SERVER_DIR
    sudo mkdir -p $CLIENT_DIR
    
    # Copy files
    sudo cp -r ./server/* $SERVER_DIR/
    sudo cp -r ./client/* $CLIENT_DIR/
    
    # Also copy package files if they exist in root
    [ -f "package.json" ] && sudo cp package.json $APP_DIR/
    [ -f "deploy.sh" ] && sudo cp deploy.sh $APP_DIR/
    [ -f "nginx.conf" ] && sudo cp nginx.conf $APP_DIR/
    
    # Fix permissions recursively so 'ubuntu' user can access/build
    print_step "Fixing permissions..."
    sudo chown -R $USER:$USER $APP_DIR
else
    print_error "Source 'server' or 'client' directories not found in current location!"
    echo "Please run this script from the directory containing 'server' and 'client' folders."
    exit 1
fi

# ===========================================
# 10. Install Dependencies & Build
# ===========================================
print_step "Installing server dependencies..."
cd $SERVER_DIR
npm install --production

print_step "Installing client dependencies & building..."
cd $CLIENT_DIR
npm install
# Increase memory for build to prevent OOM
export NODE_OPTIONS="--max-old-space-size=2048"
REACT_APP_API_URL=http://185.164.25.144 REACT_APP_FRONTEND_URL=http://185.164.25.144 npm run build

# ===========================================
# 11. Create .env file
# ===========================================
print_step "Creating server .env file..."
cat > $SERVER_DIR/.env << EOF
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
POSTGRESQL_PASSWORD=$DB_PASSWORD

# PayTabs Payment Gateway
PAYTABS_PROFILE_ID=121353
PAYTABS_SERVER_KEY=SLJ9LLK22M-JLZWB62NHG-HLLDWWMM2D
PAYTABS_BASE_URL=https://secure.paytabs.sa/payment/request

# URLs
FRONTEND_URL=http://185.164.25.144
BACKEND_URL=http://185.164.25.144

# Zapier Webhooks
ZAPIER_PAYMENT_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/25947184/uwlzlkr/
ZAPIER_ITEM_DETAILS_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/25947184/uwpwpf3/
EOF

echo ""
print_warning "Remember to update the following in $SERVER_DIR/.env:"
echo "  - PAYTABS_PROFILE_ID"
echo "  - PAYTABS_SERVER_KEY"
echo "  - ZAPIER_PAYMENT_WEBHOOK_URL"
echo "  - ZAPIER_ITEM_DETAILS_WEBHOOK_URL"
echo ""

# ===========================================
# 12. Setup Nginx
# ===========================================
print_step "Configuring Nginx..."
sudo cp $APP_DIR/nginx.conf /etc/nginx/sites-available/dallaty
sudo ln -sf /etc/nginx/sites-available/dallaty /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# ===========================================
# 13. Start Application with PM2
# ===========================================
print_step "Starting application with PM2..."
cd $SERVER_DIR
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup systemd -u $USER --hp $HOME

# ===========================================
# 14. Open Firewall Ports
# ===========================================
print_step "Configuring firewall..."
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable

# ===========================================
# Done!
# ===========================================
echo ""
echo "=========================================="
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo "=========================================="
echo ""
echo "🌐 Website: http://185.164.25.144"
echo "🔧 API Health: http://185.164.25.144/health"
echo ""
echo "📋 Useful Commands:"
echo "  pm2 status          - Check app status"
echo "  pm2 logs dallaty    - View logs"
echo "  pm2 restart dallaty - Restart app"
echo ""
echo "⚠️  Don't forget to:"
echo "  1. Update PayTabs credentials in $SERVER_DIR/.env"
echo "  2. Save the database password shown above!"
echo ""

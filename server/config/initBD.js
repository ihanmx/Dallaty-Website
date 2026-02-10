import pool from "./dp.js";

export const initializeTables = async () => {
  try {
    await pool.query(`
      /* New admins table */
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS foundreports (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(150),
        description TEXT,
        location VARCHAR(100),
        file VARCHAR(255),
        terms BOOLEAN DEFAULT FALSE,
        instruction BOOLEAN DEFAULT FALSE,
        found_date DATE,
        recipientdescription VARCHAR(255),
        reportid VARCHAR(50),
        status VARCHAR(30) DEFAULT 'new'
      );

      CREATE TABLE IF NOT EXISTS lostreports (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(150),
        description TEXT,
        location VARCHAR(100),
        file VARCHAR(255),
        resource VARCHAR(255),
        terms BOOLEAN DEFAULT FALSE,
        fees BOOLEAN DEFAULT FALSE,
        reportid VARCHAR(50),
        status VARCHAR(30) DEFAULT 'new',
        payment_token VARCHAR(255) DEFAULT 'not_matched',
        created_date DATE DEFAULT CURRENT_DATE
      );

      CREATE TABLE IF NOT EXISTS matched_items (
        id SERIAL PRIMARY KEY,
        lost_reportid VARCHAR(50) NOT NULL,
        found_reportid VARCHAR(50) NOT NULL,
        lost_report_date DATE,
        found_date DATE,
        description TEXT,
        location VARCHAR(100),
        recipient_details VARCHAR(255),
        matched_at TIMESTAMP DEFAULT NOW(),
        file VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50),
        paytabs_tran_ref VARCHAR(100),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        report_id VARCHAR(50),
        email VARCHAR(255),
        amount NUMERIC(10,2) DEFAULT 50.00,
        currency VARCHAR(10) DEFAULT 'SAR',
        payment_token VARCHAR(100) UNIQUE,
        updated_at TIMESTAMP DEFAULT NOW(),
        cart_id VARCHAR(255),
        agreed_to_terms BOOLEAN DEFAULT FALSE
      );
    `);

    console.log("✅ All tables initialized successfully");
  } catch (err) {
    console.error("Error initializing tables:", err);
    process.exit(1);
  }
};

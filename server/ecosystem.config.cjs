module.exports = {
    apps: [
        {
            name: "dallaty-server",
            script: "index.js",
            cwd: "/var/www/dallaty/server",
            instances: 1,
            exec_mode: "fork",
            autorestart: true,
            watch: false,
            max_memory_restart: "500M",
            env: {
                NODE_ENV: "production",
                PORT: 5000
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 5000
            },
            error_file: "/var/log/pm2/dallaty-error.log",
            out_file: "/var/log/pm2/dallaty-out.log",
            log_file: "/var/log/pm2/dallaty-combined.log",
            time: true
        }
    ]
};

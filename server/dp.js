import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Users",
  password: "Qwsdcv123.",
  port: 5432,
});

//Test the db connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL database");
  release();
});

export default pool;

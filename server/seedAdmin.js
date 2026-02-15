/**
 * TEST & SETUP SCRIPT
 *
 * * Purpose of this file:
 * Create an initial "admin" account to test the dashboard and system functionality.
 * This script is for development/testing purposes to seed the database with an initial admin.
 *
 * *Security Note:
 * Please change the password or delete this account when deploying to a live environment (Production).
 */

import pool from "./config/dp.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const seedAdmin = async () => {
  const email = "admin@test.com";
  const password = "123456";

  try {
    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Try to insert (Do nothing if email exists)
    const query = `
      INSERT INTO admins (email, password)
      VALUES ($1, $2)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;

    const result = await pool.query(query, [email, hashedPassword]);

    if (result.rows.length > 0) {
      console.log("Admin created successfully!");
    } else {
      console.log("Admin already exists. No changes made.");
    }

    process.exit(0);

  } catch (error) {
    console.error("Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
/**
 * TEST DATA SEED SCRIPT
 *
 * Purpose:
 * Seeds the database with 40 rows in foundreports, lostreports, and payments
 * to test pagination and UI behavior.
 *
 * Security Note:
 * DEV ONLY — do not run in production.
 *
 * Usage:
 * node seedData.js
 * or
 * # Seed test data (40 rows per table)
npm run seed:data
 */

import pool from "./config/dp.js";
import dotenv from "dotenv";
dotenv.config();

const seedData = async () => {
  try {
    // Guard: skip if data already exists to avoid duplicate rows on re-run
    const { rows } = await pool.query(
      "SELECT COUNT(*) FROM lostreports WHERE reportid LIKE 'LOST-%'",
    );
    if (parseInt(rows[0].count) > 0) {
      console.log("Seed data already exists. No changes made.");
      process.exit(0);
    }

    // ── 1. FOUNDREPORTS ──────────────────────────────────────────────────────
    await pool.query(`
      INSERT INTO foundreports (
        name, email, description, location, file,
        terms, instruction, found_date, recipientdescription, reportid, status
      )
      SELECT
        'Found User ' || i,
        'founduser' || i || '@example.com',
        'Found item number ' || i || '. Contact if it belongs to you.',
        CASE (i % 5)
          WHEN 0 THEN 'Riyadh'
          WHEN 1 THEN 'Jeddah'
          WHEN 2 THEN 'Dammam'
          WHEN 3 THEN 'Mecca'
          WHEN 4 THEN 'Medina'
        END,
        NULL,
        TRUE,
        TRUE,
        CURRENT_DATE - (i || ' days')::INTERVAL,
        'Recipient description row ' || i,
        'FOUND-' || LPAD(i::TEXT, 4, '0'),
        'new'
      FROM generate_series(1, 40) AS i;
    `);
    console.log("foundreports seeded (40 rows)");

    // ── 2. LOSTREPORTS ───────────────────────────────────────────────────────
    await pool.query(`
      INSERT INTO lostreports (
        name, email, description, location, file,
        resource, terms, fees, reportid, status, payment_token, created_date
      )
      SELECT
        'Lost User ' || i,
        'lostuser' || i || '@example.com',
        'Lost item number ' || i || '. Please help find it.',
        CASE (i % 5)
          WHEN 0 THEN 'Riyadh'
          WHEN 1 THEN 'Jeddah'
          WHEN 2 THEN 'Dammam'
          WHEN 3 THEN 'Mecca'
          WHEN 4 THEN 'Medina'
        END,
        NULL,
        CASE (i % 4)
          WHEN 0 THEN 'Wallet'
          WHEN 1 THEN 'Phone'
          WHEN 2 THEN 'Keys'
          WHEN 3 THEN 'Bag'
        END,
        TRUE,
        TRUE,
        'LOST-' || LPAD(i::TEXT, 4, '0'),
        'new',
        'not_matched',
        CURRENT_DATE - (i || ' days')::INTERVAL
      FROM generate_series(1, 40) AS i;
    `);
    console.log("lostreports seeded (40 rows)");

    // ── 3. PAYMENTS ──────────────────────────────────────────────────────────
    await pool.query(`
      INSERT INTO payments (
        order_id, paytabs_tran_ref, status, report_id,
        email, amount, currency, payment_token, cart_id, agreed_to_terms
      )
      SELECT
        'ORD-'       || LPAD(i::TEXT, 4, '0'),
        'PTABS-'     || LPAD(i::TEXT, 6, '0'),
        'pending',
        'LOST-'      || LPAD(i::TEXT, 4, '0'),
        'lostuser'   || i || '@example.com',
        25.00,
        'SAR',
        'PAY-TOKEN-' || LPAD(i::TEXT, 4, '0'),
        'CART-'      || LPAD(i::TEXT, 4, '0'),
        TRUE
      FROM generate_series(1, 40) AS i;
    `);
    console.log("payments seeded (40 rows)");

    console.log("\nAll seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
};

seedData();

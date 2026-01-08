import pool from "../config/dp.js";

export const getItemDetails = async (req, res) => {
  try {
    const { reportId } = req.params; //extract report ID from params obj

    if (!reportId) {
      return res.status(400).json({ error: "Missing reportId parameter" });
    }
    const matchedItemQuery = await pool.query(
      "SELECT * FROM matched_items WHERE lost_reportid=$1",
      [reportId]
    );

    if (matchedItemQuery.rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    const data = matchedItemQuery.rows[0];

    // For every date field, convert it to date-only format
    if (data.found_date) {
      data.found_date = new Date(data.found_date).toISOString().split("T")[0];
    }

    if (data.matched_at) {
      data.matched_at = new Date(data.matched_at).toISOString().split("T")[0];
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

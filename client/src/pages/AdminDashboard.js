//  Note: this page need for (Front designing) we only use this draft to test the back
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState({
    lostReports: [],
    foundReports: [],
    paymentRecords: [],
  });

  //the names of the json keys should match the backend to avoid setData conflict
  const [loading, setLoading] = useState(true);

  // ✅ Load all dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    console.log("Normalized dashboard state updated:", data);
  }, [data]);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/admin/dashboard-data");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      alert("Failed to load data from server.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Send payment email when admin matches item
  async function handleSendPayment(report) {
    try {
      const payload = {
        reportId: report.reportid,
        lostOwnerEmail: report.email,
        lostOwnerName: report.name,
      };

      const res = await axios.post(
        "http://localhost:5000/admin/confirm-match-lost",
        payload
      );

      alert(res.data.message || "Payment email sent successfully.");
      fetchDashboardData();
    } catch (err) {
      console.error("Error sending payment email:", err);
      alert("Failed to send payment email.");
    }
  }

  async function handleMatchFoundItem(report) {
    try {
      const payload = { reportId: report.reportid };

      const res = await axios.post(
        "http://localhost:5000/admin/confirm-match-found",
        payload
      );
      alert(res.data.message || "Payment email sent successfully.");
      fetchDashboardData(); //to reflect the update
    } catch (err) {
      console.error("Error updating the found item state", err);
      alert("Failed to update the found item state.");
    }
  }

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📊 Admin Dashboard</h1>

      {/* Lost Reports */}
      <section style={{ marginTop: "2rem" }}>
        <h2>🧾 Lost Reports</h2>
        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr style={{ background: "#eee" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* when the tables are empty */}
            {data.lostReports && data.lostReports.length === 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  No lost reports found.
                </td>
              </tr>
            ) : (
              // to avoid empty array errors
              (Array.isArray(data.lostReports) ? data.lostReports : []).map(
                (r) => (
                  <tr key={r.reportid}>
                    <td>{r.reportid}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.description}</td>
                    <td>{r.status}</td>
                    <td>
                      {/* Button only shows if not already processed */}
                      {r.status !== "found_pending_payment" &&
                      r.status !== "paid" ? (
                        <button onClick={() => handleSendPayment(r)}>
                          Confirm Match & Send Email
                        </button>
                      ) : (
                        <span>Already processed</span>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </section>

      {/* Found Reports */}
      <section style={{ marginTop: "2rem" }}>
        <h2>🔎 Found Reports</h2>
        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr style={{ background: "#eee" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.foundReports.length === 0 ? (
              <tr>
                <td colSpan="5" align="center">
                  No found reports found.
                </td>
              </tr>
            ) : (
              data.foundReports.map((r) => (
                <tr key={r.reportid}>
                  <td>{r.reportid}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.description}</td>
                  <td>{r.status}</td>
                  <td>
                    {/* Button only shows if not already processed */}
                    {r.status !== "matched" ? (
                      <button onClick={() => handleMatchFoundItem(r)}>
                        Confirm Match
                      </button>
                    ) : (
                      <span>Already processed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Payments */}
      <section style={{ marginTop: "2rem" }}>
        <h2>💳 Payments</h2>
        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr style={{ background: "#eee" }}>
              <th>ReportID</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Token</th>
              <th>agreed_terms</th>
            </tr>
          </thead>
          <tbody>
            {data.paymentRecords.length === 0 ? (
              <tr>
                <td colSpan="5" align="center">
                  No payment records found.
                </td>
              </tr>
            ) : (
              data.paymentRecords.map((p) => (
                <tr key={p.id}>
                  <td>{p.report_id}</td>
                  <td>{p.email}</td>
                  <td>{p.paytabs_tran_ref}</td>
                  <td>{p.status}</td>
                  <td>{p.payment_token}</td>
                  <td>{p.agreed_to_terms ? "yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

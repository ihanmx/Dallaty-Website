import { useEffect, useState } from "react";
import axios from "axios";

function PaymentDash() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/payments").then((res) => {
      setPayments(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Payment Transactions</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>PayTabs Ref</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.order_id}</td>
              <td>{p.paytabs_tran_ref}</td>
              <td>{p.status}</td>
              <td>{new Date(p.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PaymentDash;

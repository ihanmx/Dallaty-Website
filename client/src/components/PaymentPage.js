import { useState } from "react";
import axios from "axios";

function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const orderId = "ORD-" + Date.now(); // unique order id
      const response = await axios.post(
        "http://localhost:5000/api/create-payment",
        {
          orderId,
          customerName: "Test User",
          customerEmail: "test@example.com",
          amount,
        }
      );

      window.location.href = response.data.url; // redirect to PayTabs
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error creating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Pay for your order</h2>
      <input
        type="number"
        placeholder="Amount (SAR)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      />
      <button onClick={handlePayment} disabled={loading || !amount}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

export default PaymentPage;

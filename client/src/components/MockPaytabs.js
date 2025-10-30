import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MockPayTabs() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const tranRef = params.get("tran_ref");

  useEffect(() => {
    // Simulate user completing payment
    const timer = setTimeout(() => {
      navigate(`/payment-status?tran_ref=${tranRef}&resp_status=A`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [tranRef, navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Mock PayTabs Page</h2>
      <p>Transaction: {tranRef}</p>
      <p>Simulating payment...</p>
    </div>
  );
}

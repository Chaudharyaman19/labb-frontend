// PaymentFailure.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="pg-wrap failure">
      <style>{`
        /* reuse same styles but different colors for failure (you can paste both files' CSS into each file) */
        .pg-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-sizing: border-box;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        .card {
          width: 100%;
          max-width: 520px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          padding: 34px;
          text-align: center;
        }
        .icon {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          font-size: 48px;
        }
        .success .icon { background: #E6FFEF; color: #12A454; }
        .failure .icon { background: #FFECEF; color: #D33F49; }

        h1 {
          margin: 8px 0 6px;
          font-size: 22px;
          color: #0f172a;
        }
        p {
          margin: 0 0 18px;
          color: #475569;
          line-height: 1.5;
        }
        .meta {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 20px;
        }
        .btn {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          border: none;
          font-weight: 600;
        }
        .btn-primary {
          background: #ef4444; /* retry color */
          color: white;
          margin-right: 10px;
        }
        .btn-outline {
          background: transparent;
          color: #0f172a;
          border: 1px solid #e6eef0;
        }

        @media (max-width: 480px) {
          .card { padding: 22px; }
          .icon { width: 76px; height: 76px; font-size: 40px; }
        }
      `}</style>

      <div className="card" role="region" aria-labelledby="failure-heading">
        <div className="icon" aria-hidden>
          ❌
        </div>

        <h1 id="failure-heading">Payment Failed</h1>
        <p>
          Payment process complete nahi hua. Koi dikkat aa gayi — aap dobara try
          kar sakte ho.
        </p>

        <div className="meta">
          Error code: <strong>ERR_PAYMENT_402</strong>
          <br />
          If amount deducted, it will be refunded within 3–5 working days.
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => navigate(-1)}
            aria-label="Retry payment"
          >
            Retry Payment
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/help")}
            aria-label="Contact support"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;

import { useState } from "react";
import axios from "axios";
import "../../css/sendotp.css";
import { useNavigate } from "react-router-dom";

function Sendotp() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/userapp/auth/send-otp",
        {
          phone,
        }
      );
      setMessage("OTP sent successfully 📩");
      navigate("/forgotpass");
      setShowModal(true);
      console.log(res.data);
      setPhone("");
    } catch (e) {
      setMessage("Failed to send OTP ❌");
      setShowModal(true);
      console.log(e);
    }
  };

  return (
    <div className="sendotp-container">
      <div className="sendotp-box">
        <h2 className="sendotp-title">Send OTP</h2>
        <input
          type="text"
          placeholder="Enter Phone"
          className="sendotp-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={sendOtp} className="sendotp-btn">
          Send OTP
        </button>
      </div>

      {showModal && (
        <div className="sendotp-modal">
          <div className="sendotp-modal-content">
            <p>{message}</p>
            <button
              className="sendotp-modal-btn"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sendotp;

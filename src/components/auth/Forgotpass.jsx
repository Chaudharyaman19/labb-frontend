import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/forgotpass.css";
function Forgotpass() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleForgotPass = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      setShowModal(true);
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/userapp/auth/forgot-password",
        { phone, code, password, confirmPassword }
      );
      setMessage("Password reset successfully ✅");
      setShowModal(true);
      console.log(res.data);
    } catch (e) {
      setMessage("Failed to reset password ❌");
      setShowModal(true);
      console.log(e);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPhone("");
    setCode("");
    setPassword("");
    setConfirmPassword("");
    if (message.includes("successfully")) {
      navigate("/login");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2 className="forgot-title">Forgot Password</h2>

        <input
          type="text"
          placeholder="Phone"
          className="forgot-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="OTP Code"
          className="forgot-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="New Password"
          className="forgot-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="forgot-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <button onClick={handleForgotPass} className="forgot-btn">
          Reset Password
        </button>

        <div className="forgot-links">
          <p>
            Back to{" "}
            <Link to="/login" className="forgot-link">
              Login
            </Link>
          </p>
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="forgot-link">
              Register
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="forgot-modal">
          <div className="forgot-modal-content">
            <p>{message}</p>
            <button className="forgot-modal-btn" onClick={handleCloseModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forgotpass;

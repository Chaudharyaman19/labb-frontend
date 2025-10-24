import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import "../../css/login.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      setMessage("Please fill in all fields");
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      await login(phone.trim(), password.trim());
      setMessage("Login Successful");
      setShowModal(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message || "Login failed");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);

    if (message.includes("Successful")) {
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          placeholder="Enter Phone"
          className="login-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="off"
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <button
          onClick={handleLogin}
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="login-links">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            <Link to="/sendotp">Forgot Password?</Link>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="login-modal">
          <div className="login-modal-content">
            <p>{message}</p>
            <button className="login-modal-btn" onClick={handleCloseModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/register.css";
function Register() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://labb-backend.vercel.app/api/v1/userapp/auth/register",
        {
          name,
          phone,
          email,
          password,
        }
      );
      setMessage("Registration Successful 🎉");
      setShowModal(true);
      console.log(res.data);
    } catch (e) {
      setMessage("Registration Failed ❌");
      setShowModal(true);
      console.log(e);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPhone("");
    setEmail("");
    setPassword("");
    if (message.includes("Successful")) {
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create Account</h2>
        <input
          type="text"
          placeholder="Enter Name"
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Enter Phone"
          className="register-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="off"
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <button onClick={handleRegister} className="register-btn">
          Register
        </button>

        <div className="register-links">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="register-modal">
          <div className="register-modal-content">
            <p>{message}</p>
            <button className="register-modal-btn" onClick={handleCloseModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;

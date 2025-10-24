import { FiZap, FiMail, FiMapPin } from "react-icons/fi";
import "../../websitecss/css/Infonav.css";
import newlogo from "../../websiteimages/assets/newlogo.png";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="nav-container nav-nav">
          <div
            className="nav-logo"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img src={newlogo} alt="Gogeneric" />
          </div>
          <div className="nav-right">
            <div className="nav-item">
              <FiZap className="nav-icon" />
              <span>Support: 9211510600</span>
            </div>

            <div className="nav-item">
              <FiMail className="nav-icon" />
              <span>info@gogenericpharma.com</span>
            </div>
            <div className="nav-item">
              <FiMapPin className="nav-icon" />
              <span>Delhi( NCR )</span>
            </div>
          </div>
        </nav>
        <div></div>
      </div>
    </>
  );
};

export default Navbar;

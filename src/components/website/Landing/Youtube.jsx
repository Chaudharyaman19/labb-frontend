import "../../websitecss/css/youtube.css";
import { FaPills, FaUserDoctor, FaTruckMedical } from "react-icons/fa6";

const VideoSection = () => {
  return (
    <section className="video-section">
      <h2 className="video-section-heading">Watch Our Video</h2>

      <div className="video-row">
        {/* Left side - video */}

        <div className="video-container">
          <iframe
            className="promo-video"
            width="1206"
            height="678"
            src="https://www.youtube.com/embed/PjT9ZLMdn8s"
            title="Go Generic Healthcare | Affordable Medicines &amp; Expert Care in Delhi NCR"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        {/* Right side - content */}
        <div className="video-description mobilepage">
          <p>
            GoGeneric is committed to providing{" "}
            <strong>affordable medicines</strong>
            and <strong>expert healthcare</strong> across Delhi NCR. Our mission
            is to make quality healthcare accessible to everyone.
          </p>

          <ul className="features-list">
            <li>
              <span className="icon-circle">
                <FaPills className="feature-icon" />
              </span>
              <span>Affordable Generic Medicines</span>
            </li>
            <li>
              <span className="icon-circle">
                <FaUserDoctor className="feature-icon" />
              </span>
              <span>Expert Doctors & Health Guidance</span>
            </li>
            <li>
              <span className="icon-circle">
                <FaTruckMedical className="feature-icon" />
              </span>
              <span>Quick Home Delivery</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

import React from "react";
import "../../websitecss/css/redlab.css";
import redcliff from "../../websiteimages/assets/redcliff.png";
import orange from "../../websiteimages/assets/orange.png";
import { Link } from "react-router-dom";

const DownloadSection = () => {
  return (
    <Link to="/lab">
      {" "}
      <section className="download-section">
        <img src={redcliff} alt="Download" className="download-image" />
      </section>
      <section className="download-section">
        <img src={orange} alt="Download" className="download-image" />
      </section>
    </Link>
  );
};

export default DownloadSection;

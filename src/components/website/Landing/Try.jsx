import React, { useState } from "react";
import "../../websitecss/css/try.css";

const slidesData = [
  {
    title: "Home",
    bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/lake-macquarie-71208_1920.jpg",
  },
  {
    title: "arjun",
    bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/lake-macquarie-71208_1920.jpg",
  },
  {
    title: "About",
    bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/beach-2089959_1280.jpg",
  },
  {
    title: "Work",
    bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/forest-208517_1280.jpg",
  },
  {
    title: "Contact",
    bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/769286/lake-696098_1920.jpg",
  },
];

const FlexSlides = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="main-wrapper">
      <div className={`left-section ${hoverIndex === 0 ? "expand" : ""}`}>
        <div className="logo">My Logo</div>
        <div className="left-content">
          <h2>Some Content</h2>
          <p>This is some content below the logo</p>
        </div>
      </div>

      <div className="right-section">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`flex-slide ${hoverIndex === index ? "active" : ""} ${
              hoverIndex === index ? "stack-on-top" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.bg})`,
            }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div
              className={`flex-title ${
                hoverIndex === index ? "title-active" : ""
              }`}
            >
              {slide.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexSlides;

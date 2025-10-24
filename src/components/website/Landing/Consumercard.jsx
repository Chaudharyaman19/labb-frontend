import "../../websitecss/css/consumercard.css";
import slide1 from "../../websiteimages/assets/slide1.png";
import slide2 from "../../websiteimages/assets/slide2.png";
import slide3 from "../../websiteimages/assets/slide3.png";
import slide4 from "../../websiteimages/assets/slide4.png";
import slide5 from "../../websiteimages/assets/slide5.png";

const optionsData = [slide1, slide2, slide3, slide4, slide5];

export default function Options() {
  return (
    <div className="options-container">
      <div style={{ padding: "40px 30px", fontSize: "40px" }}>
        More Info About GoGeneric Consumers
      </div>
      <div className="marquee">
        <div className="marquee-content">
          {optionsData.map((bg, index) => (
            <div
              key={index}
              className="marquee-item"
              style={{ backgroundImage: `url(${bg})` }}
            ></div>
          ))}

          {optionsData.map((bg, index) => (
            <div
              key={"dup-" + index}
              className="marquee-item"
              style={{ backgroundImage: `url(${bg})` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

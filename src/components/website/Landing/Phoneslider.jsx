import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../websitecss/css/slider.css";
import phoneslider1 from "../../websiteimages/assets/phoneslider1.png";
import phoneslider2 from "../../websiteimages/assets/phoneslider2.png";
import phoneslider3 from "../../websiteimages/assets/phoneslider3.png";

const BannerSlider = () => {
  const sliderRef = useRef(null);

  const slides = [
    {
      img: phoneslider1,
      title: "Welcome to Our Hospital",
      subtitle: "Providing the best healthcare for you and your family",
    },

    {
      img: phoneslider2,
      title: "24/7 Emergency Services",
      subtitle: "We are here for you anytime",
    },
    {
      img: phoneslider3,
      title: "Modern Facilities",
      subtitle: "Advanced equipment for accurate treatment",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="banner-slider phoneslider">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-container">
            <a href="https://play.google.com/store/apps/details?id=com.gogeneric.user">
              {" "}
              <img
                src={slide.img}
                alt={`Banner ${index}`}
                className="slider-img"
              />
            </a>
            <div className="slide-text">
              {/* <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p> */}
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Buttons */}
      <div className="slider-buttons">
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="slider-btn prev-btn"
        >
          ⬅ Prev
        </button>
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="slider-btn next-btn"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default BannerSlider;

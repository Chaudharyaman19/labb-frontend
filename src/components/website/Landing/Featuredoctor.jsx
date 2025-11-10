import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import "../../websitecss/css/featured.css";
import upcomming1 from "../../websiteimages/assets/upcomming1.png";
import upcomming2 from "../../websiteimages/assets/upcomming2.png";
import upcomming3 from "../../websiteimages/assets/upcomming3.png";
import upcomming4 from "../../websiteimages/assets/upcomming4.png";
import { Link } from "react-router-dom";

const featuredData = [
  {
    id: 3,
    img: upcomming1,
    // category: "Hospital",
    // rating: "3k+ Rating",
    // stars: 4,
    title: "Doctors",
    location: "India",
    // doctors: 38,
  },
  {
    id: 3,
    img: upcomming2,
    // category: "Hospital",
    // rating: "3k+ Rating",
    // stars: 4,
    title: "Hospital",
    location: " India",
    // doctors: 38,
  },
  {
    id: 3,
    img: upcomming3,
    // category: "Hospital",
    // rating: "3k+ Rating",
    // stars: 4,
    title: "Labs",
    location: " India",
    // doctors: 38,
  },
  {
    id: 3,
    img: upcomming4,
    // category: "Hospital",
    // rating: "3k+ Rating",
    // stars: 4,
    title: "E-Health",
    location: "India",
    // doctors: 38,
  },
];

const NextArrow = ({ onClick }) => (
  <button className="slider-btnn next" onClick={onClick}>
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="slider-btnn prev" onClick={onClick}>
    <FaChevronLeft />
  </button>
);

const FeaturedSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="featured-section desktop">
      <div className="featured-header">
        <h2 className="featured-title">Feature Upcomming Projects</h2>
      </div>
      <Slider {...settings}>
        {featuredData.map((item) => (
          <div key={item.id} className="card-wrapperr">
            {item.title === "Labs" ? (
              <Link
                to="/lab"
                className="pro-card-link"
                style={{ textDecoration: "none" }}
              >
                <div className="pro-card">
                  <div className="pro-img-wrapper">
                    <img src={item.img} alt={item.title} className="pro-img" />
                    <div className="pro-icons">
                      <FaShareAlt className="pro-icon" />
                      <FaHeart className="pro-icon" />
                    </div>
                  </div>
                  <div className="pro-content">
                    <h3 className="pro-title">{item.title}</h3>
                    <div className="pro-location">
                      <FaMapMarkerAlt /> {item.location}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="pro-card">
                <div className="pro-img-wrapper">
                  <img src={item.img} alt={item.title} className="pro-img" />
                  <div className="pro-icons">
                    <FaShareAlt className="pro-icon" />
                    <FaHeart className="pro-icon" />
                  </div>
                </div>
                <div className="pro-content">
                  <h3 className="pro-title">{item.title}</h3>
                  <div className="pro-location">
                    <FaMapMarkerAlt /> {item.location}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedSlider;

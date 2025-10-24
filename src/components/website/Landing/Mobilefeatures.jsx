import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import m1 from "../../websiteimages/assets/m1.png";
import m2 from "../../websiteimages/assets/m2.png";
import m3 from "../../websiteimages/assets/m3.png";
import m4 from "../../websiteimages/assets/m4.png";
import {
  FaStar,
  FaMapMarkerAlt,
  FaUserMd,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import "../../websitecss/css/featured.css";

const featuredData = [
  {
    id: 3,
    img: m1,
    // category: "Hospital",
    // rating: "3k+ Rating",
    // stars: 4,
    title: "Doctors",
    location: "India",
    // doctors: 38,
  },
  {
    id: 3,
    img: m2,
    // category: "Hospital",
    // rating: "3k+ Rating",
    // stars: 4,
    title: "Hospital",
    location: " India",
    // doctors: 38,
  },
  {
    id: 3,
    img: m3,
    // category: "Hospital",
    // rating: "3k+ Rating",
    // stars: 4,
    title: "Labs",
    location: " India",
    // doctors: 38,
  },
  {
    id: 3,
    img: m4,
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
    slidesToShow: 1, // desktop me bhi 1 card show
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="featured-section mobile">
      <div className="featured-header">
        <h2 className="featured-title">Feature Upcomming Projects</h2>
      </div>
      <Slider {...settings}>
        {featuredData.map((item) => (
          <div key={item.id} className="card-wrapperr">
            <div className="pro-card">
              <div className="pro-img-wrapper">
                <img src={item.img} alt={item.title} className="pro-img" />
                <div className="pro-icons">
                  <FaShareAlt className="pro-icon" />
                  <FaHeart className="pro-icon" />
                </div>
              </div>

              <div className="pro-content">
                <div className="pro-top">
                  <span className="pro-badge">{item.category}</span>
                  <div className="pro-rating">
                    {[...Array(item.stars)].map((_, i) => (
                      <div key={i} className="star" />
                    ))}
                    <span className="pro-rating-text">{item.rating}</span>
                  </div>
                </div>

                <h3 className="pro-title">{item.title}</h3>

                <div className="pro-location">
                  <FaMapMarkerAlt /> {item.location}
                </div>

                <hr className="pro-divider" />

                <div className="pro-bottom">
                  <button className="pro-btn-outline">Book Today →</button>
                  <div className="pro-doctors">
                    <div /> {item.doctors}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedSlider;

import {
  FaStar,
  FaMapMarkerAlt,
  FaUserMd,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import "../../websitecss/css/metdoctor.css";

const featuredData = [
  {
    id: 3,
    img: "https://t3.ftcdn.net/jpg/02/95/51/80/360_F_295518052_aO5d9CqRhPnjlNDTRDjKLZHNftqfsxzI.jpg",
    category: "Hospital",
    rating: "3k+ Rating",
    stars: 4,
    title: " Dr.Rahul Singh",
    location: "Bangalore, India",
    doctors: "Book-Today",
  },
  {
    id: 4,
    img: "https://t3.ftcdn.net/jpg/02/95/51/80/360_F_295518052_aO5d9CqRhPnjlNDTRDjKLZHNftqfsxzI.jpg",
    category: "Hospital",
    rating: "3k+ Rating",
    stars: 4,
    title: "Dr.Sachin Verma",
    location: "Bangalore, India",
    doctors: "Book-Today",
  },
  {
    id: 5,
    img: "https://t3.ftcdn.net/jpg/02/95/51/80/360_F_295518052_aO5d9CqRhPnjlNDTRDjKLZHNftqfsxzI.jpg",
    category: "Hospital",
    rating: "3k+ Rating",
    stars: 4,
    title: "Dr.Deppak Chauhan",
    location: "Bangalore, India",
    doctors: "Book-Today",
  },
];

const FeaturedDoctorsColumn = () => {
  return (
    <div className="featured-section-unique mobiledoctor">
      <div className="featured-header-unique">
        <h2 className="featured-title-unique n">Meet Our Doctors</h2>
      </div>
      <div className="cards-column-unique">
        {featuredData.map((item) => (
          <div key={item.id} className="card-wrapperrr-unique">
            <div className="pro-card-unique">
              <div className="pro-img-wrapper-unique">
                <img
                  src={item.img}
                  alt={item.title}
                  className="pro-img-unique kay-unique"
                />
                <div className="pro-icons-unique">
                  <FaShareAlt className="pro-icon-unique" />
                  <FaHeart className="pro-icon-unique" />
                </div>
              </div>

              <div className="pro-content-unique">
                <div className="pro-top-unique">
                  <span className="pro-badge-unique">{item.category}</span>
                  <div className="pro-rating-unique">
                    {[...Array(item.stars)].map((_, i) => (
                      <FaStar key={i} className="star-unique" />
                    ))}
                    <span className="pro-rating-text-unique">
                      {item.rating}
                    </span>
                  </div>
                </div>

                <h3 className="pro-title-unique">{item.title}</h3>

                <div className="pro-location-unique">
                  <FaMapMarkerAlt /> {item.location}
                </div>

                <hr className="pro-divider-unique" />

                <div className="pro-bottom-unique">
                  <button className="pro-btn-outline-unique">
                    Availability →
                  </button>
                  <div className="pro-doctors-unique">
                    <FaUserMd /> {item.doctors} Doctors
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDoctorsColumn;

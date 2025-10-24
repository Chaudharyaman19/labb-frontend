import * as FiIcons from "react-icons/fi";
import "../../websitecss/css/category.css";

const categories = [
  {
    icon: "FiWind",
    title: "Primary Care",
    listings: 24,
    iconBg: "white",
    cardBg: "#F0DA69",
  },
  {
    icon: "FiZap",
    title: "Cardiology",
    listings: 10,
    iconBg: "white",
    cardBg: "#A3DAC2",
  },
  {
    icon: "FiBriefcase",
    title: "Dentistry",
    listings: 14,
    iconBg: "white",
    cardBg: "#E7C2D4",
  },
  {
    icon: "FiActivity",
    title: "Radiology",
    listings: 8,
    iconBg: "white",
    cardBg: "#FEC091",
  },
  {
    icon: "FiTarget",
    title: "Neurology",
    listings: 12,
    iconBg: "white",
    cardBg: "#92BDF6",
  },
  {
    icon: "FiThermometer",
    title: "Pediatrics",
    listings: 18,
    iconBg: "white",
    cardBg: "#ECB2FF",
  },
];

export default function CategoriesSection() {
  return (
    <section className="categories-section">
      <h1 style={{ padding: "30px 20px", fontSize: "32px" }}>
        UpComming Labs Category{" "}
      </h1>
      <div className="containerr">
        <div className="categories-grid">
          {categories.map((cat, index) => {
            const IconComponent = FiIcons[cat.icon];
            return (
              <div
                className="category-card"
                key={index}
                style={{ backgroundColor: cat.cardBg }}
              >
                <div
                  className="icon"
                  style={{
                    backgroundColor: cat.iconBg,
                    borderRadius: "50%",
                    padding: "38px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconComponent size={28} color="#333" />
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.listings} Listings</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

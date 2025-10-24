import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../../websitecss/css/about.css";

const doctorData = [
  {
    name: "Dr. Willis Tatum",
    designation: "Surgeon",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Sarah Lee",
    designation: "Cardiologist",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const statsData = [
  { number: 100, label: "Total Cities" },
  { number: 529, label: "Total Experts" },
  { number: 310, label: "Total Awards" },
];

const features = [
  "Enjoy Many Discounts In Fees",
  "Growing Listings Of Clinics",
];

const DoctorSection = () => {
  return (
    <div className="doctor-section">
      <div className="doctor-left">
        <div className="doctor-images">
          {/* {doctorData.map((doctor, index) => (
            <img
              key={index}
              src={doctor.img}
              alt={doctor.name}
              className={`circle-img circle-${index}`}
            />
          ))} */}
          {/* <div className="doctor-card">
            <h3>{doctorData[0].name}</h3>
            <p>{doctorData[0].designation}</p>
            <button>Book Now</button>
          </div> */}
        </div>
      </div>

      <div className="doctor-right">
        <h2>
          {" "}
          <span className="highlight-text mo" style={{ fontSize: "45px" }}>
            ABOUT GOGENERIC
          </span>
          <br></br>A Comprehensive Directory For Your Health Care
        </h2>
        <p>
          Go Generic Pharma, an initiative by Singhania Med Private Limited, is
          a pioneering digital healthcare platform dedicated to making medicines
          affordable, accessible, and trustworthy for every household in India.
          In a country where millions of people struggle to buy expensive
          branded medicines, we bring a simple yet powerful solution –
          connecting consumers directly with trusted local pharmacies that
          provide quality generic medicines at a fraction of the price. We
          believe that healthcare is a right, not a luxury. With this vision, Go
          Generic was created to bridge the gap between affordability and
          quality. By empowering consumers with knowledge and access, we aim to
          ensure that essential medicines reach everyone, everywhere, at fair
          and transparent prices.
          <h1 style={{ fontSize: "25px" }}>Our Promise</h1>
          Our Promise Go Generic is not just about delivering medicines; it’s
          about delivering trust, care, and relief. Every medicine listed on our
          platform is verified, every partner pharmacy is licensed, and every
          delivery is handled with utmost care. We are committed to building a
          future where every Indian can access safe, affordable, and effective
          medicines without financial burden. Because a healthy India is a
          stronger India.
        </p>
        <div className="doctor-stats">
          {statsData.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <h3>{stat.number}+</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="doctor-features">
          {features.map((f, i) => (
            <div key={i} className="feature-item">
              <FaCheckCircle color="#3366ff" /> {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSection;

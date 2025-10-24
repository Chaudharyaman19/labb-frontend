import React from "react";
import "../../websitecss/css/testmonial.css";
const stepsData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    title: "Search Best Online Professional",
    desc: "Each member of our team is focused on supporting patients with personalized treatment our goal is to create a welcoming",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    title: "View Professional Doctor Profile",
    desc: "We are committed to delivering exceptional healthcare services tailored to meet the needs of every patient our center",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    title: "Get Your Schedule Appointment",
    desc: "Our medical center is dedicated from preventive care and routine check ups to specialized treatments",
  },
];

const WorkingProcess = () => {
  return (
    <div className="working-process-section-unique">
      <div className="working-process-header-unique">
        <p className="working-subtitle-unique">• WORKING PROCESS •</p>
        <h2 className="working-title-unique">How Appointment Works</h2>
      </div>

      <div className="working-steps-unique">
        {stepsData.map((step) => (
          <div key={step.id} className="working-step-unique">
            <div className="step-img-wrapper-unique">
              <img
                src={step.img}
                alt={step.title}
                className="step-img-unique"
              />
              <div className="step-number-unique">{`0${step.id}`}</div>
            </div>
            <h3 className="step-title-unique">{step.title}</h3>
            <p className="step-desc-unique">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingProcess;

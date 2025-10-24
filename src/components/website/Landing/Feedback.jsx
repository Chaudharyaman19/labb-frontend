import React, { useState } from "react";
import "../../websitecss/css/feedback.css";

const ProfessionalForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    agree: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! Your details were submitted.");
    console.log(form);
  };

  return (
    <section className="proform-wrap">
      <header className="proform-header">
        <h1>Feedback Form </h1>
        <p>We’ll get back to you shortly.</p>
      </header>

      <form className="proform" onSubmit={onSubmit} noValidate>
        <div className="proform-grid">
          <div className="proform-field">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={onChange}
              placeholder="John"
              required
            />
          </div>

          <div className="proform-field">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={onChange}
              placeholder="Appleseed"
              required
            />
          </div>

          <div className="proform-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="proform-field">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="proform-field proform-span-2">
            <label htmlFor="country">Country/Region</label>
            <select
              id="country"
              name="country"
              value={form.country}
              onChange={onChange}
              required
            >
              <option value="">Select…</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="proform-field proform-span-2">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={onChange}
              placeholder="How can we help?"
              required
            />
          </div>
        </div>

        <div className="proform-actions">
          <button type="submit" className="proform-button">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfessionalForm;

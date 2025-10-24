import "../../websitecss/css/insights.css";
import insightphone2 from "../../websiteimages/assets/insightphone2.png";
import insightphone1 from "../../websiteimages/assets/insightphone1.png";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    img: insightphone1,

    author: "Admin",
    comments: 2,
    title: "Benefiting From Healthcare Shouldn’t Be A Matter Of Luck",
    desc: "Our medical center is committed to delivering exceptional healthcare services tailored to meet the needs of every patient.",
  },
  {
    id: 2,
    img: insightphone2,
    author: "Admin",
    comments: 3,
    title: "Top 10 Tips for Healthy Living",
    desc: "Learn the essential steps to maintain a balanced and healthy lifestyle for you and your family .",
  },
];

const InsightsSection = () => {
  return (
    <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
      <section className="insights-section insightphone">
        <h2 className="insights-heading">
          Read Our Latest Insights & Articles
        </h2>
        <div className="insights-cards">
          {articles.map((article) => (
            <div className="insights-card" key={article.id}>
              <div className="insights-card-img">
                <img src={article.img} alt={article.title} />
              </div>
              <div className="insights-card-info">
                <p className="insights-meta">
                  By {article.author} / {article.comments < 10 ? "0" : ""}
                  {article.comments} Comment
                </p>
                <h3 className="insights-title">{article.title}</h3>
                <p className="insights-desc">{article.desc}</p>
                <button className="insights-readmore">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Link>
  );
};

export default InsightsSection;

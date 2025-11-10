import Navbar from "./Navbar";
import Consumerslider from "./Consumerslider";
import Slider from "./Slider";
import Phoneslider from "./Phoneslider";
import Consumercard from "./Consumercard";
import Category from "./Category";
import Featuredoctor from "./Featuredoctor";
import Mobilefeatures from "./Mobilefeatures";
import About from "./About";
import Cursor from "./Cursor";
import Metdoctor from "./Metdoctor";
import Metdoctormobile from "./Metdoctormobile";
import Testmonials from "./Testmonials";
import Youtube from "./Youtube";
import Insights from "./Insights";
import Footer from "./Footer";
import Infonav from "./Infonav";
import Insightphone from "./Insightphone";
// import Feedback from "./Feedback";
import Mobileslider from "./Mobileslider";
import SocialLinks from "./Sociallink";
import Redlabs from "./Redlabs";

const HomePage = () => {
  return (
    <>
      <Mobileslider />
      <Infonav />
      <Navbar />
      <SocialLinks />

      <div id="home">
        <Consumerslider />
      </div>
      <div id="slider">
        <Slider />
      </div>
      <div id="phoneslider">
        <Phoneslider />
      </div>
      <div id="consumercard">
        <Consumercard />
      </div>
      <div id="category">
        <Category />
      </div>
      <div id="category">
        <Redlabs />
      </div>
      <div id="featuredoctor">
        <Featuredoctor />
      </div>
      <div id="mobilefeatures">
        <Mobilefeatures />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="cursor">
        <Cursor />
      </div>
      {/* <div id="metdoctor">
        <Metdoctor />
      </div> */}
      {/* <div id="metdoctormobile">
        <Metdoctormobile />
      </div> */}
      {/* <div id="testmonials">
        <Testmonials />
      </div> */}
      <div id="youtube">
        <Youtube />
      </div>
      <div id="insights">
        <Insights />
      </div>
      <div id="insightphone">
        <Insightphone />
      </div>
      <div id="footer"> {/* <Feedback /> */}</div>
      <div id="fo">
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

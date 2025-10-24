import Navbar from "../../my-app/src/components/Landing/Navbar";
import Consumerslider from "../../my-app/src/components/Landing/Consumerslider";
import Slider from "../../my-app/src/components/Landing/Slider";
import Phoneslider from "../../my-app/src/components/Landing/Phoneslider";
import Consumercard from "../../my-app/src/components/Landing/consumercard";
import Category from "../../my-app/src/components/Landing/Category";
import Featuredoctor from "../../my-app/src/components/Landing/Featuredoctor";
import Mobilefeatures from "../../my-app/src/components/Landing/Mobilefeatures";
import About from "../../my-app/src/components/Landing/About";
import Cursor from "../../my-app/src/components/Landing/Cursor";
import Youtube from "../../my-app/src/components/Landing/Youtube";
import Insights from "../../my-app/src/components/Landing/Insights";
import Footer from "../../my-app/src/components/Landing/Footer";
import Infonav from "../../my-app/src/components/Landing/Infonav";
import Insightphone from "../../my-app/src/components/Landing/Insightphone";
import Mobileslider from "../../my-app/src/components/Landing/Mobileslider";
import SocialLinks from "../../my-app/src/components/Landing/Sociallink";
import Redlab from "../../my-app/src/components/Landing/Redlab";

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
      <div>
        <Redlab />
      </div>
      <div id="category">
        <Category />
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

      <div id="youtube">
        <Youtube />
      </div>
      <div id="insights">
        <Insights />
      </div>
      <div id="insightphone">
        <Insightphone />
      </div>
      <div id="footer"></div>
      <div id="fo">
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

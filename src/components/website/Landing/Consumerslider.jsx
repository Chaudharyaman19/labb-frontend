import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Keyboard,
  Mousewheel,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../websitecss/css/consumerslider.css";
import user1 from "../../websiteimages/assets/user1.png";
import user2 from "../../websiteimages/assets/user2.png";
import user3 from "../../websiteimages/assets/user3.png";
import user4 from "../../websiteimages/assets/user4.png";
import user5 from "../../websiteimages/assets/user5.png";

const animalsData = [
  {
    title: "Affordable",
    desc: "Generic medicines are usually more affordable because manufacturers do not invest heavily in research, marketing, or branding. The patent of the original medicine expires, allowing multiple companies to produce the same drug.",
    bg: user1,
  },
  {
    title: "Quality",
    desc: "Every generic medicine must pass safety and quality tests before approval. Regulatory authorities ensure that these medicines are bioequivalent to branded versions, meaning they work in the same way inside the body.",
    bg: user2,
  },
  {
    title: "Healthcare",
    desc: "Generic medicines play an important role in global healthcare systems. By providing affordable alternatives, they reduce overall medical costs and increase access to essential treatments.",
    bg: user3,
  },
  {
    title: "Why Generic",
    desc: "The working of generic medicines is identical to branded medicines because the active ingredient remains the same. They go through strict regulatory checks to ensure effectiveness.",
    bg: user4,
  },
  {
    title: "Common Myths",
    desc: "A common myth is that generic medicines are less effective or unsafe compared to branded ones. In reality, they undergo the same testing and approval processes.",
    bg: user5,
  },
];

export default function AquaticAnimals() {
  return (
    <main className="aqua-main">
      <div className="aqua-left">
        <h1>GOGENERIC</h1>
        <hr />
        <p>
          Generic medicines are drugs that have the same active ingredients,
          strength, dosage, and effect as branded medicines.
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=com.gogeneric.user"
          target="_blank"
        >
          download app
        </a>
      </div>

      <Swiper
        className="aqua-swiper"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        // keyboard={{ enabled: true }}
        // mousewheel={{ thresholdDelta: 70 }}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination, Keyboard, Mousewheel, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1560: { slidesPerView: 3 },
        }}
      >
        {animalsData.map((animal, index) => (
          <SwiperSlide
            key={index}
            style={{
              background: `linear-gradient(to top, #0f2027, #203a4300, #2c536400), url(${animal.bg}) no-repeat 50% 50% / cover`,
            }}
          >
            <div>
              <h2>{animal.title}</h2>
              <p>{animal.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

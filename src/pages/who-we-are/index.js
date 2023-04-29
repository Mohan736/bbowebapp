import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import AOS from "aos";
import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ContactForm from "../../common/contactform";
import TeamMember from "../../common/team-member";
import { ENDPOINTS } from "../../app/config/endpoints/api";
import { STATUS_CODE } from "../../app/constants";
import { getRequest } from "../../app/httpClient/axiosClient";
import Mission from "./Content/Mission";
import Vision from "./Content/Vision";
import Methodology from "./Content/Methodology";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../app/constants";
import Parser from "html-react-parser";

function WhoweAre() {
  // Scroll To Top

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // State For Web Site Content
  const [mission, setMission] = useState({
    title: null,
    description: null,
    image: null,
    image_text: null,
  });
  const [vision, setVision] = useState({
    title: null,
    description: null,
    image: null,
    image_text: null,
  });
  const [methodology, setMethodology] = useState({
    title: null,
    description: null,
  });

  const [iconsWithHeading, setIconsWithHeading] = useState({
    title1: null,
    description1: null,
    title2: null,
    description2: null,
    title3: null,
    description3: null,
    title4: null,
    description4: null,
  });

  // Gsap Animation

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let t2 = gsap.timeline({
      duration: 1,
    });

    t2.fromTo(
      ".graphics-animate",
      { duration: 0.5, opacity: 0, y: "10", ease: "power2.out" },
      { y: "-10", opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.2 }
    );
    t2.add(function () {
      let animateElements = document.querySelectorAll(".graphics-animate");
      animateElements.forEach(function (ev) {
        ev.classList.add("element-pop");
      });
    });
  }, []);

  // Aos Animations

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  //Get Website Content

  const pageContent = async () => {
    const endpoint = [ENDPOINTS.CONENT.WHOWEARE];
    var response = await getPageContent(endpoint);

    if (response.status === STATUS_CODE.RES200) {
      var _DATA = response.data.data;
      setMission({
        title: _DATA.description.who_we_are_Mission,
        description: _DATA.description.who_we_are_Mission_desc,
        image: _DATA.description.misson_banner_image,
        image_text: _DATA.description.misson_banner_image_title,
      });
      setVision({
        title: _DATA.description.who_we_are_vision,
        description: _DATA.description.who_we_are_vision_dec,
        image: _DATA.description.vision_banner_image,
        image_text: _DATA.description.vision_banner_image_title,
      });
      setMethodology({
        title: _DATA.description.who_we_are_Methodology,
        description: _DATA.description.who_we_are_Methodology_desc,
      });

      setIconsWithHeading({
        title1: _DATA.description.who_we_are_Fulfill_Section,
        description1: _DATA.description.who_we_are_Fulfill_Section_desc,
        title2: _DATA.description.who_we_are_Restore_Section,
        description2: _DATA.description.who_we_are_Restore_Section_desc,
        title3: _DATA.description.who_we_are_Encourage_Section,
        description3: _DATA.description.who_we_are_Encourage_Section_desc,
        title4: _DATA.description.who_we_are_Empower_Section,
        description4: _DATA.description.who_we_are_Empower_Section_desc,
      });
    }
  };

  //Get Website Content

  async function getPageContent(url) {
    return new Promise((resolve, reject) => {
      getRequest(url)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  //Get Website Content
  useEffect(() => {
    pageContent();
  }, []);

  return (
    <>
      <Navbar />
      <div className="scroll-wrapper">
        <section
          className="hero-section who-we-are-banner"
          style={{ backgroundImage: `url(images/who-we-are.svg)` }}
        >
          <div className="container">
            <div className="hero-content" data-aos="fade-up">
              <h1 className="text-uppercase">
                Who <span className="secondary-clr">We</span> Are
              </h1>
              <Link
                className="btn button-secondary black-outline-btn"
                to={ROUTES_PATH.join}
              >
                Get Started
              </Link>

              <div className="mouse-animate mt-5">
                <a href="#mission" data-scroll-to>
                  <img src="images/arrows-down.svg" alt="mouse-wheel" />
                </a>
              </div>
            </div>

            <div className="banner-graphics">
              <img
                src="images/left-element1.png"
                alt="img"
                className="graphics-1 graphics-animate"
              />
              <img
                src="images/left-element2.svg"
                alt="img"
                className="graphics-2 graphics-animate"
              />
              <img
                src="images/banner-arrow.svg"
                alt="img"
                className="graphics-3 graphics-animate"
              />
              <img
                src="images/left-element3.png"
                alt="img"
                className="graphics-4 graphics-animate"
              />
              <img
                src="images/right-element1.png"
                alt="img"
                className="graphics-5 graphics-animate"
              />
              <img
                src="images/right-element2.png"
                alt="img"
                className="graphics-6 graphics-animate"
              />
              <img
                src="images/curve-arrow-top.svg"
                alt="img"
                className="graphics-7 graphics-animate"
              />
              <img
                src="images/right-element3.svg"
                alt="img"
                className="graphics-8 graphics-animate"
              />
            </div>
          </div>
        </section>

        <section id="mission" className="mission-sec section-padding light-bg">
          <div className="container">
            <Mission mission={mission} />
            <Vision vision={vision} />
          </div>
        </section>

        <section className="methodology-sec section-padding">
          <Methodology methodology={methodology} />
        </section>

        <section className="methodology-sec section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="icon-blk" data-aos="fade-up">
                  <div className="icon-blk-img">
                    <img src="images/fullfill-icon.svg" alt="Fulfill" />
                  </div>

                  <h5 className="icon-blk-title">
                    {iconsWithHeading?.title1 &&
                      Parser(iconsWithHeading?.title1)}
                  </h5>
                  <p className="icon-blk-desc">
                    {iconsWithHeading?.description1 &&
                      Parser(iconsWithHeading?.description1)}
                  </p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="icon-blk" data-aos="fade-up">
                  <div className="icon-blk-img">
                    <img src="images/restore-icon.svg" alt="Restore" />
                  </div>

                  <h5 className="icon-blk-title">
                    {iconsWithHeading?.title2 &&
                      Parser(iconsWithHeading?.title2)}
                  </h5>
                  <p className="icon-blk-desc">
                    {iconsWithHeading?.description2 &&
                      Parser(iconsWithHeading?.description2)}
                  </p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="icon-blk" data-aos="fade-up">
                  <div className="icon-blk-img">
                    <img src="images/encourage-icon.svg" alt="Encourage" />
                  </div>

                  <h5 className="icon-blk-title">
                    {iconsWithHeading?.title3 &&
                      Parser(iconsWithHeading?.title3)}
                  </h5>
                  <p className="icon-blk-desc">
                    {iconsWithHeading?.description3 &&
                      Parser(iconsWithHeading?.description3)}
                  </p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="icon-blk" data-aos="fade-up">
                  <div className="icon-blk-img">
                    <img src="images/empower-icon.svg" alt="Empower" />
                  </div>

                  <h5 className="icon-blk-title">{iconsWithHeading?.title4 &&
                      Parser(iconsWithHeading?.title4)}
                  </h5>
                  <p className="icon-blk-desc">
                  {iconsWithHeading?.description4 &&
                      Parser(iconsWithHeading?.description4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TeamMember />
        <ContactForm />

        <Footer />
      </div>
    </>
  );
}

export default WhoweAre;

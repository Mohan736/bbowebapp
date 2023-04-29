import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Parser from "html-react-parser";
import AOS from "aos";
import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ContactForm from "../../common/contactform";
import TeamMember from "../../common/team-member";

import { ENDPOINTS } from "../../app/config/endpoints/api";
import { STATUS_CODE } from "../../app/constants";
import { getRequest } from "../../app/httpClient/axiosClient";

import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../app/constants";

import Analogy from "./Content/Analogy";
import { useLocation } from "react-router-dom";
import TotalStats from "../../common/totalstats";

function Whybbo() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [analogy, setAnalogy] = useState({
    index1: null,
    index2: null,
    index3: null,
    title: null,
    description: null,
    years: null,
    Certifications: null,
    live_sessions: null,
  });
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({ delay: 0.5 });
    // tl.from(".img-animate", {
    //   duration: 0.5,
    //   opacity: 0,
    //   //height: 0,
    //   ease: "power2.out",
    // }).to(".img-animate", {
    //   duration: 0.5,
    //   opacity: 1,
    //   //transformOrigin: "top",
    //  // height: 520,
    //   ease: "power2.out",
    // });
    tl.from(".img-animate", {
      duration: 0.5,
      opacity: 0,
      x: -10,
      ease: "Power1.easeOut",
    }).to(".img-animate", {
      duration: 0.5,
      opacity: 1,
      x: 10,
      ease: "Power1.easeOut",
    });
    tl.from(".img-animate-circle", {
      duration: 0.5,
      opacity: 0,
      x: -5,
      ease: "Power1.easeOut",
    }).to(".img-animate-circle", {
      duration: 0.5,
      opacity: 1,
      x: 5,
      ease: "Power1.easeOut",
    });
    tl.from(".img-grid img", {
      duration: 0.5,
      opacity: 0,
      y: -7,
      ease: "Power1.easeOut",
    }).to(".img-grid img", {
      duration: 0.5,
      opacity: 1,
      y: 7,
      ease: "Power1.easeOut",
    });
    // new PureCounter();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const pageContent = async () => {
    const endpoint = [ENDPOINTS.CONENT.WHYBBO];
    var response = await getPageContent(endpoint);

    if (response.status === STATUS_CODE.RES200) {
      var _DATA = response.data.data;
      setAnalogy({
        title: _DATA.description.why_bbo_Analogy_title,
        description: _DATA.description.why_bbo_Analogy_desc,
        index1: _DATA.description.why_bbo_title_index1,
        index2: _DATA.description.why_bbo_title_index2,
        index3: _DATA.description.why_bbo_title_index3,
        years: _DATA.description.why_bbo_year_of_services,
        Certifications: _DATA.description.why_bbo_provide_certification,
        live_sessions: _DATA.description.why_bbo_provide_live_session,
      });
    }
  };

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

  useEffect(() => {
    pageContent();
  }, []);

  return (
    <>
      <Navbar />
      <div className="scroll-wrapper">
        <section className="hero body-padding why-bbo-hero">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-md-6 col-sm-6 text-center text-sm-start order-2 order-sm-1 mt-4 mt-sm-0"
                data-aos="fade-up"
              >
                <h1 className="animate-heading">
                  {analogy?.index1}
                  <span className="d-block"> {analogy?.index2}</span>
                  <span className="d-block h2 secondary-clr mb-0 mt-2 font-secondary">
                    {analogy?.index3}
                  </span>
                </h1>
                <Link className="btn btn-primary-outline" to={ROUTES_PATH.join}>
                  Get Started
                </Link>
              </div>
              <div className="col-md-6 col-sm-6 order-1 order-sm-2 position-relative">
                <div
                  className="img-animate"
                  style={{ background: `url(images/headshot.jpg)` }}
                ></div>
                <div className="img-grid">
                  <img src="images/logo-icon.svg" className="mb-4" alt="logo" />
                  <div
                    className="img-animate-circle"
                    style={{ background: `url(images/black-woman.jpg)` }}
                  ></div>
                </div>
              </div>
              <div className="col-md-12 order-3 text-center">
                <div className="mouse-animate mt-5">
                  <a href="#why-bbo">
                    <img src="images/arrows-down.svg" alt="mouse-wheel" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-bbo" className="section-padding" data-aos="fade-up">
          <div className="container">
            <Analogy analogy={analogy} />
        
            {/* <TotalStats
              years={analogy?.years}
              certifications={analogy?.Certifications}
              liveSessions={analogy?.live_sessions}
            /> */}
          </div>
        </section>
        <TeamMember />
        <ContactForm />

        <Footer />
      </div>
    </>
  );
}

export default Whybbo;

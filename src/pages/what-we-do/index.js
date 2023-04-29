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

import TheProgram from "./Content/TheProgram";
import OurProgram from "./Content/OurProgram";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../app/constants";

function WhatWeDo() {
  // Scroll To Top Animatoins
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // States For WebSite Content

  const [theProgram, setTheProgram] = useState({
    title: null,
    description: null,
    our_program_banner_images: null,
  });

  const [title, setTitle] = useState({
    title1: null,
    title2: null,
  });
  const [ourProgram, setOurProgram] = useState({
    mainTitle: null,
    mainDescription: null,
    secondTitle: null,
    firstIconTitle: null,
    firstIcondesc: null,
    firstIconimage: null,
    secondIconTitle: null,
    secondIcondesc: null,
    secondIconimage: null,
    thirdIconTitle: null,
    thirdIcondesc: null,
    thirdIconimage: null,
  });

  // Gsap Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let t2 = gsap.timeline({ delay: 0.5 });
    t2.to(
      ".img-one",
      {
        duration: 1,
        opacity: 1,
        rotate: "-10deg",
        transformOrigin: "center",
        ease: "power2.out",
      },
      "one"
    );
    t2.to(
      ".img-two",
      {
        duration: 1,
        opacity: 1,
        rotate: "10deg",
        transformOrigin: "center",
        ease: "power2.out",
      },
      "one"
    );
    t2.to(
      ".img-three",
      {
        duration: 1,
        opacity: 1,
        rotate: "10deg",
        transformOrigin: "center",
        ease: "power2.out",
      },
      "one"
    );
    t2.to(
      ".img-four",
      {
        duration: 1,
        opacity: 1,
        rotate: "-10deg",
        transformOrigin: "center",
        ease: "power2.out",
      },
      "one"
    );
    t2.from(".star", {
      duration: 1,
      opacity: 0,
      scale: 0.2,
      stagger: 0.2,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
    }).to(
      ".star",
      {
        duration: 1.3,
        opacity: 1,

        scale: 1,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
      },
      "one"
    );
    AOS.init({
      duration: 800,
    });
  }, []);

  // Get WebSite Content
  const pageContent = async () => {
    const endpoint = [ENDPOINTS.CONENT.WHATWEDO];
    var response = await getPageContent(endpoint);

    if (response.status === STATUS_CODE.RES200) {
      var _DATA = response.data.data;

      setTheProgram({
        title: _DATA.description.what_we_do_The_Program,
        description: _DATA.description.what_we_do_The_Program_desc,
        image: _DATA.description.our_program_banner_images,
      });
      setTitle({
        title1: _DATA.description.what_we_do_title_index1,
        title2: _DATA.description.what_we_do_title_index2,
      });
      setOurProgram({
        mainTitle: _DATA.description.ourProgram_title,
        mainDescription: _DATA.description.what_we_do_desc,
        secondTitle: _DATA.description.what_we_do_Training_Programs_title,
        firstIconTitle: _DATA.description.what_we_do_Training_Programs_title1,
        firstIcondesc: _DATA.description.what_we_do_Training_Programs_desc1,
        firstIconimage: _DATA.description.traning_images,
        secondIconTitle: _DATA.description.what_we_do_Training_Programs_title2,
        secondIcondesc: _DATA.description.what_we_do_Training_Programs_desc2,
        secondIconimage: _DATA.description.traning_images2,
        thirdIconTitle: _DATA.description.what_we_do_Microsoft_Section,
        thirdIcondesc: _DATA.description.what_we_do_Microsoft_Section_desc,
        thirdIconimage: _DATA.description.traning_images3,
      });
    }
  };

  // Get WebSite Content
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

  // Get WebSite Content

  useEffect(() => {
    pageContent();
  }, []);

  return (
    <>
      <Navbar />
      <div className="scroll-wrapper">
        <section className="hero body-padding section-padding what-we-hero">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-md-3">
                <div className="img-wrap img-one">
                  <img src="images/img-1.jpg" />
                </div>

                <div className="img-wrap img-two">
                  <img src="images/img-2.jpg" />
                </div>
              </div>
              <div
                className="col-md-6 text-center position-relative what-we-do-heading"
                data-aos="fade-up"
              >
                <img src="images/star-lg.svg" className="star star-one" />
                <img src="images/star-black.svg" className="star star-two" />
                <img src="images/star-black.svg" className="star star-three" />
                <h1 className="animate-heading text-uppercase">
                  {title?.title1}{" "}
                  <span className="secondary-clr">{title?.title2}</span>
                </h1>
                <Link className="btn btn-primary-outline" to={ROUTES_PATH.join}>
                  Get Started
                </Link>
              </div>
              <div className="col-md-3">
                <div className="img-wrap img-three">
                  <img src="images/img-4.jpg" />
                </div>

                <div className="img-wrap img-four">
                  <img src="images/img-3.jpg" />
                </div>
                <img src="images/star-lg.svg" className="star star-four" />
              </div>
              <div className="col-md-12 text-center">
                <div className="mouse-animate mt-5">
                  <a href="#what-we-do">
                    <img src="images/arrows-down.svg" alt="mouse-wheel" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OurProgram ourProgram={ourProgram} id="what-we-do" />
        <TheProgram theProgram={theProgram} />

        <section className="process-sec section-padding text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-10 mx-auto">
                <h2 className="section__heading" data-aos="fade-up">
                  Process Works
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="works-process-inner d-flex flex-wrap">
                  <div className="work-process-sec" data-aos="fade-up">
                    <div className="work-process-block">
                      <figure>
                        <img
                          src="images/join-community.svg"
                          alt="Join Community"
                        />
                      </figure>
                      <h4>Join Community</h4>
                    </div>
                    <svg
                      width="35"
                      height="39"
                      viewBox="0 0 35 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.3667 1L33.6334 19.5L16.3667 38"
                        stroke="black"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.999998 1L18.2667 19.5L1 38"
                        stroke="black"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="work-process-sec" data-aos="fade-up">
                    <div className="work-process-block">
                      <figure>
                        <img
                          src="images/be-discipline.svg"
                          alt="Be Discipline"
                        />
                      </figure>
                      <h4>Be Discipline</h4>
                    </div>

                    <svg
                      width="35"
                      height="39"
                      viewBox="0 0 35 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.3667 1L33.6334 19.5L16.3667 38"
                        stroke="black"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.999998 1L18.2667 19.5L1 38"
                        stroke="black"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="work-process-sec" data-aos="fade-up">
                    <div className="work-process-block">
                      <figure>
                        <img
                          src="images/get-certificate.svg"
                          alt="Get Certificate"
                        />
                      </figure>
                      <h4>Get Certificate</h4>
                    </div>
                  </div>
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

export default WhatWeDo;

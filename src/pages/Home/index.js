import React, { useEffect, useState } from "react";
import ContactForm from "../../common/contactform";
import TeamMember from "../../common/team-member";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import "./home.css";
import AOS from "aos";
import { ENDPOINTS } from "../../app/config/endpoints/api";
import { STATUS_CODE, ROUTES_PATH } from "../../app/constants";
import { getRequest } from "../../app/httpClient/axiosClient";
import Parser from "html-react-parser";
// content sections
import WhoWeAre from "./Contents/WhoWeAre";
import BbOrg from "./Contents/BbOrg";
import WhyBBOrg from "./Contents/WhyBBOrg";
import GetTheMentor from "./Contents/GetTheMentor";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import TotalStats from "../../common/totalstats";

function Homepage() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // State For WebSite Content

  const [bannerTitle, setBannerTitle] = useState({
    title1: null,
    title2: null,
    title3: null,
    title4: null,
  });

  const [whoWeAre, setWhoWeAre] = useState({
    title: null,
    description: null,
    buttonTitle: null,
  });
  const [bbOrg, setBbOrg] = useState({
    title: null,
    description: null,
    buttonTitle: null,
  });
  const [whyBbo, setWhyBbo] = useState({
    title: null,
    description: null,
    why_bbo_provide_certification: null,
    why_bbo_provide_lifesession: null,
    why_bbo_years_service: null,
    buttonTitle: null,
  });
  const [getTheMentor, setGetTheMentor] = useState({
    title: null,
    description: null,
    buttonTitle: null,
  });
  const [sponserImage, setSponsorImage] = useState([]);

  const [alldata, setAllData] = useState({});

  const [teamImages, setMeetTeamImages] = useState([]);

  // Aos Animations

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  // LocoMotive Scroll Function
  // setTimeout(function () {
  //   const scroller = new LocomotiveScroll({
  //     el: document.querySelector("[data-scroll-container]"),
  //     smooth: true,
  //   });
  // }, 100);

  //Get Home Page Content

  const homepageContent = async () => {
    const endpoint = [ENDPOINTS.CONENT.HOMEPAGE];
    var response = await getHomePageContent(endpoint);

    if (response.status === STATUS_CODE.RES200) {
      var _DATA = response.data.data;
      setWhoWeAre({
        title: _DATA.description.who_we_are_title,
        description: _DATA.description.who_we_are_desc,
        buttonTitle: null,
      });
      setBbOrg({
        title: _DATA.description.bb_orgination_title,
        description: _DATA.description.bb_orgination_desc,
        buttonTitle: _DATA.description.bb_orgination_btn,
      });
      setWhyBbo({
        title: _DATA.description.why_bbo_title,
        description: _DATA.description.why_bbo_description,
        buttonTitle: _DATA.description.why_bbo_provide_btn_title,
        why_bbo_provide_certification:
          _DATA.description.why_bbo_provide_certification,
        why_bbo_provide_lifesession:
          _DATA.description.why_bbo_provide_lifesession,
        why_bbo_years_service: _DATA.description.why_bbo_years_service,
      });
      setGetTheMentor({
        title: _DATA.description.get_mentor_title,
        description: _DATA.description.get_mentor_desc,
        buttonTitle: _DATA.description.get_mentor_btn,
      });
      setMeetTeamImages(_DATA.description.meet_our_support_team_image1);
      setSponsorImage(_DATA.description.sponsorship_banner);
      setAllData(_DATA.description);
      setBannerTitle({
        title1: _DATA.description.HomeBanner_titleIndex1,
        title2: _DATA.description.HomeBanner_titleIndex2,
        title3: _DATA.description.HomeBanner_titleIndex3,
        title4: _DATA.description.HomeBanner_titleIndex4,
      });
    }
  };

  // Get Home Page Content

  async function getHomePageContent(url) {
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
    homepageContent();
  }, []);

  return (
    <>
      <Navbar />

      <div className="scroll-wrapper" data-scroll-container>
        <section className="hero-section">
          <div data-scroll data-scroll-section id="scroll-target">
            <div className="hero-content" data-aos="fade-up">
              <h1 className="text-uppercase">
                {/* {bannerTitle?.title1}{" "} */}
                {bannerTitle?.title1 ? <>{Parser(bannerTitle?.title1)}</> : ""}
                <span className="secondary-clr">{bannerTitle?.title2}</span>
                <br />
                {bannerTitle?.title3}{" "}
                <span className="secondary-clr">{bannerTitle?.title4}</span>
              </h1>
              <Link className="btn btn-primary-fill" to={ROUTES_PATH.join}>
                Get Started
              </Link>

              {/* <div className="mouse-animate mt-5">
                <a href="#who-we-are">
                  <img src="images/arrows-down.svg" alt="mouse-wheel" />
                </a>
              </div> */}
            </div>
            <div className="hero-bg-stuff">
              <ul className="d-flex stuff-img-list">
                <li
                  data-scroll
                  data-scroll-speed="1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-01.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-02.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-03.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-04.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-05.png)` }}
                  ></div>
                </li>
                <li
                  data-scroll
                  data-scroll-speed="-1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-06.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-07.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-08.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-09.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-010.png)` }}
                  ></div>
                </li>
                <li
                  data-scroll
                  data-scroll-speed="1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-011.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-012.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-013.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-014.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-015.png)` }}
                  ></div>
                </li>
                <li
                  data-scroll
                  data-scroll-speed="-1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-016.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-017.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-018.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-019.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-020.png)` }}
                  ></div>
                </li>
                <li
                  data-scroll
                  data-scroll-speed="1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-01.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-02.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-03.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-04.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-05.png)` }}
                  ></div>
                </li>
                <li
                  data-scroll
                  data-scroll-speed="-1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-06.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-07.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-08.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-09.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-010.png)` }}
                  ></div>
                </li>
                <li
                  data-scroll
                  data-scroll-speed="1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-011.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-012.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-013.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-014.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-015.png)` }}
                  ></div>
                </li>
                <li
                  data-scroll
                  data-scroll-speed="-1"
                  data-scroll-target="#scroll-target"
                >
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-016.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-017.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-018.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-019.png)` }}
                  ></div>
                  <div
                    className="stuff-img"
                    style={{ backgroundImage: `url(images/awards-020.png)` }}
                  ></div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <WhoWeAre
          id="who-we-are"
          idTwo="#contact-us-refr"
          whoWeAre={whoWeAre}
        />
        <BbOrg bbOrg={bbOrg} />
        <section className="section-padding">
          <div className="container">
            <WhyBBOrg whyBbo={whyBbo} />
            {/* <TotalStats
              years={whyBbo?.why_bbo_years_service}
              certifications={whyBbo?.why_bbo_provide_certification}
              liveSessions={whyBbo?.why_bbo_provide_lifesession}
            /> */}
          </div>
        </section>

        <GetTheMentor getTheMentor={getTheMentor} />
        {sponserImage?.map((item, index) => (
          <section
            key={index}
            className="sponsorship section-padding text-center"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${item})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12 position-relative" data-aos="fade-up">
                  <h2 className="section__heading text-white">
                    {alldata?.sponsorship_title_index1}
                    <span className="d-block">
                      {alldata?.sponsorship_title_index2}
                    </span>
                  </h2>
                  <p className="text-white">
                    {alldata?.sponsorship_description}
                  </p>
                  <Link
                    className="btn btn-secondary-fill mt-3"
                    to={ROUTES_PATH.join}
                  >
                    Become a Sponsor
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}

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

        <TeamMember images={teamImages} />
        <ContactForm id="contact-us-refr" />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;

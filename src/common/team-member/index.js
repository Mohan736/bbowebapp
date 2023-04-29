import React, { useEffect, useState } from "react";
import "./teammember.css";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../../app/config/endpoints/api";
import { STATUS_CODE, ROUTES_PATH } from "../../app/constants";
import { getRequest } from "../../app/httpClient/axiosClient";
import Slider from "react-slick";

function TeamMember({ images }) {
  const [teamImages, setMeetTeamImages] = useState([]);
  const [alldata, setAllData] = useState({});
  const homepageContent = async () => {
    const endpoint = [ENDPOINTS.CONENT.HOMEPAGE];
    var response = await getHomePageContent(endpoint);

    if (response.status === STATUS_CODE.RES200) {
      var _DATA = response.data.data;

      setMeetTeamImages(_DATA.description.meet_our_support_team_image1);
      setAllData(_DATA.description);
    }
  };

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

  const URL = process.env.REACT_APP_IMAGE_URL_WEBSITE;

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className="sec-team section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-12 mb-5 mb-lg-0" data-aos="fade-up">
              {/* <h2 className="section__heading">Meet Our Supportive Team</h2> */}
              <h2 className="section__heading">
                {alldata?.meet_our_support_title1}
              </h2>
              <Link className="btn btn-primary-outline" to={ROUTES_PATH.join}>
                Join Us
              </Link>
            </div>
            {/* <Slider {...settings}> */}
            {teamImages?.map((item, index) => (
              <div key={index} className="col-lg-3 col-sm-4">
                <figure data-aos="flip-left">
                  <img src={`${URL}/${item}`} alt="Team Member" />
                </figure>
              </div>
            ))}
            {/* </Slider> */}

            {/* <div className="col-lg-3 col-sm-4">
              <figure data-aos="flip-left">
                <img src="images/team-member-02.jpg" alt="Team Member" />
              </figure>
            </div>
            <div className="col-lg-3 col-sm-4">
              <figure data-aos="flip-left">
                <img src="images/team-member-03.jpg" alt="Team Member" />
              </figure>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default TeamMember;

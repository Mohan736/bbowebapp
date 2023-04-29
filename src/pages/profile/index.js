import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./profile.css";
import Upload from "./steps/upload";
import Navbar from "../../components/navbar/index";
import PersonalInfo from "./steps/personalInfo";
import Educationalinfo from "./steps/Educationalinfo";
import CustoDial from "./steps/Custodial";
import WorkDetails from "./steps/workdetails";
import SocialNetworks from "./steps/SocialNetworks";
import { useDispatch, useSelector } from "react-redux";
import { getSignUpPageContent } from "../../redux/actions/actions";

function Profile() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const data = useSelector((data) => data.data);

  const [steps, setSteps] = useState(1);

  useEffect(() => {
    dispatch(getSignUpPageContent("SIGN_UP"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="scroll-wrapper">
        <div className="container-fluid p-0">
          <div className="step-wrapper">
            {/* Left  */}
            <div
              className="quote-left text-white steps-image"
              style={{
                background: `url(${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${
                  data?.signupData?.signup_banner_image
                    ? data?.signupData?.signup_banner_image[0]
                    : ""
                })`,
              }}
            >
              <div className="quote-wrapper">
                <h3 className="quote">
                  {data?.signupData?.signup_banner_title_index1}{" "}
                  {data?.signupData?.signup_banner_title_index2}{" "}
                  <span>{data?.signupData?.signup_banner_title_index3}</span>
                </h3>
                <p className="small-text">
                  {data?.signupData?.signup_banner_title_index4}
                </p>
                <div className="small-text copyright">
                  &copy;2022 Bounceback. All right reserved.
                </div>
              </div>
            </div>

            {/* Ends  */}

            <div className="form-right">
              <div
                // onSubmit={handleSubmit}
                className="step-form"
                autoComplete="false"
              >
                {/* Upload Profile Picture  */}

                <div
                  className={steps === 1 ? "step upload-photo d-block" : "step"}
                >
                  <Upload stepStep={() => setSteps(2)} uploadWidth />
                </div>

                {/* Upload Profile Picture ends */}

                {/*PersonalInformation */}

                <div
                  className={
                    steps === 2
                      ? "step personalized-information d-block"
                      : "step"
                  }
                >
                  <PersonalInfo
                    handlePersonalInfoBack={() => setSteps(1)}
                    handleForward={() => setSteps(3)}
                  />
                </div>

                {/*PersonalInformation Ends*/}

                {/*Educational Informations */}

                <div
                  className={
                    steps === 3
                      ? "step educational-information d-block"
                      : "step "
                  }
                >
                  <Educationalinfo
                    handleBackEducInfo={() => setSteps(2)}
                    handleForwardEducInfo={() => setSteps(4)}
                  />
                </div>

                {/*Educational Informations ends */}

                {/*Custodial  */}

                <div
                  className={
                    steps === 4 ? "step custodial-detail d-block" : "step "
                  }
                >
                  <CustoDial
                    handleForwardcustodial={() => setSteps(5)}
                    handlecustoDialBack={() => setSteps(3)}
                  />
                </div>
                {/*Custodial  ends*/}

                {/* Word Details  */}

                <div
                  className={
                    steps === 5 ? "step work-details d-block" : "step "
                  }
                >
                  <WorkDetails
                    handleForwardworkDetails={() => setSteps(6)}
                    handleworkDetailsBack={() => setSteps(4)}
                  />
                </div>

                {/* Ends  */}

                {/* Social networks  */}
                <div
                  className={
                    steps === 6 ? "step social-details d-block" : "step "
                  }
                >
                  <SocialNetworks handleBackSocial={() => setSteps(5)} />
                </div>
                {/* Ends  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

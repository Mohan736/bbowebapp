import Parser from "html-react-parser";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../app/constants";

function GetTheMentor(props) {
  return (
    <>
      <section className="sec-mentor section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-5 mb-5 mb-lg-0">
              <h2 className="section__heading" data-aos="fade-up">
                {props.getTheMentor.title
                  ? Parser(props.getTheMentor.title)
                  : ""}
              </h2>

              {props.getTheMentor.description ? (
                <div data-aos="fade-up">
                  {Parser(props.getTheMentor.description)}
                </div>
              ) : (
                <div></div>
              )}

              <Link
                data-aos="fade-up"
                className="btn btn-primary-outline mt-4"
                to={ROUTES_PATH.join}
              >
                Join as a Mentor
              </Link>
            </div>

            <div className="col-md-7 position-relative">
              <div className="row gx-4">
                <img
                  src="images/logo1.jpg"
                  alt="Logo"
                  className="gallery-logo gallery-logo-top"
                />
                <img
                  src="images/logo2.jpg"
                  alt="Logo"
                  className="gallery-logo gallery-logo-bottom"
                />
                <div className="col-md-4">
                  <div className="mentor-img-blk sec-mentor__grid__one">
                    <div className="img-blk">
                      <img src="images/mentor1.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor2.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor3.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor1.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor2.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor3.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor1.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor2.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor3.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor1.jpg" alt="Mentor" />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mentor-img-blk sec-mentor__grid__two">
                    <div className="img-blk">
                      <img src="images/mentor4.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor5.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor6.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor4.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor5.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor6.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor4.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor5.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor6.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor4.jpg" alt="Mentor" />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mentor-img-blk sec-mentor__grid__three">
                    <div className="img-blk">
                      <img src="images/mentor7.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor8.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor9.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor7.jpg" alt="Mentor" />
                    </div>

                    <div className="img-blk">
                      <img src="images/mentor8.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor9.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor7.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor8.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor9.jpg" alt="Mentor" />
                    </div>
                    <div className="img-blk">
                      <img src="images/mentor7.jpg" alt="Mentor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GetTheMentor;

import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../app/constants";

function TotalStats({ years, certifications, liveSessions }) {
  return (
    <>
      <div className="row text-center">
        <div className="col-sm-4">
          <div className="record-block" data-aos="fade-up">
            <h3
              className="counter-number counter-text purecounter"
              data-purecounter-start="0"
              data-purecounter-end="5"
              data-purecounter-duration="1"
            >
              {years}
            </h3>
            <h5>Year of Service</h5>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="record-block" data-aos="fade-up">
            <h3
              className="counter-number counter-text purecounter certification"
              data-purecounter-start="0"
              data-purecounter-end="5"
              data-purecounter-duration="1"
              data-title=""
            >
              {certifications}
            </h3>
            <h5>Provided Certification</h5>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="record-block" data-aos="fade-up">
            <h3
              className="counter-number counter-text purecounter"
              data-purecounter-start="0"
              data-purecounter-end="30"
              data-purecounter-duration="1"
            >
              {liveSessions}
            </h3>
            <h5>Live Session</h5>
          </div>
        </div>
      </div>
      <div className="row text-center mt-5">
        <div className="col-md-12">
          <Link className="btn btn-primary-outline" to={ROUTES_PATH.what_we_do}>
            Know More
          </Link>
        </div>
      </div>
    </>
  );
}
export default TotalStats;

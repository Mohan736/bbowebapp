import Parser from "html-react-parser";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../app/constants";

function WhyBBOrg(props) {
  return (
    <>
      <div className="row mb-5">
        <div className="col-md-3">
          <h2 className="section__heading" data-aos="fade-right">
            {props.whyBbo.title ? Parser(props.whyBbo.title) : ""}
          </h2>
        </div>
        <div className="col-md-9">
          <div data-aos="fade-up">
            {props.whyBbo.description ? (
              <p>{Parser(props.whyBbo.description)}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default WhyBBOrg;

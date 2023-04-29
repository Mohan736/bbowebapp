import Parser from 'html-react-parser';
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../../../app/constants";

function BbOrg(props){
    return <>
        <section className="sec-bbtm section-padding">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7 mb-5 mb-lg-0">
                <h2 className="section__heading" data-aos="fade-right">
                  {props.bbOrg.title ? Parser(props.bbOrg.title):''}
                </h2>
                  {props.bbOrg.description ? <p data-aos="fade-up">{Parser(props.bbOrg.description)}</p> : ''}
                  <Link data-aos="fade-right" className="btn mt-4 btn-primary-outline" to={ROUTES_PATH.join}>
                    Join Us
                  </Link>

              </div>
              <div className="col-md-5 text-center">
                <figure className="mb-0 gs_reveal" data-aos="fade-left">
                  <img
                    src="./images/bb-organization.svg"
                    alt="BB Organization"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
    </>
}

export default BbOrg;
import Parser from "html-react-parser";
function OurProgram(props) {
  return (
    <>
      <section
        id={props.id}
        className="program-section section-padding text-center"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section__heading">
                {props.ourProgram.mainTitle &&
                  Parser(props.ourProgram.mainTitle)}
              </h2>
              <p className="primary-clr">
                {props.ourProgram.mainDescription ? (
                  <p>{Parser(props.ourProgram.mainDescription)}</p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-12">
              <p className="h4 primary-clr animate-heading">
                {props.ourProgram.secondTitle ? (
                  <p>{Parser(props.ourProgram.secondTitle)}</p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>
          </div>
          <div className="row text-center secondary-clr justify-content-center">
            <div className="col-md-4">
              <div className="program-section__img">
                <img
                  src={
                    props.ourProgram.firstIconimage
                      ? `${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${props.ourProgram.firstIconimage[0]}`
                      : ""
                  }
                  alt="itscabling.png"
                />
              </div>
              <h3 className="text-upperase h2 mb-4 animate-heading">
                {props.ourProgram.firstIconTitle}
              </h3>
              <p className="primary-clr">
                {props.ourProgram.firstIcondesc ? (
                  <p>{Parser(props.ourProgram.firstIcondesc)}</p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>

            <div className="col-md-4">
              <div className="program-section__img">
                <img
                  src={
                    props.ourProgram.secondIconimage
                      ? `${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${props.ourProgram.secondIconimage[0]}`
                      : ""
                  }
                  alt="CCNA-Certification-Logo.png"
                />
              </div>
              <h3 className="h2 mb-4 animate-heading">
                {props.ourProgram.secondIconTitle}
              </h3>
              <p className="primary-clr">
                {props.ourProgram.secondIcondesc ? (
                  <p>{Parser(props.ourProgram.secondIcondesc)}</p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>

            <div className="col-md-4">
              <div className="program-section__img">
                <img
                  src={
                    props.ourProgram.thirdIconimage
                      ? `${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${props.ourProgram.thirdIconimage[0]}`
                      : ""
                  }
                  alt="microft-logo.svg"
                />
              </div>
              <h3 className="h2 mb-4 animate-heading">
                {props.ourProgram.thirdIconTitle}
              </h3>
              <p className="primary-clr">
                {props.ourProgram.thirdIcondesc ? (
                  <p>{Parser(props.ourProgram.thirdIcondesc)}</p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurProgram;

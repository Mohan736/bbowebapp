import Parser from "html-react-parser";
function Mission(props) {
  return (
    <>
      <div className="row gx-0 gx-md-4 align-items-center">
        <div className="col-md-6 order-2 order-md-1">
          <h2 className="section__heading">
            {props.mission.title && Parser(props.mission.title)}
          </h2>
          {props.mission.description ? (
            <p>{Parser(props.mission.description)}</p>
          ) : (
            <p></p>
          )}
          <a className="btn mt-4 btn-primary-outline" href="#contact-us-refr">
            Get in touch
          </a>
        </div>

        <div className="col-md-6 mb-5 mb-md-0 order-1 order-md-2">
          <div className="img-blk">
            <img
              src={
                props.mission.image
                  ? `${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${props.mission.image[0]}`
                  : ""
              }
              alt="Mission"
            />
            <div className="img-contents">
              <div className="quote-blk">
                <img src="images/quotes.svg" alt="quotes" />
              </div>
              <p className="mb-0">
                {props.mission.image_text ? (
                  <p>{Parser(props.mission.image_text)}</p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mission;

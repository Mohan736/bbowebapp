import Parser from "html-react-parser";
function Vision(props) {
  return (
    <>
      <div className="row mt-5 gx-0 gx-md-4 align-items-center">
        <div className="col-md-6 mb-5 mb-md-0">
          <div className="img-blk">
            <img
              src={
                props.vision.image
                  ? `${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${props.vision.image[0]}`
                  : ""
              }
              alt="Vission"
            />
            <div className="img-contents left-side-contents">
              <div className="quote-blk">
                <img src="images/quotes.svg" alt="quotes" />
              </div>
              <p className="mb-0">
                {props.vision.image_text ? (
                  <p>{Parser(props.vision.image_text)}</p>
                ) : (
                  <p></p>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="section__heading">
            {props.vision.title && Parser(props.vision.title)}
          </h2>

          {props.vision.description ? (
            <p>{Parser(props.vision.description)}</p>
          ) : (
            <p></p>
          )}
          <a className="btn btn-primary-outline mt-4" href="#contact-us-refr">
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}

export default Vision;

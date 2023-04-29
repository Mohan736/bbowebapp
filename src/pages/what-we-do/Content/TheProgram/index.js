import Parser from "html-react-parser";
function TheProgram(props) {
  return (
    <>
      <section>
        <div className="container">
          <div className="row my-5 gx-md-5 align-items-center">
            <div className="col-md-6 mb-5 mb-md-0">
              <div className="img-blk">
                <img
                  src={
                    props.theProgram.image
                      ? `${process.env.REACT_APP_IMAGE_URL_WEBSITE}/${props.theProgram.image[0]}`
                      : ""
                  }
                  alt="Vission"
                />
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="section__heading animate-heading">
                {/* What’s The Program Isn’t */}
                {props.theProgram.title && Parser(props.theProgram.title)}
              </h2>
              {props.theProgram.description ? (
                <p>{Parser(props.theProgram.description)}</p>
              ) : (
                <p></p>
              )}
              <a
                className="btn mt-4 btn-primary-outline"
                href="#contact-us-refr"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TheProgram;

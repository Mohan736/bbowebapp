import Parser from "html-react-parser";
function Methodology(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7 order-2 order-md-1">
            <div className="contents">
              <h2 className="section__heading">
                {props.methodology.title
                  ? Parser(props.methodology.title)
                  : ""}
              </h2>
              {props.methodology.description ? (
                <p>{Parser(props.methodology.description)}</p>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div className="col-md-5 order-1 order-md-2 text-lg-end text-center mb-5 mb-md-0">
            <img src="images/methodology.svg" alt="Methodology" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Methodology;

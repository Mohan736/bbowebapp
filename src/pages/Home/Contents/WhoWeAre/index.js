import Parser from "html-react-parser";
function WhoWeAre(props) {
  return (
    <>
      <section id={props.id} className="sec-bbtm section-padding text-center">
        <div className="container homepage-sec-who-we-are">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <h2 className="section__heading" data-aos="fade-up">
                {props.whoWeAre.title ? Parser(props.whoWeAre.title) : ""}
              </h2>
              <div data-aos="fade-up">
                {props.whoWeAre.description ? (
                  <>{Parser(props.whoWeAre.description)}</>
                ) : (
                  ""
                )}

                <a
                  className="btn btn-primary-outline mt-4"
                  data-aos="fade-up"
                  // href="#contact-us-refr"
                  href={props.idTwo}
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhoWeAre;

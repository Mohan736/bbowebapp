import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../../components/footer";
import Navbar from "../../../../components/navbar";
import { emailVerfied } from "../../../../redux/actions/actions";

function Verified() {
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emailVerfied(token));
  }, []);

  const URL = process.env.REACT_APP_URL;

  return (
    <>
      <Navbar />
      <div className="scroll-wrapper">
        <section className="body-padding section-padding">
          <div className="container">
            <div className="row justify-content-center align-items-center gy-4 gy-md-0 gx-md-5">
              <div className="col-md-6 col-lg-6">
                <img src={`${URL}./images/email-verified.svg`} alt="" />
              </div>
              <div className="col-md-6 col-lg-5">
                <h1 className="h2 font-primary mb-3 text-capitalize">
                  The email verification has been completed
                </h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
                <div className="form-group mt-4">
                  <Link to="/login" className="btn btn-primary-outline w-65">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Verified;

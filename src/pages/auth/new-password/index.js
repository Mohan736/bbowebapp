import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import TextField from "../../../components/text-field";
import "./new-password.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { set_new_password } from "../../../utils/end-points";
import Loading from "../../../components/loading";

function Newpassword() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showconfirmpass, setShowconfirmpass] = useState(false);
  const [loading, setLoading] = useState(false);

  // React Hook Form Dependencies

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  // Form Submit

  const formSubmit = (e) => {
    setLoading(true);
    try {
      axios
        .post(set_new_password, {
          email: localStorage.getItem("email"),
          password: e.password,
        })
        .then((res) => {
          setOpen(true);
        })
        .catch((err) => {});
    } catch (error) {}
    setLoading(false);
  };

  // Url For Images
  const URL = process.env.REACT_APP_URL;

  return (
    <>
      <div
        className={
          open === true ? "reset-link-popup active" : "reset-link-popup"
        }
      >
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div className="popup-wrapper">
            <img src={`${URL}./images/like-blue.svg`} className="mb-4" alt="" />
            <p className="text-dark">
              You have successfully updated your password
            </p>
            <p className="small-text mb-4">
              Lorem Ipsum is simply dummy text of the printing and m Ipsum has
              been the industry's standard dummy text ever.
            </p>
            <div className="text-center">
              <Link to="/login" className="btn btn-primary-fill">
                <a>back to Login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <div className="scroll-wrapper">
        <section className="body-padding section-padding">
          <div className="container">
            <div className="row justify-content-center align-items-center gy-4 gy-md-0 gx-md-5">
              <div className="col-md-5">
                <img src={`${URL}./images/forgot-pass.svg`} alt="" />
              </div>
              <div className="col-md-5">
                <h1 className="h3 text-center font-primary mb-5">
                  Create a New Password
                </h1>
                <form onSubmit={handleSubmit(formSubmit)} className="form">
                  <div className="form-group position-relative mb-0">
                    {show === true ? (
                      <>
                        <img
                          src={`${URL}images/eye.svg`}
                          alt="eye"
                          className="password-view"
                          onClick={() => setShow(!show)}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={`${URL}images/eye-slash.svg`}
                          alt="eye"
                          className="password-view"
                          onClick={() => setShow(!show)}
                        />
                      </>
                    )}

                    <TextField
                      type={show === true ? "text" : "password"}
                      name="password"
                      register={register}
                      placeholder="Password *"
                      errorMessage={errors?.password?.message}
                    />
                  </div>
                  <ul className="pass-valid mt-3 mb-4">
                    <li>A minimum of 12 characters</li>
                    <li>At least one number</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one uppercase letter</li>
                  </ul>
                  <div className="form-group position-relative">
                    {showconfirmpass === true ? (
                      <>
                        <img
                          src={`${URL}images/eye.svg`}
                          alt="eye"
                          className="password-view"
                          onClick={() => setShowconfirmpass(!showconfirmpass)}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={`${URL}images/eye-slash.svg`}
                          alt="eye"
                          className="password-view"
                          onClick={() => setShowconfirmpass(!showconfirmpass)}
                        />
                      </>
                    )}

                    <TextField
                      type={showconfirmpass === true ? "text" : "password"}
                      register={register}
                      name="confirmPassword"
                      placeholder="Confirm Password *"
                      errorMessage={errors?.confirmPassword?.message}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary-fill w-100 forgot-popup-trigger"
                    >
                      {loading === true ? (
                        <Loading loaderClass="loading_button" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Newpassword;

const schema = yup.object({
  password: yup
    .string()
    .required("Password is Required")
    .min(6, "Password is too short - should be 6 characters minimum")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: yup
    .string()
    .required("Password is Required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

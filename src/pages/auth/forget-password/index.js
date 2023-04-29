import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import TextField from "../../../components/text-field";
import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { forget_Password } from "../../../utils/end-points";
import { createNotification } from "../../../common/create-notifictions";
import Loading from "../../../components/loading";
function ForgetPassword() {
  const [open, setOpen] = useState(false);
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

  // Form  Submit
  const formSubmit = async (e) => {
    setLoading(true);
    try {
      await axios
        .post(forget_Password, {
          email: e.email,
        })
        .then((res) => {
          setOpen(true);
          localStorage.setItem("email", e.email);
        })
        .catch((err) => {
          createNotification("error", "Error", err?.response?.data?.msg);
        });
      setLoading(false);
    } catch (error) {}
  };

  return (
    <>
      <div
        className={
          open === true ? "reset-link-popup active" : "reset-link-popup"
        }
      >
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div className="popup-wrapper">
            <img src="./images/mail-sent.svg" className="mb-4" alt="" />
            <p className="primary-clr">
              The link to reset your password has been sent to your registered
              email address. Please check it.
            </p>
            <p className="small-text mb-4 px-0 px-md-4">
              Lorem Ipsum is simply dummy text of the printing and m Ipsum has
              been the industry's standard dummy text ever.
            </p>
            <div className="text-center">
              <Link
                to="#"
                className="btn btn-primary-fill"
                onClick={() => setOpen(false)}
              >
                Close
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
                <img src="./images/forgot-pass.svg" alt="" />
              </div>
              <div className="col-md-5">
                <h1 className="h3 text-center font-primary mb-5">
                  Forgot Password?
                </h1>
                <form onSubmit={handleSubmit(formSubmit)} className="form">
                  <div className="form-group">
                    <TextField
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      register={register}
                      errorMessage={errors?.email?.message}
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
                        " Request Reset Link"
                      )}
                    </button>
                  </div>
                  <div className="form-group">
                    <p className="small text-center">
                      <Link to="/login" className="primary-clr">
                        <a>Back to login</a>
                      </Link>
                    </p>
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

export default ForgetPassword;

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
});

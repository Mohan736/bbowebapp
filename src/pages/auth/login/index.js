import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../../components/text-field";
import { createNotification } from "../../../common/create-notifictions";
import "./login.css";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actions/actions";
import Loading from "../../../components/loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MySlider from "../../../components/slider";
import axios from "axios";
import { login } from "../../../utils/end-points";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form Dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Submit

  const formSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post(login, e);
      const data = response.data;
      createNotification("success", "success", "Login Successful");
      dispatch(loginUser(data));
      localStorage.setItem("userId", response.data.userExists.id);
      localStorage.setItem("role", response.data.userExists.role);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("user", JSON.stringify(response.data.userExists));

      if (data?.userExists?.address) {
        navigate("/coming-soon");
      } else {
        navigate("/steps-profile");
      }
    } catch (error) {
      createNotification("error", "Error", error?.response?.data?.msg);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="scroll-wrapper">
        <section className="body-padding section-padding">
          <div className="container">
            <div className="row justify-content-center align-items-center gy-4 gy-md-0 gx-md-5">
              <div className="col-md-5">
                <h1 className="h3 text-center font-primary mb-5">Log In</h1>
                <form
                  onSubmit={handleSubmit(formSubmit)}
                  className="form"
                  autoComplete="off"
                >
                  <input
                    autoComplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />

                  <div className="form-group">
                    <TextField
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      register={register}
                      errorMessage={errors?.email?.message}
                    />
                  </div>
                  <div className="form-group position-relative">
                    {show === true ? (
                      <>
                        <img
                          src="images/eye.svg"
                          alt="eye"
                          className="password-view"
                          onClick={() => setShow(!show)}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src="images/eye-slash.svg"
                          alt="eye"
                          className="password-view"
                          onClick={() => setShow(!show)}
                        />
                      </>
                    )}

                    <TextField
                      type={show === true ? "text" : "password"}
                      name="password"
                      placeholder="Password *"
                      register={register}
                      errorMessage={errors?.password?.message}
                    />
                  </div>
                  <div className="form-group">
                    <div className="d-flex align-items-center form__footer primary-clr">
                      <input
                        id="remember"
                        type="checkbox"
                        name="remember"
                        className="remember d-none"
                        value="remember"
                        defaultChecked
                      />
                      <label htmlFor="remember"></label>

                      <Link
                        to="/forget-password"
                        className="ms-auto text-underline"
                      >
                        Forgot Password ?
                      </Link>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary-fill w-100"
                    >
                      {loading === true ? (
                        <Loading loaderClass="loading_button" />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                  <div className="form-group">
                    <p className="small text-center">
                      Not Member yet?{" "}
                      <Link to="/join" className="primary-clr text-underline">
                        Join Our Community
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              <div className="col-md-5 d-none d-md-block">
                <MySlider />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Login;

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is Required"),
});

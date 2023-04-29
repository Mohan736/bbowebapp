import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import "./register.css";
import TextField from "../../../components/text-field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/actions/actions";
import Loading from "../../../components/loading";
import MySlider from "../../../components/slider";
import axios from "axios";
import { signup } from "../../../utils/end-points";
import { createNotification } from "../../../common/create-notifictions";

const SignUp = () => {
  const signupData = useSelector((data) => data.data);
  const dispatch = useDispatch();

  // React Hook Form Dependencies

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmemail, setConfirmEmail] = useState(false);
  const [afterConfirmMail, setAfterConfirmMail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");

  // Form Submit Handler

  const formSubmit = async (e) => {
    setLoading(true);
    const { role, first_name, last_name, email, password } = e;
    const obj = { role, first_name, last_name, email, password };
    try {
      await axios
        .post(signup, obj)
        .then((res) => {
          setColor(e.role);
          setConfirmEmail(true);
          setAfterConfirmMail(true);
          dispatch(registerUser(res.data));
          reset();
        })
        .catch((err) => {
          createNotification("error", "Error", err?.response?.data?.msg);
        });
    } catch (error) {}
    setLoading(false);
  };

  // Use Effect For Showing Confirming Mail text

  useEffect(() => {
    if (afterConfirmMail === true) {
      setTimeout(() => {
        setConfirmEmail(false);
      }, 7000);
    }
  }, [afterConfirmMail]);

  // Styles for Progress Bar

  const styles = {
    role: {
      backgroundColor: color === "member" ? "#fdd417" : "#1790ff",
      width: "100%",
      color: color === "member" ? "#000" : "#fff",
    },
  };

  return (
    <>
      <Navbar />
      <div className="scroll-wrapper">
        <section className="body-padding section-padding">
          <div className="container">
            <div className="row justify-content-center align-items-center gy-4 gy-md-0 gx-md-5">
              <div className="col-md-5">
                <h1 className="h3 text-center font-primary mb-5">
                  Join Our Community
                </h1>
                <form onSubmit={handleSubmit(formSubmit)} className="form">
                  <div className="row">
                    <div className="col-lg-12">
                      <div
                        style={styles.role}
                        className={
                          confirmemail === true
                            ? "email-sent-noti mb-5 d-flex"
                            : "email-sent-noti mb-5"
                        }
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="5.5"
                            cy="5.11768"
                            r="4.75"
                            stroke={color === "member" ? "#000" : "white"}
                            strokeWidth="0.5"
                          />
                          <path
                            d="M5.55147 8C5.30781 8 5.11029 7.80249 5.11029 7.55882V4.18382C5.11029 3.94016 5.30781 3.74265 5.55147 3.74265C5.79513 3.74265 5.99265 3.94016 5.99265 4.18382V7.55882C5.99265 7.80249 5.79513 8 5.55147 8ZM5.55147 2C5.2469 2 5 2.2469 5 2.55147C5 2.85604 5.2469 3.10294 5.55147 3.10294C5.85604 3.10294 6.10294 2.85604 6.10294 2.55147C6.10294 2.2469 5.85604 2 5.55147 2Z"
                            fill={color === "member" ? "#000" : "white"}
                          />
                        </svg>
                        {/* <img src="./images/info-icon.svg" alt="" /> */}
                        <span
                          className={
                            color === "member"
                              ? "small-text text-dark"
                              : "small-text text-white"
                          }
                        >
                          An email has been sent, check your inbox to verify.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="primary-clr form-label">
                      Who Are You?
                    </label>
                    <div className="role">
                      <div className="role__blk">
                        <input
                          type="radio"
                          name="member"
                          id="Member-role"
                          value={"member"}
                          {...register("role")}
                        />
                        <label htmlFor="Member-role">Member</label>
                      </div>

                      <div className="role__blk">
                        <input
                          type="radio"
                          name="role"
                          id="Mentor-role"
                          value={"mentor"}
                          {...register("role")}
                          // onChange={handleRadioChange}
                        />
                        <label htmlFor="Mentor-role">Mentor</label>
                      </div>

                      <div className="role__blk">
                        <input
                          type="radio"
                          name="role"
                          id="Sponsor-role"
                          value={"sponser"}
                          {...register("role")}
                          disabled
                        />
                        <label htmlFor="Sponsor-role">Sponsor</label>
                      </div>
                    </div>
                    {errors?.role?.message && (
                      <span className="error_message text-center">
                        Please select one option
                      </span>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          type="text"
                          name="first_name"
                          placeholder="First Name *"
                          register={register}
                          errorMessage={errors?.first_name?.message}
                          // errorMessage={errors.first_name}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          type="text"
                          name="last_name"
                          placeholder="Last Name *"
                          register={register}
                          errorMessage={errors?.last_name?.message}
                          // errorMessage={errors.lastName}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <TextField
                          type="email"
                          name="email"
                          placeholder="Email *"
                          register={register}
                          errorMessage={errors?.email?.message}
                          // errorMessage={errors.email}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group position-relative">
                        {showConfirm === true ? (
                          <>
                            <img
                              src="images/eye.svg"
                              alt="eye"
                              className="password-view"
                              onClick={() => setShowConfirm(!showConfirm)}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src="images/eye-slash.svg"
                              alt="eye"
                              className="password-view"
                              onClick={() => setShowConfirm(!showConfirm)}
                            />
                          </>
                        )}
                        <TextField
                          type={showConfirm === true ? "text" : "password"}
                          name="confirm"
                          placeholder="Confirm Password *"
                          register={register}
                          errorMessage={errors?.confirm?.message}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary-fill w-100 join-btn"
                    >
                      {loading === true ? (
                        <Loading loaderClass="loading_button" />
                      ) : (
                        "Join Us"
                      )}
                    </button>
                  </div>
                  <div className="form-group">
                    <p className="small text-center">
                      Are you already Member?{" "}
                      <Link to="/login" className="primary-clr text-underline">
                        Log In
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

export default SignUp;

const schema = yup.object({
  role: yup.string().required("Please select a value"),
  first_name: yup.string().required("First Name is Required"),
  last_name: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 characters minimum")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirm: yup
    .string()
    .required("Password is Required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

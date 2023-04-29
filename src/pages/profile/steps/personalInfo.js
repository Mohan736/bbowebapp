import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "../../../components/text-field";
import { useDispatch, useSelector } from "react-redux";
import { handleWidth } from "../../../redux/actions/actions";
import Loading from "../../../components/loading";
import DatePicker from "react-date-picker";
import moment from "moment";
import Parser from "html-react-parser";
import axios from "axios";
import { personalinfoUpdate } from "../../../utils/end-points";
import { createNotification } from "../../../common/create-notifictions";

function PersonalInfo({ handlePersonalInfoBack, handleForward }) {
  const dispatch = useDispatch();

  //State from Redux

  const data = useSelector((data) => data.data);

  //fields state
  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    nationality: "",
    realationship_status: "",
    spoken_languages: "",
    about_me: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    type: "",
    file: "",
  });

  // calculate  max date for date of birth
  const maxdate = moment().subtract(18, "years");
  const [checkDob, setCheckDob] = useState(false);
  //date of birth Calender
  const [maxdateoFBirth, setMaxdate] = useState(maxdate._d);
  const [value, setValue] = useState(maxdateoFBirth);

  const [errorMessage, setErrorMessage] = useState({
    dateOfBirth: "",
    phone: "",
  });

  //get Previous Width From localSotrage

  const previousWidth = localStorage.getItem("uploadWidth");
  const [loading, setLoading] = useState();
  const [width, setWidth] = useState(previousWidth);
  const [check, setCheck] = useState(false);
  const [address, setAddress] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Input On Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(value);
    setFields({ ...fields, [name]: value });
    formValidations(!fields);
  };

  // React Hook Form dependencies

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const userId = localStorage.getItem("userId");

  // Submit Handler

  const formSubmit = async (data) => {
    setLoading(true);
    try {
      if (!fields.phone) {
        setErrorMessage({ ...errorMessage, phone: "Phone Number is Required" });
      } else if (fields.phone.length < 14) {
        setErrorMessage({
          ...errorMessage,
          phone: "Please Enter a valid Number",
        });
      } else {
        setCheck(true);
        let formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("phone", fields.phone);
        formData.append("nationality", data.nationality);
        formData.append("realationship_status", data.realationship_status);
        formData.append("spoken_languages", data.spoken_languages);
        formData.append("gender", data.gender);
        formData.append("date_of_birth", value.toLocaleDateString());
        if (!!data.about_me) {
          formData.append("about_me", data.about_me);
        } else {
          formData.append("about_me", null);
        }
        formData.append("address", data.address);
        formData.append("type", data.type);
        formData.append("user_id", userId);
        formData.append("file", data?.filecheck[0]);
        await axios
          .post(personalinfoUpdate, formData)
          .then((res) => {
            localStorage.setItem("width", width);
            handleForward();
          })
          .catch((err) => {
            if (
              err?.response?.data?.msg ===
              '"phone" length must be at least 5 characters long'
            ) {
              createNotification(
                "error",
                "Error",
                "Please enter a valid Number"
              );
            } else {
              createNotification("error", "Error", err?.response?.data?.msg);
            }
          });
        dispatch(handleWidth(width));
      }
    } catch (error) {}
    setLoading(false);
  };

  // Validation For Phone Number

  const formValidations = (value) => {
    if (!value) {
      setErrorMessage({ ...errorMessage, phone: "Phone Number is Required" });
    } else if (
      value ===
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    ) {
      setErrorMessage({
        ...errorMessage,
        phone: "Please enter a valid Number",
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        phone: "",
      });
    }
  };

  //On Change For Phone Number

  const handleInputPhoneNumber = (e) => {
    const value = e.target.value;
    if (!e.target.value) {
      setErrorMessage({
        ...errorMessage,
        phone: "Phone Number is required",
      });
    } else if (e.target.value.length < 14) {
      setErrorMessage({
        ...errorMessage,
        phone: "Please Enter a valid number",
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        phone: "",
      });
    }
    const newValue = formattNumber(value);
    setFields({ ...fields, phone: newValue });
  };

  //Auto Format Phone Number Function

  function formattNumber(value) {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const totalLength = phoneNumber.length;
    if (totalLength < 4) return phoneNumber;
    if (totalLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  // Progress bar Animation

  useEffect(() => {
    let phoneWidth,
      nationalityWidth,
      firstNameWidth,
      lastNameWidth,
      filecheckWidth,
      relationshipWidth,
      languagesWidth,
      aboutWidth,
      genderWidth,
      typeWidth,
      addressWidth,
      dateWidth;

    if (!fields.phone) {
      phoneWidth = 0;
    } else {
      phoneWidth = 2.783333333;
    }

    if (!watch("nationality")) {
      nationalityWidth = 0;
    } else {
      nationalityWidth = 2.783333333;
    }

    if (!watch("first_name")) {
      firstNameWidth = 0;
    } else {
      firstNameWidth = 2.783333333;
    }
    if (!watch("last_name")) {
      lastNameWidth = 0;
    } else {
      lastNameWidth = 2.783333333;
    }
    if (!watch("filecheck")) {
      filecheckWidth = 0;
    } else {
      filecheckWidth = 2.783333333;
    }
    if (!watch("realationship_status")) {
      relationshipWidth = 0;
    } else {
      relationshipWidth = 2.783333333;
    }
    if (!watch("spoken_languages")) {
      languagesWidth = 0;
    } else {
      languagesWidth = 2.783333333;
    }
    if (!watch("about_me")) {
      aboutWidth = 0;
    } else {
      aboutWidth = 2.783333333;
    }
    if (!watch("gender")) {
      genderWidth = 0;
    } else {
      genderWidth = 2.783333333;
    }
    if (!watch("type")) {
      typeWidth = 0;
    } else {
      typeWidth = 2.783333333;
    }
    if (!watch("address")) {
      addressWidth = 0;
    } else {
      addressWidth = 2.783333333;
    }
    if (!value) {
      dateWidth = 0;
    } else {
      dateWidth = 2.783333333;
    }

    const totalWidth =
      16.6 +
      phoneWidth +
      nationalityWidth +
      firstNameWidth +
      lastNameWidth +
      filecheckWidth +
      relationshipWidth +
      languagesWidth +
      aboutWidth +
      genderWidth +
      typeWidth +
      dateWidth +
      addressWidth;
    setWidth(parseFloat(totalWidth).toFixed(1));
  }, [
    fields.phone,
    watch("first_name"),
    watch("last_name"),
    watch("filecheck"),
    watch("nationality"),
    watch("realationship_status"),
    watch("spoken_languages"),
    watch("about_me"),
    watch("gender"),
    watch("type"),
    watch("address"),
    value,
  ]);

  //Style For Progress Bar

  const styles = {
    role: {
      backgroundColor: user?.roleId === "mentor" ? "#1790FF" : "#fdd417",
      width: `${width}%`,
      color: user?.roleId === "mentor" ? "#fff" : "#000",
    },
  };

  return (
    <div className="personal_informations">
      {data?.signupData?.personalized_information1_title
        ? Parser(data?.signupData?.personalized_information1_title)
        : ""}

      <p className="p-default text_para_second">
        {data?.signupData?.personalized_information1_description
          ? Parser(data?.signupData?.personalized_information1_description)
          : ""}
      </p>

      <div className="progress">
        <div
          style={styles.role}
          className="progress-bar-profile"
          role="progressbar"
          aria-label="Example with label"
          aria-valuenow="33.2"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {width}%
        </div>
      </div>

      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="block-get-touch step-form mt-4">
          <div className="row g-3">
            <div className="col-lg-6 mb-3">
              <TextField
                inputDivStyle={"form-control"}
                type="text"
                name="first_name"
                register={register}
                // value={user.first_name}
                handleChange={handleInputChange}
                placeholder="First Name"
                defaultValue={`${user.first_name}`}
                errorMessage={errors?.first_name?.message}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <TextField
                inputDivStyle={"form-control"}
                placeholder="Last Name"
                handleChange={handleInputChange}
                type="text"
                name="last_name"
                register={register}
                defaultValue={`${user.last_name}`}
                errorMessage={errors?.last_name?.message}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-12 mb-3">
              <input
                className="form-control"
                placeholder="Phone No *"
                name="phone"
                onChange={handleInputPhoneNumber}
                value={fields.phone}
              />
              {errorMessage?.phone && (
                <span className="error_message">{errorMessage?.phone}</span>
              )}
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-6 mb-3">
              <div className="select-form">
                <select
                  name=""
                  className="form-control"
                  id=""
                  {...register("nationality")}
                >
                  <option value="" selected hidden>
                    Nationality
                  </option>
                  <option value="United States">United States</option>
                </select>
                {errors?.nationality?.message && (
                  <span className={"error_message"}>
                    {errors?.nationality?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="select-form">
                <select
                  name=""
                  className="form-control"
                  id=""
                  {...register("realationship_status")}
                >
                  <option value="" selected hidden>
                    Relationship Status
                  </option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
                {errors?.realationship_status?.message && (
                  <span className={"error_message"}>
                    {errors?.realationship_status?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-12 mb-3">
              <div className="select-form">
                <select
                  name=""
                  className="form-control"
                  id=""
                  {...register("spoken_languages")}
                >
                  <option value="" selected hidden>
                    Languages Spoken
                  </option>
                  <option value="English">English</option>
                </select>
                {errors?.spoken_languages?.message && (
                  <span className={"error_message"}>
                    {errors?.spoken_languages?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-12 mb-3">
              <textarea
                name="aboutUser"
                className="form-control"
                placeholder="Tell Us About Yourself"
                rows="3"
                {...register("about_me")}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-6 mb-3">
              <div className="select-form">
                <select
                  name=""
                  className="form-control"
                  id=""
                  {...register("gender")}
                >
                  <option value="" selected hidden>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors?.gender?.message && (
                  <span className={"error_message"}>
                    {errors?.gender?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="datepicker-wrapper">
                <DatePicker
                  name="start_date"
                  className="form-control"
                  onChange={(value) => {
                    setValue(value);
                    setCheckDob(true);
                  }}
                  value={value}
                  maxDate={maxdateoFBirth}
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YY"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-12 mb-3">
              <input
                className="form-control"
                placeholder="Enter Address *"
                name="address"
                {...register("address")}
              />
              {errors?.address?.message && !address.length && (
                <span className={"error_message"}>
                  {errors?.address?.message}
                </span>
              )}
            </div>
          </div>
          <h4 className="my-3">Upload your ID Proof</h4>
          <div className="row g-3">
            <div className="col-lg-6">
              <div className="select-form">
                <select
                  name=""
                  className="form-control"
                  id=""
                  {...register("type")}
                >
                  <option value="" selected hidden>
                    Select ID Proof
                  </option>
                  <option value="Driver's License">Driver's License</option>
                  Driver's License
                  <option value="Passport">Passport</option>
                </select>
                {errors?.type?.message && (
                  <span className={"error_message"}>
                    {errors?.type?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <input
                type="file"
                className="form-control"
                name="filecheck"
                {...register("filecheck")}
              />
              {errors?.filecheck?.message && (
                <span className={"error_message"}>
                  {errors?.filecheck?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="button-group">
          <button
            type="button"
            className="prev-slide"
            onClick={handlePersonalInfoBack}
            disabled
          >
            {/* <svg
              width="19"
              height="15"
              viewBox="0 0 19 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.02714 6.61609L9.39338 1.24985L8.14352 0L0.643524 7.5L1.26845 8.12493L8.14352 15L9.39338 13.7501L4.02714 8.38391H18.3218V6.61609H4.02714Z"
                fill="black"
              />
            </svg>
            Previous Step */}
          </button>
          <button type="submit" className="btn btn-primary-fill next-slide">
            {loading === true ? (
              <Loading loaderClass="loading_button" />
            ) : (
              "Next Step"
            )}
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6164 6.61609L9.25018 1.24985L10.5 0L18 7.5L17.3751 8.12493L10.5 15L9.25018 13.7501L14.6164 8.38391H0.321777V6.61609H14.6164Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  first_name: yup
    .string()
    .required("First Name is Required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
  last_name: yup
    .string()
    .required("Last Name is Required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
  filecheck: yup
    .mixed()
    .test("name", "Please Provide a File", (value) => {
      return value[0] && value[0].name !== "";
    })
    .test("fileSize", "The file is too large", (value) => {
      return value[0] && value[0].size <= 1000000000;
    }),
  nationality: yup.string().required("Please select one option"),
  realationship_status: yup.string().required("Please select one option"),
  spoken_languages: yup.string().required("Please select one option"),
  about_me: yup.string(),
  gender: yup.string().required("Please select one Option"),
  type: yup.string().required("ID Proof is required"),
  address: yup.string().required("Address is required"),
});

import React, { useEffect, useState } from "react";
import TextField from "../../../components/text-field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  educationalInfoUpdate,
  handleWidth,
} from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/loading";
import DatePicker from "react-date-picker";
import axios from "axios";
import { educationalinfoUpdate } from "../../../utils/end-points";
import { createNotification } from "../../../common/create-notifictions";
import Parser from "html-react-parser";

function Educationalinfo({ handleForwardEducInfo, handleBackEducInfo }) {
  //Get Date From Redux
  const data = useSelector((data) => data.data);
  const dispatch = useDispatch();

  // Get Previous Step Width From Localstotage

  const previousstepWidth = localStorage.getItem("width");

  useEffect(() => {
    setWidth(previousstepWidth);
  }, [previousstepWidth]);

  const [start_date, onChangeStartDate] = useState();
  const [end_date, onChangeEndDate] = useState();
  const [max_date, setMaxDate] = useState();
  const [min_date, setMindate] = useState();
  const [width, setWidth] = useState(previousstepWidth);
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState({
    start_date: "",
    start_date: "",
  });

  // React Hook Form Dependencies
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  // Submit Form Handler

  const formSubmit = async (data) => {
    const educationObj = {
      title: data.title,
      start_date: start_date.toLocaleDateString(),
      end_date: end_date.toLocaleDateString(),
      type: data.type,
    };
    !!data.specialization
      ? (educationObj.specialization = data.specialization)
      : (educationObj.specialization = " ");
    !!data.description
      ? (educationObj.description = data.description)
      : (educationObj.description = " ");
    setLoading(true);
    try {
      const res = await axios.post(educationalinfoUpdate, educationObj);
      handleForwardEducInfo();
      dispatch(educationalInfoUpdate(res.data));
      localStorage.setItem("widththird", width);
      dispatch(handleWidth(width));
    } catch (error) {
      createNotification("error", "Error", error?.response?.data?.msg);
    }

    setLoading(false);
  };
  // Get User From LocalStorage

  const user = JSON.parse(localStorage.getItem("user"));

  // Progress Bar Animations

  useEffect(() => {
    let titleWidth,
      typeWidth,
      specializationWidth,
      descriptionWidth,
      startWidth,
      endWidth;

    if (!watch("title")) {
      titleWidth = 0;
    } else {
      titleWidth = 5;
    }

    if (!watch("type")) {
      typeWidth = 0;
    } else {
      typeWidth = 5;
    }

    if (!watch("specialization")) {
      specializationWidth = 0;
    } else {
      specializationWidth = 5;
    }

    if (!watch("description")) {
      descriptionWidth = 0;
    } else {
      descriptionWidth = 5;
    }
    if (!start_date) {
      startWidth = 0;
    } else {
      startWidth = 5;
    }
    if (!end_date) {
      endWidth = 0;
    } else {
      endWidth = 5;
    }

    const totalWidth =
      parseFloat(previousstepWidth) +
      titleWidth +
      typeWidth +
      specializationWidth +
      descriptionWidth +
      endWidth +
      startWidth;
    setWidth(parseFloat(totalWidth).toFixed(1));
  }, [
    watch("title"),
    watch("type"),
    watch("specialization"),
    watch("description"),
    end_date,
    start_date,
  ]);

  //  Progress Bar Style

  const styles = {
    role: {
      backgroundColor: user?.roleId === "mentor" ? "#1790FF" : "#fdd417",
      width: `${width}%`,
      color: user?.roleId === "mentor" ? "#fff" : "#000",
    },
  };

  // Get next day date from Selected date

  useEffect(() => {
    var tomorrow = new Date(start_date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMaxDate(tomorrow);
  }, [start_date]);

  // Get Pervious day date from Selected date

  useEffect(() => {
    var yesterDay = new Date(end_date);
    yesterDay.setDate(yesterDay.getDate() - 1);
    setMindate(yesterDay);
  }, [end_date]);

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {data?.signupData?.educational_information_title
        ? Parser(data?.signupData?.educational_information_title)
        : ""}

      <p className="p-default text_para_second">
        {data?.signupData?.educational_information_description
          ? Parser(data?.signupData?.educational_information_description)
          : ""}
      </p>
      <div className="progress">
        <div
          className="progress-bar-profile"
          role="progressbar"
          aria-label="Example with label"
          style={styles.role}
          aria-valuenow="49.8"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {width}%
        </div>
      </div>
      <div className="block-get-touch step-form mt-4">
        <div className="row g-3">
          <div className="col-lg-12 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="title"
              placeholder="School"
              register={register}
              errorMessage={errors?.title?.message}
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-6 mb-3">
            <div className="datepicker-wrapper">
              <div className="start_date_wrapper">
                <DatePicker
                  name="start_date"
                  className="form-control"
                  onChange={onChangeStartDate}
                  value={start_date}
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YY"
                  maxDate={min_date || new Date()}
                  required
                />
              </div>

              {errorMessage?.start_date && (
                <span className={"error_message"}>
                  {errorMessage?.start_date}
                </span>
              )}
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <div className="datepicker-wrapper">
              <div className="end_date_wrapper">
                <DatePicker
                  name="start_date"
                  className="form-control"
                  onChange={onChangeEndDate}
                  value={end_date}
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YY"
                  minDate={max_date || new Date()}
                  required
                />
              </div>

              {errorMessage?.end_date && (
                <span className={"error_message"}>
                  {errorMessage?.end_date}
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
                {...register("type")}
              >
                <option value="" selected hidden>
                  Degree
                </option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
                <option value="MBA">MBA</option>
              </select>
              {errors?.type?.message && (
                <span className={"error_message"}>{errors?.type?.message}</span>
              )}
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-12 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="specialization"
              register={register}
              placeholder="Specialization"
              errorMessage={errors?.specialization?.message}
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-12">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              {...register("description")}
              rows="3"
            ></textarea>
            {errors?.description?.message && (
              <span className={"error_message"}>
                {errors?.description?.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="button-group">
        <button
          type="button"
          onClick={handleBackEducInfo}
          className="prev-slide"
        >
          <svg
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
          Previous Step
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
  );
}

export default Educationalinfo;

const schema = yup.object({
  title: yup.string().required("This field is Required"),
  type: yup.string().required("This field is Required"),
  specialization: yup.string(),
  description: yup.string(),
});

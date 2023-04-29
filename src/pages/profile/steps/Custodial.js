import React, { useEffect, useState } from "react";
import TextField from "../../../components/text-field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  custodialInfoUpdate,
  handleWidth,
} from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";
import axios from "axios";
import { custodialUpdate } from "../../../utils/end-points";
import { createNotification } from "../../../common/create-notifictions";
import Loading from "../../../components/loading";
import Parser from "html-react-parser";

function CustoDial({ handleForwardcustodial, handlecustoDialBack }) {
  //  Redux State
  const data = useSelector((data) => data.data);

  // Get Previous Step Width From LocalStorage
  const previousstepWidth = localStorage.getItem("widththird");

  useEffect(() => {
    setWidth(previousstepWidth);
  }, [previousstepWidth]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [width, setWidth] = useState(previousstepWidth);
  const [start_date, onChangeStartDate] = useState();
  const [end_date, onChangeEndDate] = useState();
  const [days, setDays] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [max_date, setMaxDate] = useState();
  const [min_date, setMindate] = useState();

  const [errorMessage, setErrorMessage] = useState({
    start_date: "",
    start_date: "",
  });

  const calculateTime = () => {
    // Selected Start And End Date
    const date1 = start_date;
    const date2 = end_date;

    // Calculate Date Difference

    function daysDiff(dt1, dt2) {
      var diffTime = dt2?.getTime() - dt1?.getTime();

      var daysDiff = diffTime / (1000 * 3600 * 24);

      return daysDiff;
    }

    const days = daysDiff(date1, date2);

    function monthDiff(d1, d2) {
      var months;
      months = (d2?.getFullYear() - d1?.getFullYear()) * 12;
      months -= d1?.getMonth();
      months += d2?.getMonth();
      return months <= 0 ? 0 : months;
    }
    const month_differnece = monthDiff(date1, date2);

    function yearDiff(dt1, dt2) {
      var diffYear = (dt2?.getTime() - dt1?.getTime()) / 1000;
      diffYear /= 60 * 60 * 24;
      return Math.abs(Math.round(diffYear / 365.25));
    }

    const year_differnece = yearDiff(date1, date2);
    setDays(days);
    setMonth(month_differnece);
    setYear(year_differnece);
  };

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

  // Progress Bar Animations

  useEffect(() => {
    let durationWidth,
      issueWidth,
      capabilitiesWidth,
      descriptionWidth,
      startWidth,
      endWidth;
    if (!watch("duration")) {
      durationWidth = 0;
    } else {
      durationWidth = 0.666666667;
    }

    if (!watch("issue")) {
      issueWidth = 0;
    } else {
      issueWidth = 0.666666667;
    }

    if (!watch("capabilities")) {
      capabilitiesWidth = 0;
    } else {
      capabilitiesWidth = 0.666666667;
    }

    if (!watch("issues_description")) {
      descriptionWidth = 0;
    } else {
      descriptionWidth = 0.666666667;
    }

    if (!start_date) {
      startWidth = 0;
    } else {
      startWidth = 0.666666667;
    }

    if (!end_date) {
      endWidth = 0;
    } else {
      endWidth = 0.666666667;
    }

    const totalWidth =
      parseFloat(previousstepWidth) +
      durationWidth +
      issueWidth +
      capabilitiesWidth +
      descriptionWidth +
      endWidth +
      startWidth +
      0.666666667;
    setWidth(parseFloat(totalWidth).toFixed(1));
  }, [
    watch("duration"),
    watch("issue"),
    watch("capabilities"),
    watch("issues_description"),
    start_date,
    end_date,
  ]);

  // Submit Form Handler

  const formSubmit = async (data) => {
    const custodialDetailsObj = {
      start_date: start_date.toLocaleDateString(),
      end_date: end_date.toLocaleDateString(),
      duration: `${days} Days ${month} Months ${year} years` || "- - -",
      issue: data.issue,
      capabilities: data.capabilities,
      // issues_description: data.issues_description,
    };
    data.issues_description
      ? (custodialDetailsObj.issues_description = data.issues_description)
      : (custodialDetailsObj.issues_description = " ");
    setLoading(true);
    try {
      const res = await axios.post(custodialUpdate, custodialDetailsObj);
      dispatch(custodialInfoUpdate(res.data));
      handleForwardcustodial();
      localStorage.setItem("widthfourth", width);
      dispatch(handleWidth(width));
    } catch (error) {
      createNotification("error", "Error", error?.response?.data?.msg);
    }
    setLoading(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // Progress Bar Style
  const styles = {
    role: {
      backgroundColor: user?.roleId === "mentor" ? "#1790FF" : "#fdd417",
      width: `${width}%`,
      color: user?.roleId === "mentor" ? "#fff" : "#000",
    },
  };

  // Get Next day Date From Selected date
  useEffect(() => {
    var tomorrow = new Date(start_date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMaxDate(tomorrow);
  }, [start_date]);

  // Get Previous day Date From Selected date

  useEffect(() => {
    var yesterDay = new Date(end_date);
    yesterDay.setDate(yesterDay.getDate() - 1);
    setMindate(yesterDay);
  }, [end_date]);

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {data?.signupData?.custodial_details_title
        ? Parser(data?.signupData?.custodial_details_title)
        : ""}

      <p className="p-default text_para_second">
        {data?.signupData?.custodial_details_description
          ? Parser(data?.signupData?.custodial_details_description)
          : ""}
      </p>
      <div className="progress">
        <div
          className="progress-bar-profile"
          role="progressbar"
          aria-label="Example with label"
          style={styles.role}
          aria-valuenow="66.4"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {width}%
        </div>
      </div>
      <div className="block-get-touch step-form mt-4">
        <div className="row g-3">
          <div className="col-lg-4 mb-3">
            <div className="datepicker-wrapper">
              <div className="start_date_prision">
                <DatePicker
                  name="start_date_prision"
                  className="form-control"
                  onChange={onChangeStartDate}
                  // onCalendarClose={calculateTime}
                  value={start_date}
                  maxDate={min_date}
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YY"
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
          <div className="col-lg-4 mb-3">
            <div className="datepicker-wrapper">
              <div className="end_date_prision">
                <DatePicker
                  name="start_date"
                  className="form-control"
                  onChange={onChangeEndDate}
                  value={end_date}
                  onCalendarClose={calculateTime}
                  minDate={max_date}
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YY"
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
          <div className="col-lg-4 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="duration"
              register={register}
              value={
                `${days || "0"} Days ${month || "0"} Months ${
                  year || "0"
                } years` || "- - -"
              }
              placeholder="Prison Time Duration"
              errorMessage={errors?.duration?.message}
              disabled
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-12 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="issue"
              register={register}
              placeholder="Issue Confronting to get the job"
              errorMessage={errors?.issue?.message}
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-12 mb-3">
            <div className="select-form">
              {/* <select
                name=""
                className="form-control"
                id=""
                {...register("capabilities")}
              >
                <option value="" selected hidden>
                  Capabilities that would get you a job
                </option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
                <option value="Option 4">Option 4</option>
              </select> */}
              <TextField
                inputDivStyle={"form-control"}
                type="text"
                name="capabilities"
                register={register}
                placeholder="Capabilities that would get you a job"
                errorMessage={errors?.capabilities?.message}
              />
              {/* {errors?.capabilities?.message && (
                <span className={"error_message"}>
                  {errors?.capabilities?.message}
                </span>
              )} */}
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-12">
            <textarea
              name="issues_description"
              className="form-control"
              placeholder="Detailed explanation regarding the issues"
              rows="3"
              {...register("issues_description")}
            ></textarea>
            {errors.issues_description?.message && (
              <span className={"error_message"}>
                {errors.issues_description?.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="button-group">
        <button
          type="button"
          onClick={handlecustoDialBack}
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

export default CustoDial;

const schema = yup.object({
  // start_date: yup.string(),
  // end_date: yup.string(),
  duration: yup.string(),
  issue: yup.string().required("This fields is Required"),
  capabilities: yup.string().required("This fields is Required"),
  issues_description: yup.string(),
});

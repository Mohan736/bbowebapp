import React, { useEffect, useState } from "react";
import TextField from "../../../components/text-field";
import { handleWidth } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";
import { work_details } from "../../../utils/end-points";
import axios from "axios";
import { createNotification } from "../../../common/create-notifictions";
import Loading from "../../../components/loading";
import Parser from "html-react-parser";

function WorkDetails({ handleForwardworkDetails, handleworkDetailsBack }) {
  // State From Redux
  const data = useSelector((data) => data.data);
  const dispatch = useDispatch();

  // Get Previous Step Width FromLocal Storage
  const previousstepWidth = localStorage.getItem("widthfourth");

  useEffect(() => {
    setWidth(previousstepWidth);
  }, [previousstepWidth]);

  const [loading, setLoading] = useState();
  const [max_date, setMaxDate] = useState();
  const [min_date, setMindate] = useState();
  const [width, setWidth] = useState(previousstepWidth);

  // Form Validations

  const formvalidations = () => {
    const data = [...workdetails];
    for (let index = 0; index < data.length; index++) {
      if (data[index].title === "") {
        data[index].titleCheck = "This Field is Required";
      } else {
        const myObject = workdetails.reduce((a, v) => v, 0);
        delete myObject.titleCheck;
        delete myObject.roleCheck;
        delete myObject.locationCheck;
      }

      if (data[index].role === "") {
        data[index].roleCheck = "This Field is Required";
      } else {
        // data[index].roleCheck = null;
        const myObject = workdetails.reduce((a, v) => (a, v), 0);
        delete myObject.titleCheck;
        delete myObject.roleCheck;
        delete myObject.locationCheck;
      }

      if (data[index].location === "") {
        data[index].locationCheck = "This Field is Required";
      } else {
        // data[index].locationCheck = null;
        const myObject = workdetails.reduce((a, v) => (a, v), 0);
        delete myObject.titleCheck;
        delete myObject.roleCheck;
        delete myObject.locationCheck;
      }
    }
  };

  const [fields, setFields] = useState({
    title: "",
    role: "",
    location: "",
    description: "",
  });

  const [workdetails, setWorkDetails] = useState([
    {
      title: "",
      from_date: "",
      to_date: "",
      role: "",
      location: "",
      description: "",
    },
  ]);

  // On Change For Inputs

  const handleWorkDetails = (e, index) => {
    const { name, value } = e.target;
    const list = [...workdetails];
    list[index][name] = value;
    setWorkDetails(list);

    const totalmonthlyValue = workdetails.reduce((a, v) => (a, v), 0);
    setFields({
      ...fields,
      title: totalmonthlyValue.title,
      description: totalmonthlyValue.description,
      role: totalmonthlyValue.role,
      location: totalmonthlyValue.location,
    });
    formvalidations(!workdetails);
  };

  // On change For Start Date
  const handleDateChange = (e, index) => {
    const list = [...workdetails];
    list[index].from_date = e;
    setWorkDetails(list);
  };

  // On change For End Date

  const handleDateChangeEnd = (e, index) => {
    const list = [...workdetails];
    list[index].to_date = e;
    setWorkDetails(list);
  };

  // Add More Function

  const addMoreHandler = () => {
    setWorkDetails([
      ...workdetails,
      {
        title: "",
        from_date: "",
        to_date: "",
        role: "",
        location: "",
        description: "",
      },
    ]);
  };

  // Delete Function

  const deleteMoreHandler = (index) => {
    const list = [...workdetails];
    list.splice(index, 1);
    setWorkDetails(list);
  };

  // Progress Bar Animations

  useEffect(() => {
    const allFields = workdetails.reduce((a, v) => (a, v), 0);
    let titleWidth,
      roleWidth,
      locationWidth,
      descriptionWidth,
      startWidth,
      endWidth;

    if (!allFields?.title) {
      titleWidth = 0;
    } else {
      titleWidth = 2;
    }
    if (!allFields?.role) {
      roleWidth = 0;
    } else {
      roleWidth = 2;
    }
    if (!allFields?.location) {
      locationWidth = 0;
    } else {
      locationWidth = 2;
    }
    if (!allFields?.description) {
      descriptionWidth = 0;
    } else {
      descriptionWidth = 2;
    }
    if (!allFields?.to_date) {
      startWidth = 0;
    } else {
      startWidth = 2;
    }
    if (!allFields?.from_date) {
      endWidth = 0;
    } else {
      endWidth = 2;
    }

    const totalWidth =
      parseFloat(previousstepWidth) +
      locationWidth +
      titleWidth +
      roleWidth +
      descriptionWidth +
      startWidth +
      endWidth;

    setWidth(parseFloat(totalWidth).toFixed(1));
  }, [workdetails]);

  //Submit Form Handler

  const formSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const totalFields = workdetails.reduce((a, v) => (a, v), 0);
    delete totalFields.titleCheck;
    delete totalFields.roleCheck;
    delete totalFields.locationCheck;

    if (!fields.title || !fields.role || !fields.location) {
      formvalidations(workdetails);
    } else {
      await axios
        .post(work_details, workdetails)
        .then((res) => {
          handleForwardworkDetails();
          localStorage.setItem("widthfivth", width);
          dispatch(handleWidth(width));
        })
        .catch((err) => {
          createNotification("error", "Error", "Fields Can not be empty");
        });
    }
    setLoading(false);
  };

  // Get User From Local Storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Style For Progress Bar

  const styles = {
    role: {
      backgroundColor: user?.roleId === "mentor" ? "#1790FF" : "#fdd417",
      width: `${width}%`,
      color: user?.roleId === "mentor" ? "#fff" : "#000",
    },
  };

  // Get Next day Date From Selected date

  useEffect(() => {
    const totalFields = workdetails.reduce((a, v) => (a, v), 0);
    var tomorrow = new Date(totalFields.from_date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMaxDate(tomorrow);
  }, [workdetails]);

  // Get Previous day Date From Selected date

  useEffect(() => {
    const totalFields = workdetails.reduce((a, v) => (a, v));
    var yesterDay = new Date(totalFields.to_date);
    yesterDay.setDate(yesterDay.getDate() - 1);
    setMindate(yesterDay);
  }, [workdetails]);

  return (
    <form onSubmit={formSubmit}>
      {data?.signupData?.work_details_title
        ? Parser(data?.signupData?.work_details_title)
        : ""}

      <p className="p-default text_para_second">
        {data?.signupData?.work_details_description
          ? Parser(data?.signupData?.work_details_description)
          : ""}
      </p>
      <div className="progress">
        <div
          className="progress-bar-profile"
          role="progressbar"
          aria-label="Example with label"
          style={styles.role}
          aria-valuenow="83.4"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {width}%
        </div>
      </div>
      <div className="block-get-touch step-form mt-4">
        {workdetails.map((item, index) => (
          <div key={index}>
            {workdetails.length > 1 && (
              <button
                onClick={() => {
                  deleteMoreHandler(index);
                }}
                type="button"
                className="add_button text-center w-100 changed"
              >
                <p className="d-flex gap-2 align-items-center mb-0 text-center justify-content-center mt-3 add-more">
                  - Remove
                </p>
              </button>
            )}

            <div className="">
              <div className="row g-3">
                <div className="col-lg-12 mb-3">
                  <TextField
                    inputDivStyle={"form-control"}
                    type="text"
                    name="title"
                    value={item.title}
                    handleChange={(e) => handleWorkDetails(e, index)}
                    placeholder="Company Name"
                    required
                  />
                  <span className="error_message">{item.titleCheck}</span>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-lg-6 mb-3">
                  <div className="datepicker-wrapper">
                    <div className="work_details_start_date">
                      <DatePicker
                        name="from_date"
                        className="form-control"
                        onChange={(e) => handleDateChange(e, index)}
                        value={item.from_date}
                        maxDate={min_date}
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YY"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="datepicker-wrapper">
                    <div className="work_details_end_date">
                      <DatePicker
                        name="to_date"
                        className="form-control"
                        onChange={(e) => handleDateChangeEnd(e, index)}
                        value={item.to_date}
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YY"
                        minDate={max_date}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-lg-12 mb-3">
                  <TextField
                    inputDivStyle={"form-control"}
                    type="text"
                    name="role"
                    value={item.role}
                    handleChange={(e) => handleWorkDetails(e, index)}
                    placeholder="Postion Title (Role)"
                  />
                  <span className="error_message">{item.roleCheck}</span>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-lg-12 mb-3">
                  <TextField
                    inputDivStyle={"form-control"}
                    type="text"
                    name="location"
                    value={item.location}
                    handleChange={(e) => handleWorkDetails(e, index)}
                    placeholder="Location"
                  />
                  <span className="error_message">{item.locationCheck}</span>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-lg-12">
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    rows="3"
                    value={item.description}
                    onChange={(e) => handleWorkDetails(e, index)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="row text-center">
          <div className="col-lg-12">
            <button
              type="button"
              onClick={addMoreHandler}
              className="add_button"
            >
              <p className="d-flex gap-2 align-items-center mb-0 text-center justify-content-center mt-3 add-more">
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6533 7.00781H7.16895V12.4922C7.16895 12.7727 6.9416 13 6.66113 13C6.38067 13 6.15332 12.7727 6.15332 12.4922V7.00781H0.668945C0.38848 7.00781 0.161133 6.78046 0.161133 6.5C0.161133 6.21954 0.38848 5.99219 0.668945 5.99219H6.15332V0.507812C6.15332 0.227347 6.38067 0 6.66113 0C6.9416 0 7.16895 0.227347 7.16895 0.507812V5.99219H12.6533C12.9338 5.99219 13.1611 6.21954 13.1611 6.5C13.1611 6.78046 12.9338 7.00781 12.6533 7.00781Z"
                    fill="#A7A7A7"
                  />
                </svg>
                Add More info
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="button-group">
        <button
          type="button"
          className="prev-slide"
          onClick={handleworkDetailsBack}
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

export default WorkDetails;

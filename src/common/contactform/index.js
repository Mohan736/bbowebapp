import React, { useEffect, useState } from "react";
import Parser from "html-react-parser";
import "./contact.css";
import { contactForm } from "../../redux/actions/actions";
import Loading from "../../components/loading";
import TextField from "../../components/text-field";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getWebSiteContent } from "../../utils/end-points";

function ContactForm(props) {
  const [loading, setLoading] = useState();
  const [contentData, setContentData] = useState();
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState: { isDirty },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    await axios
      .get(getWebSiteContent("HOME"))
      .then((res) => {
        setData(res?.data?.data?.description);
      })
      .catch((err) => {
        return;
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formSubmit = async (data) => {
    try {
      dispatch(contactForm(data, setLoading));
      if (data) {
        reset();
      }
    } catch (error) {}
  };

  return (
    <>
      <section className="section-padding" id={props.id}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 pe-md-4 mb-5 mb-md-0">
              <div
                className="block-get-touch secondary-bg-clr"
                data-aos="fade-up"
              >
                <h2 className="section__heading">Get In Touch</h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="input-group flex-wrap">
                    <input
                      className="form-control"
                      id="name"
                      name="fullName"
                      type="text"
                      placeholder="Person Name *"
                      {...register("fullName")}
                    />
                    {errors?.fullName?.message && (
                      <span className={"error_message"}>
                        {errors?.fullName?.message}
                      </span>
                    )}
                  </div>

                  <div className="input-group">
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email *"
                      {...register("email")}
                    />

                    {errors?.email?.message && (
                      <span className={"error_message"}>
                        {errors?.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="phone"
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone Number *"
                      {...register("phoneNumber")}
                    />
                    {errors?.phoneNumber?.message && (
                      <span className={"error_message"}>
                        {errors?.phoneNumber?.message}
                      </span>
                    )}
                  </div>
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      placeholder="Message(Optional)"
                      {...register("message")}
                    ></textarea>
                    {errors?.message?.message && (
                      <span className={"error_message"}>
                        {errors?.message?.message}
                      </span>
                    )}
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary-fill mt-3 btn-no-animate"
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

            <div className="col-md-6">
              <div className="block-contact-us ps-lg-5" data-aos="fade-up">
                <h2 className="section__heading">
                  {data?.contact_us_title ? Parser(data?.contact_us_title) : ""}
                </h2>
                <p>
                  {data?.contact_us_desc ? Parser(data?.contact_us_desc) : ""}
                </p>

                <ul className="contact-list mt-4 list-unstyled">
                  <li>
                    <a href="mailto:info@bouceback.com">
                      <span>
                        <img src="images/mail-icon.svg" alt="Email" />
                      </span>
                      {data?.contact_us_email
                        ? Parser(data?.contact_us_email)
                        : ""}
                    </a>
                  </li>
                  <li>
                    <a href="tel:+16543647538">
                      <span>
                        <img src="images/phon-icon.svg" alt="Phone Number" />
                      </span>
                      {data?.contact_us_phone
                        ? Parser(data?.contact_us_phone)
                        : ""}
                    </a>
                  </li>
                  <li>
                    <a href="tel:+16453894992">
                      <span>
                        <img src="images/phon-icon.svg" alt="Phone Number" />
                      </span>
                      {data?.contact_us_phone2
                        ? Parser(data?.contact_us_phone2)
                        : ""}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactForm;

const schema = yup.object({
  fullName: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is Required"),
  phoneNumber: yup
    .string()
    .required("Number is Required")
    .min(10, "Please enter a valid mobile Number")
    .max(10, "Please enter a valid mobile Number"),
  message: yup.string(),
});

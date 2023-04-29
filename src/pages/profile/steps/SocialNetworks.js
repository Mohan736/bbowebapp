import React, { useEffect, useState } from "react";
import TextField from "../../../components/text-field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { socialAccount } from "../../../utils/end-points";
import { useNavigate } from "react-router-dom";
import Parser from "html-react-parser";

function SocialNetworks({ handleBackSocial }) {
  // State From Redux
  const data = useSelector((data) => data.data);

  // Get Previous Width From LocalStorage
  const previousstepWidth = localStorage.getItem("widthfivth");

  useEffect(() => {
    setWidth(previousstepWidth);
  }, [previousstepWidth]);

  const [width, setWidth] = useState(previousstepWidth);

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

  const navigate = useNavigate();

  // Progress Bar Animations

  useEffect(() => {
    let fbWidth, youtubeWidth, instaWidth, twitterWidth;
    if (!watch("facebook_profile")) {
      fbWidth = 0;
    } else {
      fbWidth = 1;
    }

    if (!watch("youtube_profile")) {
      youtubeWidth = 0;
    } else {
      youtubeWidth = 1;
    }

    if (!watch("twitter_profile")) {
      twitterWidth = 0;
    } else {
      twitterWidth = 1;
    }

    if (!watch("instagram_profile")) {
      instaWidth = 0;
    } else {
      instaWidth = 1;
    }

    const totalWidth =
      parseFloat(previousstepWidth) +
      fbWidth +
      youtubeWidth +
      instaWidth +
      twitterWidth;

    setWidth(parseFloat(totalWidth).toFixed(1));
  }, [
    watch("youtube_profile"),
    watch("twitter_profile"),
    watch("instagram_profile"),
    watch("facebook_profile"),
  ]);

  // Form Submit

  const formSubmit = async (data) => {
    try {
      await axios
        .post(socialAccount, data)
        .then((res) => {
          navigate("/coming-soon");
          localStorage.removeItem("uploadWidth");
          localStorage.removeItem("widthfourth");
          localStorage.removeItem("widththird");
          localStorage.removeItem("widthfivth");
          localStorage.removeItem("width");
        })
        .catch((err) => {});
    } catch (error) {}
  };

  // Get User From LocalStorage

  const user = JSON.parse(localStorage.getItem("user"));

  // Style For Progress Bar

  const styles = {
    role: {
      backgroundColor: user?.roleId === "mentor" ? "#1790FF" : "#fdd417",
      width: `${width}%`,
      color: user?.roleId === "mentor" ? "#fff" : "#000",
    },
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {data?.signupData?.social_networks_title
        ? Parser(data?.signupData?.social_networks_title)
        : ""}

      <p className="p-default text_para_second">
        {data?.signupData?.socila_network_description
          ? Parser(data?.signupData?.socila_network_description)
          : ""}
      </p>
      <div className="progress">
        <div
          className="progress-bar-profile"
          role="progressbar"
          aria-label="Example with label"
          style={styles.role}
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {width}%
        </div>
      </div>
      <div className="block-get-touch step-form mt-4">
        <div className="row g-3">
          <div className="col-lg-6 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="facebook_profile"
              register={register}
              placeholder="Facebook Profile Link"
              errorMessage={errors?.facebook_profile?.message}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="twitter_profile"
              register={register}
              placeholder="Twitter Profile Link"
              errorMessage={errors?.twitter_profile?.message}
            />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-lg-6 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="instagram_profile"
              register={register}
              placeholder="Instagram Profile Link"
              errorMessage={errors?.instagram_profile?.message}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <TextField
              inputDivStyle={"form-control"}
              type="text"
              name="youtube_profile"
              register={register}
              placeholder="Youtube Profile Link"
              errorMessage={errors?.youtube_profile?.message}
            />
          </div>
        </div>
      </div>
      <div className="button-group">
        <button type="button" className="prev-slide" onClick={handleBackSocial}>
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
          Submit
        </button>
      </div>
    </form>
  );
}

export default SocialNetworks;

const schema = yup.object({
  facebook_profile: yup.string(),

  instagram_profile: yup.string(),

  twitter_profile: yup.string(),

  youtube_profile: yup.string(),
});

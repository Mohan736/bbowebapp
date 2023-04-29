import React, { useCallback, useEffect, useState } from "react";
import getCroppedImg from "../../../components/getCroppedImage";
import Loading from "../../../components/loading";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { upload_image } from "../../../utils/end-points";

function Upload({ stepStep }) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onSubmit",
  //   resolver: yupResolver(schema),
  // });

  const [file, setFile] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileCheck, setFileCheck] = useState(false);
  const [errosMessage, setErrorMessage] = useState("");
  const [croppedArea, setCroppedArea] = useState(null);

  const uploadImageHandler = (e) => {
    setLoading(true);
    setFile(URL.createObjectURL(e.target.files[0]));
    setLoading(false);
    setErrorMessage("");
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  //convert blob to file

  const base64tofile = (x, binaryFile) => {
    var byteSting = atob(x.split(",")[1]);
    var ab = new ArrayBuffer(byteSting.length);
    var ia = new Uint8Array(ab);
    for (let i = 0; i < byteSting.length; i++) {
      ia[i] = byteSting.charCodeAt(i);
    }
    return new File([ab], binaryFile.name, { type: binaryFile.type });
  };

  const showCroppedImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (fileCheck == true) {
      e.preventDefault();
      setLoading(true);
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);
      const ImageName = new Date().getTime();
      const fileNew = new File(
        [croppedImage],
        `${ImageName}/profileImage.jpg`,
        { type: croppedImage.type }
      );
      const formData = new FormData();
      const userId = localStorage.getItem("userId");
      formData.append("images", croppedImage.file);

      formData.append("user_id", userId);

      await axios
        .post(upload_image, formData)
        .then((res) => {
          stepStep();
        })
        .catch((err) => {});
      stepStep();
    } else {
      setErrorMessage("Please select Profile Image");
    }
    setLoading(false);
  };
  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const styles = {
    role: {
      backgroundColor: user?.roleId === "mentor" ? "#1790FF" : "#fdd417",
      width: file ? "16.6%" : "0%",
      color: user?.roleId === "mentor" ? "#fff" : "#000",
    },
  };

  useEffect(() => {
    if (file) {
      setFileCheck(true);
    } else {
      setFileCheck(false);
    }
  }, [file]);

  return (
    <form onSubmit={showCroppedImage}>
      <h3>Add a profile photo</h3>
      <p className="p-default">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text.
      </p>
      <div className="progress">
        <div
          className="progress-bar-profile"
          role="progressbar"
          aria-label="Example with label"
          style={styles.role}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {file ? "16.6%" : "0%"}
        </div>
      </div>

      {!file ? (
        <>
          <label htmlFor="profile-photo" className="profile-photo-trigger">
            <div className="row justify-content-center text-center">
              <div className="col-8">
                <img src="./images/plus-icon.svg" alt="" />
                <p className="small-text text-capitalize mt-3 mb-0">
                  Darg and drop or upload a photo that Best represents your
                  profile
                </p>
              </div>
            </div>
            <input
              type="file"
              name="file"
              accept="image/png, image/gif, image/jpeg"
              className="profile-photo"
              id="profile-photo"
              onChange={uploadImageHandler}
            />
          </label>
        </>
      ) : (
        <>
          {!file ? (
            <label htmlFor="profile-photo" className="profile-photo-trigger">
              <div className="justify-content-center text-center">
                <Loading loaderClass="loading" />
              </div>
            </label>
          ) : (
            <label htmlFor="profile-photo" className="profile-photo-trigger">
              <button
                type="button"
                onClick={() => {
                  setFileCheck(false);
                  setFile();
                }}
                className="del-btn bg-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="#fff"
                    id="outline"
                    d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                  />
                </svg>
              </button>
              <div className="justify-content-center text-center">
                <div className="">
                  <Cropper
                    image={file}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={"round"}
                    cropSize={{ width: 300, height: 300 }}
                    showGrid={false}
                    objectFit="auto-cover"
                    onCropAreaChange={(croppedArea) => {
                      setCroppedArea(croppedArea);
                    }}
                  />
                </div>
              </div>
            </label>
          )}
        </>
      )}

      {/* <button onClick={showCroppedImage}>show result</button>
      {croppedArea && <img src={croppedImage} />} */}
      <div>
        <div className="error_new">
          {errosMessage && (
            <span className={"error_message"}>{errosMessage}</span>
          )}
        </div>

        <button
          type="submit"
          style={{ color: `#fff` }}
          className="upload-btn btn  w-100 next-slide"
        >
          {loading === true ? (
            <Loading loaderClass="loading_button" />
          ) : (
            "Upload Photo"
          )}
        </button>
      </div>
    </form>
  );
}

export default Upload;

import React from "react";
import "./loading.css";

const Loading = ({ loaderClass }) => {
  return (
    <>
      <div className={`${loaderClass}`}></div>
    </>
  );
};
export default Loading;

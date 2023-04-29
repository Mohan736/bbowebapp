import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function CommingSoon() {
  const navigate = useNavigate();
  const handleBack = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <section className="comming_soon_page bg-black">
      <div className="container">
        <div className="banner_text">
          <div>
            <h1>Coming Soon</h1>
            <button onClick={handleBack} className="btn btn-primary-fill mt-4">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommingSoon;

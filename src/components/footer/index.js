import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
function Footer() {
  const IMAGE_URL = process.env.REACT_APP_URL;

  return (
    <footer className="footer bg-black section-padding">
      <div className="container">
        <div className="row gy-3 gy-sm-0 align-items-center justify-content-between">
          <div className="col-md-6 col-sm-4">
            <Link to="/">
              <img
                className="footer-logo"
                src={`${IMAGE_URL}images/logo.svg`}
                alt="Bounce Back"
              />
            </Link>
          </div>
          <div className="col-md-6 col-sm-8 text-end">
            <p className="site-rights mb-0">
              &copy;2022 Bounce back. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("loggedIn");
  useEffect(() => {
    if (user?.roleId === "member") {
      setColor("member");
    } else if (user?.roleId === "mentor") {
      setColor("mentor");
    } else {
      setColor("sponser");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      if (document.querySelector(".header")) {
        var oldScrollY = window.scrollY;
        window.onscroll = function (e) {
          let header = document.querySelector(".header");
          if (oldScrollY < window.scrollY) {
            header.classList.add("headerup");
          } else {
            header.classList.remove("headerup");
          }
          oldScrollY = window.scrollY;
        };
      }
    } else {
      return;
    }
  }, []);

  const handleMenu = () => {
    setShow(!show);
  };

  const REACT_APP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  const URL = process.env.REACT_APP_URL;

  const styles = {
    role: {
      // backgroundColor: color === "member" ? "#fdd417" : "#1790ff",
      width: "40px",
      height: "40px",
      backgroundColor: "rgba(217, 217, 217, 1)",
      borderRadius: "50%",
      border:
        user?.roleId === "member"
          ? "2px solid rgb(253, 212, 23)"
          : "2px solid #1790ff",
      overflow: "hidden",
    },
    roleSponser: {
      width: "40px",
      height: "40px",
      backgroundColor: "rgba(217, 217, 217, 1)",
      borderRadius: "50%",
      border: "2px solid rgba(33 171 133)",
      overflow: "hidden",
    },
  };

  return (
    <>
      {loggedIn ? (
        <header className="nav-header header">
          <div className="navigation container">
            <div className="item-left image-diff">
              <Link
                to="#"
                // onClick={() => {
                //   localStorage.removeItem("loggedIn");
                //   localStorage.removeItem("email");
                //   localStorage.removeItem("token");
                //   localStorage.removeItem("userId");
                //   navigate("/");
                // }}
              >
                <img src={`${URL}./images/bounceback-dark.svg`} alt="" />
              </Link>
            </div>
            <div className="item-right">
              <div className="user-profile">
                {user?.roleId === "sponser" ? (
                  ""
                ) : (
                  <div className="user-image" style={styles.role}>
                    <img
                      src={
                        user?.profile_image
                          ? `${REACT_APP_IMAGE_URL}/${user?.profile_image}`
                          : `${URL}./images/user-default.png`
                      }
                      alt=""
                    />
                  </div>
                )}

                {user?.roleId === "sponser" && (
                  <div className="user-image" style={styles.roleSponser}>
                    <img
                      src={
                        user?.profile_image
                          ? `${REACT_APP_IMAGE_URL}/${user?.profile_image}`
                          : `${URL}./images/user-default.png`
                      }
                      alt=""
                    />
                  </div>
                )}

                <div className="user-details">
                  <p className="name text-dark mb-0">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="email"> {user?.email}</p>
                </div>
                <div className="user-dropdown">
                  <img src="./images/arrow-down.svg" alt="" />
                </div>
                <div className="dropdown-items">
                  <ul>
                    <li className="mb-3">
                      <Link
                        to="#"
                        onClick={() => {
                          localStorage.removeItem("loggedIn");
                          localStorage.removeItem("email");
                          localStorage.removeItem("token");
                          localStorage.removeItem("userId");
                          navigate("/");
                        }}
                      >
                        <span className="nav-icons">
                          <img src={`${URL}./images/bb-icon.svg`} alt="" />
                        </span>
                        <span className="primary-clr text-underline">
                          Back To Website
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          localStorage.removeItem("loggedIn");
                          localStorage.removeItem("email");
                          localStorage.removeItem("token");
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          localStorage.removeItem("role");
                          navigate("/login");
                        }}
                      >
                        <span className="nav-icons">
                          <img src={`${URL}./images/logout-icon.svg`} alt="" />
                        </span>
                        <span className="primary-clr text-underline">
                          Log Out
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="header">
          <div className="container">
            <nav className="navbar navbar-expand-lg bg-black">
              <Link
                to="/"
                onClick={() => {
                  window.onload();
                }}
                className="navbar-brand mx-0 mob-show"
              >
                <img
                  src={`${URL}images/logo-bounceback.svg`}
                  alt="Bounce Back"
                />
              </Link>
              <button
                className={
                  show === true
                    ? "navbar-toggler p-0 toggle-menu"
                    : "navbar-toggler p-0 collapsed"
                }
                type="button"
                onClick={handleMenu}
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between desktop-menu"
                id="navbarNav"
              >
                <ul className="navbar-nav nav-left">
                  <li className="nav-item active">
                    <Link
                      className="nav-link active text-white"
                      to="/who-we-are"
                      reloadDocument
                    >
                      Who We Are
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/why-bbo" reloadDocument>
                      Why BBO
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link reloadDocument className="nav-link" to="/what-we-do">
                      What We Do
                    </Link>
                  </li>
                </ul>
                <div className="logo-middle">
                  <Link
                    to="/"
                    onClick={() => {
                      window.onload();
                    }}
                    className="navbar-brand mx-0"
                  >
                    <img
                      src={`${URL}images/logo-bounceback.svg`}
                      alt="Bounce Back"
                    />
                  </Link>
                </div>

                <ul className="navbar-nav align-items-center nav-right justify-content-end">
                  <li className="nav-item me-2">
                    <Link reloadDocument to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/join"
                      reloadDocument
                      className="nav-link btn btn-secondary btn-no-animate"
                    >
                      Join Our Community
                    </Link>
                  </li>
                </ul>
              </div>

              <div
                className={
                  show === true
                    ? "collapse navbar-collapse justify-content-between mobile-menu collapse show"
                    : "collapse navbar-collapse justify-content-between mobile-menu collapse"
                }
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link reloadDocument to="/who-we-are" className="nav-link">
                      Who We Are
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link reloadDocument to="/why-bbo" className="nav-link">
                      Why BBO
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link reloadDocument to="/what-we-do" className="nav-link">
                      What We Do
                    </Link>
                  </li>
                  <li className="nav-item me-2">
                    <Link reloadDocument to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      reloadDocument
                      to="/join"
                      className="nav-link btn btn-secondary btn-no-animate"
                    >
                      Join Our Community
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;

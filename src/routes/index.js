import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";
import ForgetPassword from "../pages/auth/forget-password";
import Login from "../pages/auth/login";
import Newpassword from "../pages/auth/new-password";
import SignUp from "../pages/auth/register";
import Verified from "../pages/auth/register/steps/verified";
import CommingSoon from "../pages/commingsoon";
import HomePage from "../pages/Home";
import Profile from "../pages/profile";
import WhatWeDo from "../pages/what-we-do";
import WhoweAre from "../pages/who-we-are";
import Whybbo from "../pages/why-Bbo";

const Routes = () => {
  const loggedIn = localStorage.getItem("loggedIn");

  return (
    <>
      {loggedIn ? (
        <Switch>
          <Route path="/" element={<CommingSoon />} />
          <Route path="/coming-soon" element={<CommingSoon />} />
          <Route path="/steps-profile" element={<Profile />} />
          <Route
            path="/verfied/user/verifyEmail/:token"
            element={<Verified />}
          />
          <Route path="/user/set-password/:token" element={<Newpassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" element={<Login />} />
          <Route path="/coming-soon" element={<CommingSoon />} />
          <Route
            path="/verfied/user/verifyEmail/:token"
            element={<Verified />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/user/set-password/:token" element={<Newpassword />} />

          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/who-we-are" element={<WhoweAre />} />
          <Route path="/why-bbo" element={<Whybbo />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      )}
    </>
  );
};

export default Routes;

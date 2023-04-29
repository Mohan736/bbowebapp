import {
  LOGIN,
  SIGNUP,
  UPDATECUSTODIALINFO,
  UPDATEDUCATIONALINFO,
  UPDATEPERSONALINFO,
  EMAIL_VERFIED,
  FORGET_PASSWORD,
  CONTACT_FORM,
  WIDTH,
  SIGNUP_DATA,
} from "../constants/constants";
import {
  custodialUpdate,
  educationalinfoUpdate,
  login,
  personalinfoUpdate,
  email_Verfied,
  forget_Password,
  contact_Form,
  signup,
  getWebSiteContent,
} from "../../utils/end-points";
import axios from "../../utils/axios";
import { createNotification } from "../../common/create-notifictions";

export const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP, payload: data });
  } catch (err) {
    createNotification("error", "Error", err?.response?.data?.msg);
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN, payload: data });
  } catch (err) {
    createNotification("error", "Error", err?.response?.data?.msg);
  }
};

export const emailVerfied =
  (token, setLoading, navigate) => async (dispatch) => {
    setLoading && setLoading(true);
    try {
      const response = await axios.get(email_Verfied(token));
      dispatch({ type: EMAIL_VERFIED, payload: response.data });
      navigate("/login");
    } catch (err) {}
    setLoading && setLoading(false);
  };

export const forgetPassword =
  (email, setLoading, setOpen) => async (dispatch) => {
    setLoading && setLoading(true);
    try {
      const response = await axios.post(forget_Password, {
        email: email,
      });
      setOpen(true);
      dispatch({ type: FORGET_PASSWORD, payload: response.data });
    } catch (err) {
      createNotification("error", "Error", err?.response?.data?.msg);
    }
    setLoading && setLoading(false);
  };

export const personalInfoUpdate =
  (data, setLoading, handleForward) => async (dispatch) => {
    setLoading && setLoading(true);
    try {
      const res = await axios.post(personalinfoUpdate, data);
      dispatch({ type: UPDATEPERSONALINFO, payload: res.data });
      handleForward();
    } catch (err) {}
    setLoading && setLoading(false);
  };

export const educationalInfoUpdate = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATEDUCATIONALINFO, payload: data });
  } catch (err) {
    createNotification("error", "Error", err?.response?.data?.msg);
  }
};

export const custodialInfoUpdate = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATECUSTODIALINFO, payload: data });
  } catch (err) {
    createNotification("error", "Error", err?.response?.data?.msg);
  }
};

export const workdetails = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATECUSTODIALINFO, payload: data });
  } catch (err) {
    createNotification("error", "Error", err?.response?.data?.msg);
  }
};

export const contactForm = (data, setLoading) => async (dispatch) => {
  setLoading && setLoading(true);
  try {
    const res = await axios.post(contact_Form, data);
    dispatch({ type: CONTACT_FORM, payload: res.data });
    createNotification("success", "Success", res?.res?.data?.msg);
  } catch (err) {
    createNotification("error", "Error", err?.response?.data?.msg);
  }
  setLoading && setLoading(false);
};

export const handleWidth = (data) => async (dispatch) => {
  try {
    dispatch({ type: WIDTH, payload: data });
  } catch (err) {}
};

export const getSignUpPageContent = (page) => async (dispatch) => {
  try {
    const res = await axios.get(getWebSiteContent(page));
    dispatch({ type: SIGNUP_DATA, payload: res.data.data.description });
  } catch (err) {}
};

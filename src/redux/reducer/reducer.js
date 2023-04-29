import {
  EMAIL_VERFIED,
  LOGIN,
  SIGNUP,
  SIGNUP_DATA,
  UPDATECUSTODIALINFO,
  UPDATEDUCATIONALINFO,
  UPDATEPERSONALINFO,
  WIDTH,
} from "../constants/constants";

const initialState = {
  token: {},
  signup: {},
  userData: {},
  user: JSON.parse(localStorage.getItem("user")),
  verfied: "",
  personalInfo: {},
  educationalInfo: {},
  custodialInfo: {},
  width: {},
  signupData: {},
};

const mainreducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP:
      return {
        ...state,
        signup: { ...payload },
      };
    case LOGIN:
      return {
        ...state,
        userData: { ...payload },
      };
    case UPDATEPERSONALINFO:
      return {
        ...state,
        personalInfo: { ...payload },
      };
    case UPDATEDUCATIONALINFO:
      return {
        ...state,
        educationalInfo: { ...payload },
      };
    case UPDATECUSTODIALINFO:
      return {
        ...state,
        custodialInfo: { ...payload },
      };
    case EMAIL_VERFIED:
      return {
        ...state,
        verfied: true,
      };
    case WIDTH:
      return {
        ...state,
        width: { res: payload },
      };
    case SIGNUP_DATA:
      return {
        ...state,
        signupData: { ...payload },
      };
    default:
      return {
        ...state,
      };
  }
};

export default mainreducer;

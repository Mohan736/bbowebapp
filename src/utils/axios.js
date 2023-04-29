import axios from "axios";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;
  return config;
});

axios.interceptors.response.use(
  (successRes) => {
    return successRes;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;

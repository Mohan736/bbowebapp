import axios from "axios";
// import constants from 'common/utils/constants';
import { BASEURL } from "../config/endpoints/api";
import { getToken } from "../Auth";
const axiosClient = axios.create();
axiosClient.defaults.baseURL = BASEURL;

// axiosClient.defaults.headers = constants.headers;
axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
// axios.defaults.headers.common['Authorization'] = "6531|qoobrUOvQR6pgPB2hRnC2UPgbgx9iBAmnG18Zg9i";
// axiosClient.interceptors.request.use((config) => {
//     const token = getToken();
//       if (token) {
//           config.headers = { Authorization: `Bearer ${token}` };
//       } else {
//           config.headers = { Authorization: null }
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;
axiosClient.defaults.timeout = 5000;

export function getRequest(URL, payload = null, headers = {}) {
  return axiosClient.get(`${URL}`).then((response) => response);
  // return apiRequest(URL, payload, "get", headers);
}

export function getCustomRequest(URL) {
  return axiosClient.get(`${URL}`).then((response) => response);
}

export function posttRequest(URL, payload) {
  return axiosClient.post(`${URL}`, payload).then((response) => response);
}

export function postRequest(URL, payload, headers = {}) {
  // return axiosClient.post(`${URL}`, payload).then(response => response);
  return apiRequest(URL, payload, "post", headers);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`${URL}`).then((response) => response);
}

export function getAllRequest(URLS) {
  const cancelToken = axios.CancelToken.source();
  const requestsURLs = URLS.map((_url) =>
    axios.get(_url, { cancelToken: cancelToken.token })
  );

  return axios
    .all(requestsURLs)
    .then(
      (responses) => responses
     
    )
    .catch((err) => {
      if (axios.isCancel(err)) {
      }
      
    });

 
}

export async function apiRequest(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {}
) {
  return new Promise(async (resolve, reject) => {
    if (data instanceof FormData) {
      headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      };
    } else {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    axios[method](endPoint, data, { headers })
      .then((result) => {
        const { data } = result;
        if (data.status === false) {
          return reject(data);
        }
        return resolve(data);
      })
      .catch((error) => {
      
        if (error && error.response && error.response.status === 401) {
          return reject(error.response.data);
        }
        if (error && error.response && error.response.status === 400) {
          return reject(error.response.data || error.response.message);
        }
        if (error && error.response && error.response.status === 403) {
          // actions.logout();
          return reject(error.response.data);
        }
        if (
          error &&
          error.response &&
          error.response.data &&
          !!error.response.data.msg
        ) {
          return reject(error.response.data);
        } else {
          return reject({ message: "unknown error.", msg: "unknown error." });
        }
        return reject(error);
      });
  });
}

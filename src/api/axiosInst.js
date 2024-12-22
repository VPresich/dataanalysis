import axios from "axios";

export const BaseURL = "http://localhost:8080/api/";
// export const BaseURL = "https://teachers-rest-api.onrender.com/api/";
export const axiosInst = axios.create({
  baseURL: BaseURL,
});

export const setAuthHeader = (token) => {
  axiosInst.defaults.headers.common.Authorization = `Bearer ${token}`;
  axiosInst.defaults.headers.common["X-App-Name"] = "dataanalysis";
};

export const clearAuthHeader = () => {
  axiosInst.defaults.headers.common.Authorization = "";
  axiosInst.defaults.headers.common["X-App-Name"] = "";
};

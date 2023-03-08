import axios from "axios";
let user;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5555",
});

user = JSON.parse(localStorage.getItem("userData"));

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  async (err) => {
    return Promise.reject(err);
  }
);

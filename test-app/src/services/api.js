import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5555/user",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY3NzA1NzEzNSwiZXhwIjoxNjc5NjQ5MTM1fQ.qybbizvx6iwvW7wD8bWFl8cFeIxW6XJwYdvPWIYAqZE";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  async (err) => {
    return Promise.reject(err);
  }
);

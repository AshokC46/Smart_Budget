import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-budget-api.onrender.com",
});

export default axiosInstance;

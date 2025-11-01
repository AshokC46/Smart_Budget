import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5000"  
    : "https://smart-budget-api.onrender.com", 
});

export default axiosInstance;

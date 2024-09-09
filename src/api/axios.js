import axios from "axios";

let BASE_URL = "https://expensemanagerserver.onrender.com";
// BASE_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:5173",
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "http://localhost:5173",
  // },
  withCredentials: true,
});

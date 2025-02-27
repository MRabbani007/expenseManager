import { BASE_URL } from "@/lib/url";
import axios from "axios";

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

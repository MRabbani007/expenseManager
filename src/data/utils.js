export const ACTIONS = {
  ADD_TRANSACTION: "ADD_TRANSACTION",
  REMOVE_TRANSACTION: "REMOVE_TRANSACTION",
  EDIT_TRANSACTION: "EDIT_TRANSACTION",
  GET_TRANSACTION: "GET_TRANSACTION",
  USER_SIGNIN: "USER_SIGNIN",
  USER_SIGNUP: "USER_SIGNUP",
};

export const SERVER = {
  GET_TRANSACTION: "/transaction/get",
  ADD_TRANSACTION: "/transaction/get",
  EDIT_TRANSACTION: "/transaction/get",
  REMOVE_TRANSACTION: "/transaction/get",
  USER_SIGNIN: "/user/signin",
  USER_SIGNUP: "/user/signup",
};

export const SERVER_URL = "http://localhost:3000";

export const LOCAL_USER = "expenseManagerUser";

export const parseDate = (date) => {
  return date.substr(0, 10);
};

export const getDate = (offset = 0) => {
  const today = new Date(new Date().getTime() + offset * 24 * 60 * 60 * 1000);
  // Format <"YYYY-MM-DD"> for mongoDb
  const result =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    today.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  return result;
};

export const genDate = (offset = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    day: weekdayShort[date.getDay()],
    date: date.getDate(),
    month: monthShort[date.getMonth()],
  };
};

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const saveLocal = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
  return true;
};

export const loadLocal = (name) => {
  let data = localStorage.getItem(name);
  if (!!data) {
    return JSON.parse(data);
  } else return null;
};

export const removeLocal = (name) => {
  localStorage.removeItem(name);
  return true;
};

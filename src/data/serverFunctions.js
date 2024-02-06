import axios from "axios";
import { ACTIONS, SERVER, SERVER_URL } from "./utils";

export const fetchTransaction = async (action) => {
  try {
    let URL = SERVER_URL;
    let DATA = { action: action };
    switch (action.type) {
      case ACTIONS.GET_TRANSACTION: {
        URL += SERVER.GET_TRANSACTION;
        break;
      }
      case ACTIONS.ADD_TRANSACTION: {
        URL += SERVER.ADD_TRANSACTION;
        break;
      }
      case ACTIONS.REMOVE_TRANSACTION: {
        URL += SERVER.REMOVE_TRANSACTION;
        break;
      }
      case ACTIONS.EDIT_TRANSACTION: {
        URL += SERVER.EDIT_TRANSACTION;
        break;
      }
      default: {
      }
    }
    axios.defaults.timeout = 5000;
    let response = await axios({
      method: "post",
      url: URL,
      data: DATA,
    }).catch((error) => {
      console.log("Error: fetch server");
    });
    return response.data;
  } catch (error) {
    return null; //"Error: Fetch Server"
  }
};

export const fetchUser = async (action) => {
  try {
    let URL = SERVER_URL;
    let DATA = "";
    switch (action.type) {
      case ACTIONS.USER_SIGNIN: {
        URL += SERVER.USER_SIGNIN;
        DATA = {
          username: action.payload.username,
          password: action.payload.password,
        };
        break;
      }
      case ACTIONS.USER_SIGNUP: {
        URL += SERVER.USER_SIGNUP;
        DATA = {
          username: action.payload.username,
          password: action.payload.password,
        };
        break;
      }
      default: {
      }
    }
    axios.defaults.timeout = 5000;
    let response = await axios({ method: "post", url: URL, data: DATA });
    return response.data;
  } catch (error) {
    return "Error: Signin"; //null;
  }
};

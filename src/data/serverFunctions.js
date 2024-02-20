import axios from "../api/axios";
import { ACTIONS, SERVER } from "./utils";

export const fetchTransaction = async (action) => {
  try {
    let URL = "";
    let DATA = { action: action };
    switch (action.type) {
      case ACTIONS.GET_TRANSACTION: {
        URL = SERVER.GET_TRANSACTION;
        break;
      }
      case ACTIONS.ADD_TRANSACTION: {
        URL = SERVER.ADD_TRANSACTION;
        break;
      }
      case ACTIONS.REMOVE_TRANSACTION: {
        URL = SERVER.REMOVE_TRANSACTION;
        break;
      }
      case ACTIONS.EDIT_TRANSACTION: {
        URL = SERVER.EDIT_TRANSACTION;
        break;
      }
      default: {
      }
    }
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
    let URL = "";
    let DATA = "";
    let METHOD = "post";
    console.log(action);
    switch (action.type) {
      case ACTIONS.USER_SIGNIN: {
        URL = SERVER.USER_SIGNIN;
        DATA = {
          username: action.payload.username,
          password: action.payload.password,
        };
        METHOD = "post";
        break;
      }
      case ACTIONS.USER_SIGNUP: {
        URL = SERVER.USER_SIGNUP;
        DATA = {
          username: action.payload.username,
          password: action.payload.password,
        };
        METHOD = "post";
        break;
      }
      default: {
      }
    }
    axios.defaults.timeout = 5000;
    let response = await axios({ method: METHOD, url: URL, data: DATA });
    console.log(response.data);
    return response.data;

    // await axios.post(
    //   REGISTER_URL,
    //   JSON.stringify({ user, pwd }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   }
    // );

    // const response = await axios.post(
    //   LOGIN_URL,
    //   JSON.stringify({ user, pwd }),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   }
    // );
  } catch (error) {
    console.log(error);
    return "Error: Server Error"; //null;
  }
};

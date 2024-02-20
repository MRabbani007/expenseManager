import React, { createContext, useEffect, useState } from "react";
import {
  ACTIONS,
  LOCAL_USER,
  SERVER,
  loadLocal,
  saveLocal,
} from "../data/utils";
import { themes } from "../data/themes";
import { default_list } from "../data/templates";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

// Initial state
const initialState = {
  userName: "",
  name: "",
  email: "",
  theme: themes.red,
  currency: "",
  descriptions: default_list,
};

// Create context
export const UserContext = createContext(initialState);

// Provider component
export const UserProvider = ({ children }) => {
  // Store userName
  const [user, setUser] = useState(initialState);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleEditName = async (name) => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_NAME,
          payload: { username: auth?.user, name },
        },
      });
      if (response.data.status === "success") {
        setUser((prev) => {
          return { ...prev, name };
        });
      }
    } catch (error) {}
  };

  const handleEditEmail = async (email) => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_EMAIL,
          payload: { username: auth?.user, email },
        },
      });
      if (response.data.status === "success") {
        setUser((prev) => {
          return { ...prev, email };
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosPrivate.post(SERVER.GET_USER_SETTINGS, {
        username: auth?.user,
        roles: auth?.roles,
      });
      const data = response?.data;
      setUser((prev) => {
        let descriptions = default_list;
        let theme = themes.red;
        let currency = "tenge";
        let name = "user";
        let email = "";
        if (response?.data?.descriptions?.length !== 0) {
          descriptions = data.descriptions;
        } else {
          handleAddDescription(default_list);
        }
        if (response?.data?.theme !== "") {
          theme = parseTheme(data.theme);
        } else {
          handleTheme(themes.red);
        }
        if (response?.data?.currency !== "") {
          currency = data.currency;
        }
        if (response?.data?.name !== "") {
          name = data.name;
        }
        if (response?.data?.email !== "") {
          email = data.email;
        }
        return { ...prev, descriptions, theme, currency, name, email };
      });
    };
    if (auth?.user && auth?.roles) {
      fetchUser();
    }
  }, [auth?.user]);

  const parseTheme = (value) => {
    let temp = {};
    switch (value) {
      case "red": {
        temp = themes.red;
        break;
      }
      case "blue": {
        temp = themes.blue;
        break;
      }
      case "black": {
        temp = themes.black;
        break;
      }
      default: {
        temp = themes.red;
      }
    }
    return temp;
  };

  const handleTheme = async (theme) => {
    try {
      setUser((prev) => {
        return { ...prev, theme: parseTheme(theme) };
      });
      let prevTheme = user.theme;
      let response = await axiosPrivate.put(SERVER.USER_EDIT_SETTINGS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_EDIT_THEME,
          payload: { username: auth?.user, theme },
        },
      });
      if (response.data.status !== "success") {
        setUser((prev) => {
          return { ...prev, theme: prevTheme };
        });
      }
    } catch (error) {}
  };

  const handleSignIn = (userName) => {
    setUser((current) => {
      return { ...current, userName: userName };
    });
    saveLocal(LOCAL_USER, { ...user, userName: userName });
    // TODO: fetch user data from server
  };

  const handleSignOut = () => {
    // TODO: handle server signout
    localStorage.removeItem(LOCAL_USER);
    setUser({});
  };

  const handleAddDescription = async (description) => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_DESCRIPTIONS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_DESC_ADD,
          payload: {
            username: auth?.user,
            description,
          },
        },
      });
      setUser((prev) => {
        let temp = prev.descriptions.filter(
          (desc) => desc.name !== description.name
        );
        temp.push(description);
        return { ...prev, descriptions: temp };
      });
      if (response.data.status !== "success") {
      }
    } catch (error) {}
  };

  const handleRemoveDescription = async (description) => {
    try {
      let response = await axiosPrivate.put(SERVER.USER_DESCRIPTIONS, {
        roles: auth?.roles,
        action: {
          type: ACTIONS.USER_DESC_REMOVE,
          payload: { username: auth?.user, description },
        },
      });
      setUser((prev) => {
        let temp = prev.descriptions.filter(
          (desc) => desc.name !== description.name
        );
        return { ...prev, descriptions: temp };
      });
      if (response.data.status !== "success") {
      }
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        userName: user.userName,
        name: user?.name || "",
        email: user?.email || "",
        theme: user?.theme || themes.red,
        userSelectedDescriptions: user?.descriptions || [],
        handleSignIn,
        handleSignOut,
        handleTheme,
        handleEditName,
        handleEditEmail,
        handleAddDescription,
        handleRemoveDescription,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

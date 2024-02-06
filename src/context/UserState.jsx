import React, { createContext, useEffect, useState } from "react";
import { LOCAL_USER, loadLocal, saveLocal } from "../data/utils";
import { themes } from "../data/themes";

// Initial state
const initialState = {
  userName: "",
  name: "",
  email: "",
  theme: themes.red,
  currency: "",
};

// Create context
export const UserContext = createContext(initialState);

// Provider component
export const UserProvider = ({ children }) => {
  // Store userName
  const [user, setUser] = useState(initialState);

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

  const handleTheme = (value) => {
    switch (value) {
      case "red": {
        setSelectedTheme(themes.red);
        break;
      }
      case "blue": {
        setSelectedTheme(themes.blue);
        break;
      }
      case "black": {
        setSelectedTheme(themes.black);
        break;
      }
    }
    saveLocal("theme", value);
  };

  useEffect(() => {
    let data = loadLocal(LOCAL_USER);
    if (!!data) {
      setUser(data);
    }
  }, []);
  console.log(user);
  return (
    <UserContext.Provider
      value={{
        userName: user.userName,
        theme: user.theme,
        handleSignIn,
        handleSignOut,
        handleTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

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
  const [userSelectedDescriptions, setUserSelectedDescriptions] = useState(
    () => {
      return loadLocal("descriptions");
    }
  );

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
    setUser((current) => {
      let temp = current.theme;
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
        }
      }
      return { ...current, theme: temp };
    });

    saveLocal("theme", value);
  };

  const handleAddDescription = (description) => {
    setUserSelectedDescriptions((current) => {
      let newList = current.filter((item) => item.name !== description.name);
      return [...newList, description];
    });
  };

  const handleRemoveDescription = (description) => {
    setUserSelectedDescriptions((current) => {
      let descriptionIndex = current.indexOf(
        (item) => item.name === description.name
      );
      if (descriptionIndex >= 0) {
        current.slice(descriptionIndex, 1);
      }
      return [...current];
    });
  };

  useEffect(() => {
    let data = loadLocal(LOCAL_USER);
    if (!!data) {
      setUser(data);
    }
    setUserSelectedDescriptions(() => {
      let desc = loadLocal("descriptions");
      return desc;
    });
  }, []);

  useEffect(() => {
    saveLocal("descriptions", userSelectedDescriptions);
  }, [userSelectedDescriptions]);

  return (
    <UserContext.Provider
      value={{
        userName: user.userName,
        theme: user.theme,
        userSelectedDescriptions,
        handleSignIn,
        handleSignOut,
        handleTheme,
        handleAddDescription,
        handleRemoveDescription,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import React from "react";
import { GlobalProvider } from "../context/GlobalState";
import Navbar from "../components/Navbar";

const SettingsPage = () => {
  return (
    <GlobalProvider>
      <Navbar />
      <div className="pt-[60px] px-2">Settings</div>
    </GlobalProvider>
  );
};

export default SettingsPage;

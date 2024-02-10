import React, { useContext, useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import CardThemes from "./CardThemes";
import { UserContext } from "../context/UserState";

const Navbar = () => {
  const { userName, theme } = useContext(UserContext);
  return (
    <div
      className="navbar px-5 duration-500 z-50"
      style={{
        backgroundColor: theme.navbar_bg,
        color: theme.navbar_text,
      }}
    >
      <span>
        <Link to="/">
          <IoHomeOutline className="icon mr-3" />
        </Link>
        <Link to="/transactions">
          <TbReportAnalytics className="icon" />
        </Link>
        <Link to="/addItems">
          <IoAddCircleOutline className="icon mx-3" />
        </Link>
        <Link to="/settings">
          <IoSettingsOutline className="icon" />
        </Link>
      </span>
      <span>
        {/* <MdOutlineDarkMode className="icon mx-3" /> */}
        <CardThemes />
        {userName === "" ? (
          <Link to="/signin">
            <FiUser className="icon" />
          </Link>
        ) : (
          <Link to="/signin">
            {userName === "" ? "" : userName}
            <FiUser className="icon" />
          </Link>
        )}
      </span>
    </div>
  );
};

export default Navbar;

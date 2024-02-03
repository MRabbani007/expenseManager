import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Navbar = () => {
  const { userName } = useContext(GlobalContext);
  return (
    <div className="fixed flex items-center justify-between top-0 h-[50px] w-full bg-red-500 text-white px-5">
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
        <MdOutlineDarkMode className="icon mx-3" />
        {userName === "" ? (
          <Link to="/signin">
            {"Hello " + userName + ","}
            <FiUser className="icon" />
          </Link>
        ) : (
          <Link to="/signin">
            <FiUser className="icon" />
          </Link>
        )}
      </span>
    </div>
  );
};

export default Navbar;

import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { FaBars } from "react-icons/fa6";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoMenu,
  IoSettingsOutline,
} from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { GrTask } from "react-icons/gr";
import { GrDocumentNotes } from "react-icons/gr";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { UserContext } from "../../context/UserState";

const BottomMenu = () => {
  const {} = useContext(GlobalContext);
  const { theme } = useContext(UserContext);

  return (
    <div
      className="sm:hidden bottom-menu"
      style={{
        backgroundColor: theme.navbar_bg,
        color: theme.navbar_text,
      }}
    >
      <Link to="/">
        <IoHomeOutline className="icon mr-3" />
      </Link>
      <Link to="/transactions">
        <TbReportAnalytics className="icon" />
      </Link>
      <Link to="/addItems">
        <IoAddCircleOutline className="icon mx-3" />
      </Link>
      <Link to="/admin">
        <RiAdminLine className="icon " />
      </Link>
    </div>
  );
};

export default BottomMenu;

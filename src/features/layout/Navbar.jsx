import { useContext } from "react";
import { Link } from "react-router-dom";
// Imported Context
import { UserContext } from "../../context/UserState";
// Imported Components
import CardThemes from "../../components/CardThemes";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  const { theme } = useContext(UserContext);

  return (
    <div
      className="navbar px-5 duration-500 z-50"
      style={{
        backgroundColor: theme.navbar_bg,
        color: theme.navbar_text,
      }}
    >
      {/* Left Block */}
      <span>
        {/* Large Screen */}
        <span className="hidden sm:inline-block">
          <Link to="/">
            <IoHomeOutline className="icon " />
          </Link>
          <Link to="/transactions">
            <TbReportAnalytics className="icon mx-3" />
          </Link>
          <Link to="/addItems">
            <IoAddCircleOutline className="icon" />
          </Link>
          <Link to="/admin">
            <RiAdminLine className="icon mx-3" />
          </Link>
        </span>
        {/* Small Screen */}
        <span className="sm:hidden inline-block">
          <Link to="/login">
            <FiUser className="icon mr-3" />
            {auth?.user === "" ? "" : auth?.user}
          </Link>
        </span>
      </span>
      {/* Right Block */}
      <span>
        <Link to="/login" className="hidden sm:inline">
          {auth?.user === "" ? "" : auth?.user}
          <FiUser className="icon mr-3" />
        </Link>
        <CardThemes />
        <Link to="/settings">
          <IoSettingsOutline className="icon ml-3" />
        </Link>
      </span>
    </div>
  );
};

export default Navbar;

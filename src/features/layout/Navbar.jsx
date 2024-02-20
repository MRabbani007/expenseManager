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
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import { themes } from "../../data/themes";

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
        <Link to="/admin">
          <RiAdminLine className="icon mx-3" />
        </Link>
      </span>
      <span>
        {/* <MdOutlineDarkMode className="icon mx-3" /> */}
        <CardThemes />
        {auth?.user === "" ? (
          <Link to="/login">
            <FiUser className="icon" />
          </Link>
        ) : (
          <Link to="/login">
            {auth?.user === "" ? "" : auth?.user}
            <FiUser className="icon" />
          </Link>
        )}
      </span>
    </div>
  );
};

export default Navbar;

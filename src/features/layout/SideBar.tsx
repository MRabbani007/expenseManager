import { useAppSelector } from "@/app/hooks";
import {
  CalendarDays,
  CircleEqual,
  ClipboardMinus,
  ClipboardPlus,
  CreditCard,
  LayoutDashboard,
  LucideUser2,
  Plus,
  Settings,
  SquareStack,
  UserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import { useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";

const SIDEBAR = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard size={30} />,
  },
  {
    label: "Reports",
    url: "/transactions",
    icon: <ClipboardMinus size={30} />,
  },
  { label: "Add", url: "/addItems", icon: <Plus size={30} /> },
  {
    label: "Calendar",
    url: "/calendar",
    icon: <CalendarDays size={30} />,
  },
  { label: "Cards", url: "/cards", icon: <CreditCard size={30} /> },
];

const SIDEBAR_ADMIN = [
  // { label: "Dashboard", url: "/admin", icon: <LayoutDashboard size={30} /> },
  {
    label: "Categories",
    url: "/admin/categories",
    icon: <SquareStack size={30} />,
  },
  {
    label: "Descriptions",
    url: "/admin/descriptions",
    icon: <CircleEqual size={30} />,
  },
  { label: "Users", url: "/admin/users", icon: <UserRound size={30} /> },
];

const SIDEBAR_USER = [
  {
    label: "Profile",
    url: "/profile",
    icon: <LucideUser2 size={30} />,
  },
  {
    label: "Settings",
    url: "/settings",
    icon: <Settings size={30} />,
  },
];

export default function SideBar() {
  const location = useLocation();
  const [expand, setExpand] = useState(false);

  const auth = useAppSelector(selectAuth);

  const isActive = (page: string) =>
    page === "/" || page === "/admin"
      ? location.pathname === page
      : location.pathname.includes(page);

  const isUser = auth?.roles ? auth?.roles.includes(2001) : false;
  const isAdmin = auth?.roles ? auth?.roles.includes(5150) : false;
  // const onAdminPage = location.pathname.includes("admin");

  if (isUser)
    return (
      <div className="hidden sticky top-[0.5rem] md:flex flex-col py-2 px-2 bg-stone-200 rounded-2xl m-2 h-[calc(100vh-1rem)]">
        {(isAdmin ? SIDEBAR.concat(SIDEBAR_ADMIN, SIDEBAR_USER) : SIDEBAR).map(
          (item, idx) => (
            <Link
              to={item?.url}
              key={idx}
              className={
                (isActive(item.url) ? "bg-white" : "") +
                (item.label === "Profile" || item.label === "Categories"
                  ? " mt-auto "
                  : "") +
                " flex items-center gap-2 py-2 px-2 duration-200 rounded-2xl"
              }
            >
              {item?.icon}
              {expand ? (
                <span className="text-sm font-semibold text-stone-800 font-mono">
                  {item.label}
                </span>
              ) : null}
            </Link>
          )
        )}
      </div>
    );
  else return null;
}

import { useAppSelector } from "@/app/hooks";
import {
  CalendarDays,
  CircleEqual,
  CreditCard,
  LayoutDashboard,
  LucideUser2,
  Plus,
  ScrollText,
  Settings,
  SquareStack,
  UserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import { useState } from "react";

const SIDEBAR = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard size={25} />,
  },
  {
    label: "Reports",
    url: "/transactions",
    icon: <ScrollText size={25} />,
  },
  { label: "Add", url: "/addItems", icon: <Plus size={25} /> },
  {
    label: "Calendar",
    url: "/calendar",
    icon: <CalendarDays size={25} />,
  },
  { label: "Cards", url: "/cards", icon: <CreditCard size={25} /> },
];

const SIDEBAR_ADMIN = [
  // { label: "Dashboard", url: "/admin", icon: <LayoutDashboard size={30} /> },
  {
    label: "Categories",
    url: "/admin/categories",
    icon: <SquareStack size={25} />,
  },
  {
    label: "Descriptions",
    url: "/admin/descriptions",
    icon: <CircleEqual size={25} />,
  },
  { label: "Users", url: "/admin/users", icon: <UserRound size={25} /> },
];

const SIDEBAR_USER = [
  {
    label: "Profile",
    url: "/profile",
    icon: <LucideUser2 size={25} />,
  },
  {
    label: "Settings",
    url: "/settings",
    icon: <Settings size={25} />,
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

  if (!isUser) {
    return null;
  }

  return (
    <div className="hidden sticky top-[0.5rem] md:flex flex-col gap-2 py-2 px-2 bg-stone-200 rounded-md m-2 mr-0 h-[calc(100vh-1rem)]">
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
              " flex items-center gap-2 p-2 duration-200 rounded-md"
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
}

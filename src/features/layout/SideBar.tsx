import {
  CalendarDays,
  ClipboardMinus,
  ClipboardPlus,
  CreditCard,
  LayoutDashboard,
  LucideUser2,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
  { label: "Add", url: "/addItems", icon: <ClipboardPlus size={30} /> },
  {
    label: "Calendar",
    url: "/calendar",
    icon: <CalendarDays size={30} />,
  },
  { label: "Cards", url: "/cards", icon: <CreditCard size={30} /> },
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

  const isActive = (page: string) => location.pathname.includes(page);

  return (
    <div className="flex flex-col p-4 border-r-2 border-r-zinc-400 lg:w-[12%]">
      {SIDEBAR.map((item, idx) => (
        <Link
          to={item?.url}
          key={idx}
          className={
            (isActive(item.url) ? "bg-zinc-800 text-white" : "") +
            (item.label === "Profile" ? " mt-auto " : "") +
            " flex items-center gap-2 py-2 px-4 duration-200 rounded-md"
          }
        >
          {item?.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

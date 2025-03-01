import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  CreditCard,
  FilePlus,
  LayoutGrid,
  LogOut,
  Menu,
  ScrollText,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { url: "/dashboard", label: "Dashboard", icon: <LayoutGrid size={20} /> },
  { url: "/transactions", label: "Report", icon: <ScrollText size={20} /> },
  { url: "/addItems", label: "Add Items", icon: <FilePlus size={20} /> },
  { url: "/calendar", label: "Calendar", icon: <CalendarDays size={20} /> },
  { url: "/cards", label: "Accounts", icon: <CreditCard size={20} /> },
  { url: "/logout", label: "Sign Out", icon: <LogOut size={20} /> },
];

export default function UserDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Menu size={25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.url} asChild>
            <Link to={item.url} className="flex items-center gap-2">
              {item?.icon}
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

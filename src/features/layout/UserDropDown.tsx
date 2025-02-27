import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { url: "/dashboard", label: "Dashboard", icon: null },
  { url: "/transactions", label: "Report", icon: null },
  { url: "/addItems", label: "Add Items", icon: null },
  { url: "/calendar", label: "Calendar", icon: null },
  { url: "/cards", label: "Accounts", icon: null },
  { url: "/logout", label: "Sign Out", icon: null },
];

export default function UserDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <UserRound size={25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.url} asChild>
            <Link to={item.url}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

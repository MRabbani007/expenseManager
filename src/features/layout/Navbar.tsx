import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectAuth } from "../auth/authSlice";
import { Button } from "@/components/ui/button";
import { GiTakeMyMoney } from "react-icons/gi";
import { Bell, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const auth = useAppSelector(selectAuth);

  return (
    <nav className="flex items-stretch justify-between gap-4 duration-500 z-50 border-b-2 border-zinc-400">
      {/* Left Block */}
      <div className="hidden sm:flex items-center justify-center gap-4 border-r-[1px] border-zinc-300 w-[12%]">
        <Link to="/" className="flex items-center gap-2">
          <GiTakeMyMoney size={30} />
          <span className="font-mono font-bold">Wallet</span>
        </Link>
        {/* <Link to="/transactions">
          <TbReportAnalytics size={30} />
        </Link>
        <Link to="/addItems">
          <IoAddCircleOutline size={30} />
        </Link> */}
      </div>
      {/* Right Block */}
      <div className="flex items-center gap-2 p-4">
        {auth?.username ? (
          <>
            <Button variant="ghost" className="py-0 px-2">
              <Bell size={30} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <UserRound size={30} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link to={"/admin"}>Admin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link to="/login" className="hidden sm:flex items-center">
            <UserRound size={30} />
          </Link>
        )}
      </div>
    </nav>
  );
}

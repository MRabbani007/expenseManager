import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectAuth } from "../auth/authSlice";
import { Button } from "@/components/ui/button";
import { GiTakeMyMoney } from "react-icons/gi";
import { Bell } from "lucide-react";
import UserDropDown from "./UserDropDown";

export default function Navbar() {
  const auth = useAppSelector(selectAuth);

  return (
    <nav className="flex items-stretch justify-between gap-4 duration-500 z-50 mx-2 mt-2 px-2 rounded-lg bg-stone-200">
      {/* Left Block */}
      <div className="flex items-center justify-center gap-4 p-2">
        <Link to="/" className="flex items-center gap-2">
          <GiTakeMyMoney size={25} className="text-sky-700" />
          <span className="font-mono font-extrabold">Wallet</span>
        </Link>
      </div>
      {/* Right Block */}
      <div className="flex items-center gap-0 p-2">
        {auth?.username ? (
          <>
            <Button variant="ghost" className="py-0 px-2">
              <Bell size={25} />
            </Button>
            <UserDropDown />
          </>
        ) : (
          <Link
            to="/login"
            className="font-extralight text-white bg-sky-800 hover:bg-sky-700 duration-200 py-2 px-4 rounded-full"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
}

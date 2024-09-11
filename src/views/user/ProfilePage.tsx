import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { selectAuth } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const auth = useAppSelector(selectAuth);

  return (
    <main>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <div className="size-16 rounded-full overflow-hidden">
          <img src="images/robot.jpg" className="object-cover w-full h-full" />
        </div>
        <div className="flex-1">
          <h1 className="font-semibold text-2xl">{auth.username}</h1>
          <p className="text-sm">{new Date().toLocaleDateString("en-US")}</p>
        </div>
        <div>
          <button className="py-2 px-4 bg-red-700 hover:bg-red-600 duration-200 text-white rounded-lg">
            Try Premium
          </button>
        </div>
      </header>
      <div className="flex-1">
        <div>Name: First Last</div>
        <div>Email: email@example.com</div>
      </div>
      <div className="flex items-center justify-between">
        <Link to="/changePWD">Change Password</Link>
        <Button asChild variant="destructive">
          <Link to="/logout">Sign Out</Link>
        </Button>
      </div>
    </main>
  );
}

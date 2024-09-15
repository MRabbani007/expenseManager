import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectAuth } from "@/features/auth/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const temp = {
  firstname: "",
  lastname: "",
  email: "",
  country: "",
};

export default function ProfilePage() {
  const auth = useAppSelector(selectAuth);

  const [state, setState] = useState(temp);

  return (
    <main>
      <header className="flex items-center gap-2">
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
      <div className="flex-1 flex flex-col gap-4">
        <Label>Name</Label>
        <div className="flex items-center gap-4">
          <Input
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={state.firstname}
          />
          <Input
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            value={state.lastname}
          />
        </div>
        <Label>Email</Label>
        <div className="flex items-center gap-4">
          <Input
            id="email"
            name="email"
            placeholder="Email"
            value={state.email}
            disabled
          />
          <Button>Verify</Button>
        </div>
        <Label>Country</Label>
        <Input
          id="country"
          name="country"
          placeholder="Country"
          value={state.country}
        />
        <Button className="w-fit mx-auto">Save Changes</Button>
      </div>
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link to="/changePWD">Change Password</Link>
        </Button>
        <Button asChild variant="destructive">
          <Link to="/logout">Sign Out</Link>
        </Button>
      </div>
    </main>
  );
}

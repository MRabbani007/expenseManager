import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { clearCredentials, selectAuth } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOutPage() {
  const auth = useAppSelector(selectAuth);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(null);
      dispatch(clearCredentials());

      navigate("/");
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (!auth?.username) {
  //     navigate("/login");
  //   }
  // }, [auth]);

  return (
    <main>
      <Button
        variant="destructive"
        className="w-fit my-auto mx-auto"
        onClick={handleLogout}
      >
        Sign Out
      </Button>
    </main>
  );
}

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectAuth } from "./authSlice";

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  const isAuthorized = auth?.roles?.find((role) =>
    allowedRoles?.includes(role)
  );

  const isLoggedIn = !!auth?.username;

  return isAuthorized ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

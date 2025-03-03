import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAuth, setCredentials } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";
import { FaSpinner } from "react-icons/fa";

export default function PersistLogin() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [refresh] = useRefreshMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [persist] = useLocalStorage({ key: "persist", initValue: false });

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh(null);

        if (response?.data) {
          const token = response.data?.accessToken;
          localStorage.setItem("token", token);
          dispatch(
            setCredentials({
              ...response.data,
              token,
            })
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.token && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // console.log(`isLoading: ${isLoading}`);
    // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <main className="items-center justify-center">
          <p>Connecting to server</p>
          <FaSpinner size={30} className="animate-spin" />
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
}

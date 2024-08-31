import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { selectAuth, setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [login] = useLoginMutation();
  const auth = useAppSelector(selectAuth);
  // Set focus to username input on load
  const usernameRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [check, setCheck] = useState(false);
  // useToggle("persist", false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success && usernameRef?.current) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Remove error message on user input
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    if (auth?.username) {
      navigate("/logout");
    }
  }, [auth]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      let response = await login({ username, password });

      if (response?.data) {
        const token = response?.data?.accessToken;
        const roles = response?.data?.roles;
        dispatch(setCredentials({ username, roles, token }));

        setUsername("");
        setPassword("");
        setSuccess(true);

        navigate(from, { replace: true });
        navigate("/");
      } else {
        if (response?.error) {
          setErrMsg("No Server Response");
          // if(response.error?.status === 400){
          // }
        }
      }
    } catch (error) {
      console.log(error);

      // if (!error?.response) {
      //   setErrMsg("No Server Response");
      // } else if (error.response?.status === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (error.response?.status === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Login Failed");
      // }

      errRef.current?.focus();
    }
  };

  return (
    <main className="flex items-center justify-center p-4 md:p-6 lg:p-8">
      <form
        className="flex flex-col gap-4 p-8 w-full max-w-[400px] border-2 border-red-500"
        onSubmit={handleSubmit}
      >
        <FaRegUserCircle size={60} className="mx-auto" />
        <h1 className="font-bold text-3xl mx-auto">Sign In</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="">
          {/* <Label htmlFor="username" className="my-2">
            Username
          </Label> */}
          <Input
            type="text"
            id="username"
            placeholder="UserName"
            ref={usernameRef}
            autoComplete="off"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          {/* <Label htmlFor="password" className="my-2">
            Password
          </Label> */}
          <Input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={() => setCheck((curr) => !curr)}
            checked={check}
          />
          <label htmlFor="persist" className="ml-2">
            Trust This Device
          </label>
        </div>
        <Button type="submit" className="w-fit mx-auto">
          Signin
        </Button>

        <p className="my-2 mx-3">
          Don't have an account?
          <Link to="/register" className="btn btn-blue ml-2">
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
}

import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { selectAuth, setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GiTakeMyMoney } from "react-icons/gi";

export default function SignInPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const [login] = useLoginMutation();
  const auth = useAppSelector(selectAuth);
  // Set focus to username input on load
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [check, setCheck] = useState(false);
  // useToggle("persist", false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success && usernameRef?.current) {
      usernameRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (location?.state?.email) {
      setUsername(location.state.email);
      passwordRef.current?.focus();
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
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      let response = await login({ username, password });

      if (response?.data) {
        const token = response?.data?.accessToken;
        const roles = response?.data?.roles;
        localStorage.setItem("token", token);
        dispatch(setCredentials({ username, roles, token }));

        setUsername("");
        setPassword("");
        setSuccess(true);

        navigate("/dashboard", { replace: true });
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
    <main className="flex items-center justify-center p-4 md:p-6 lg:p-8 bg-stone-400">
      <form
        className="flex flex-col gap-4 p-8 w-full max-w-[400px] bg-white rounded-xl shadow-lg shadow-stone-800"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-2 justify-center mt-2 mb-6">
          <GiTakeMyMoney size={40} className="text-green-700" />
          <h1 className="font-normal text-2xl">Welcome Back</h1>
        </div>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="">
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
          <Input
            type="password"
            ref={passwordRef}
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="checkbox"
            id="persist"
            onChange={() => setCheck((curr) => !curr)}
            checked={check}
            className="size-4"
          />
          <Label htmlFor="persist">Trust This Device</Label>
        </div>
        <Button type="submit" className="">
          Sign In
        </Button>
        <p className="space-x-0">
          Don't have an account?
          <Button asChild variant="link">
            <Link to="/register">Sign Up for free</Link>
          </Button>
        </p>
      </form>
    </main>
  );
}

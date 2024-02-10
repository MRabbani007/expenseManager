import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imported Context
import { UserContext, UserProvider } from "../context/UserState";
import { AuthProvider } from "../context/AuthProvider";
// Imported Components
import Navbar from "../components/Navbar";
// Imported Hooks
import useAuth from "../hooks/useAuth";
// Imported Data
import { fetchUser } from "../data/serverFunctions";
import { ACTIONS, LOCAL_USER, genDate, saveLocal } from "../data/utils";
// Imported Icons
import { FaRegUserCircle } from "react-icons/fa";

const SignIn = () => {
  const { handleSignIn } = useContext(UserContext);
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetchUser({
        type: ACTIONS.USER_SIGNIN,
        payload: {
          username: user,
          password: pwd,
        },
      });
      if (response === "accepted") {
        handleSignIn(user);
        // console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        setUser("");
        setPwd("");
        // navigate("/", { state: { username: user } });
        // navigate(from, { replace: true });
      } else {
        alert(response);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err);
      errRef.current.focus();
    }
  };

  const [signedinUser, setSignedinUser] = useState("");
  const [todayDate, setTodayDate] = useState(genDate(0));

  return (
    <div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form
        className="flex flex-col border-2 border-red-500 p-5 w-[400px]"
        onSubmit={handleSubmit}
      >
        <FaRegUserCircle className="text-[80px] mx-auto mt-3 mb-5" />
        <label htmlFor="username" className="my-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="UserName"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password" className="my-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button type="submit" className="btn btn-yellow mx-auto my-2">
          Signin
        </button>
      </form>
      <p className="my-2">
        Create account
        <Link to="/signup" className="btn btn-blue ml-2">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

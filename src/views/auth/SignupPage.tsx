// React dependencies
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Imported Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/features/auth/authApiSlice";
import { useAppSelector } from "@/app/hooks";
import { selectAuth } from "@/features/auth/authSlice";
import { Input } from "@/components/ui/input";
import { GiTakeMyMoney } from "react-icons/gi";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const auth = useAppSelector(selectAuth);

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    !success && userRef?.current && userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    if (auth?.username) {
      navigate("/logout");
    }
  }, [auth]);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);

      if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
      }

      const response = await register({
        username: user,
        password: pwd,
      });

      if (response?.data?.status === "success") {
        setSuccess(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        setUser("");
        setPwd("");
        setMatchPwd("");

        navigate("login", { replace: true, state: { username: user } });
      }
    } catch (err) {
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg("Registration Failed");
      // }
      errRef?.current && errRef.current.focus();
    }
  };

  return (
    <main className="flex items-center justify-center p-4 md:p-6 lg:p-8 bg-stone-400 ">
      <form
        className="flex flex-col gap-0 p-8 w-full max-w-[400px] bg-white rounded-xl shadow-lg shadow-stone-800"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <GiTakeMyMoney size={40} className="text-green-700" />
          <h1 className="font-normal text-2xl">Get Started</h1>
        </div>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <p className="mb-4">Create your account</p>
        <div className="relative mb-6">
          <Input
            type="text"
            id="username"
            placeholder="UserName"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <FontAwesomeIcon
            icon={validName ? faCheck : faTimes}
            className={
              (!user ? "hide" : validName ? "valid" : "invalid") +
              " absolute right-2 top-1/2 -translate-y-1/2"
            }
          />
          <div
            id="uidnote"
            className={
              (userFocus && user && !validName
                ? ""
                : "invisible opacity-0 -translate-y-4") +
              " absolute left-0 top-[120%] flex flex-col items-start gap-2 duration-200 bg-stone-200 rounded-md p-2 text-sm z-10"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
        </div>
        <div className="relative mb-2">
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <FontAwesomeIcon
            icon={validPwd ? faCheck : faTimes}
            className={
              (!pwd ? "hide" : validPwd ? "valid" : "invalid") +
              " absolute right-2 top-1/2 -translate-y-1/2"
            }
          />
          <div
            id="uidnote"
            className={
              (pwdFocus && !validPwd
                ? ""
                : "invisible opacity-0 -translate-y-4") +
              " absolute left-0 top-[120%] flex flex-col items-start gap-2 duration-200 bg-stone-200 rounded-md p-2 text-sm z-10"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
        </div>
        <div className="relative">
          <Input
            type="password"
            id="confirm_pwd"
            placeholder="Confirm Password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <FontAwesomeIcon
            icon={validMatch && matchPwd ? faCheck : faTimes}
            className={
              (validMatch && matchPwd
                ? "valid"
                : validMatch || !matchPwd
                ? "hide"
                : "invalid") + " absolute right-2 top-1/2 -translate-y-1/2"
            }
          />
          <div
            id="uidnote"
            className={
              (matchFocus && !validMatch
                ? ""
                : "invisible opacity-0 -translate-y-4") +
              " absolute left-0 top-[120%] flex flex-col items-start gap-2 duration-200 bg-stone-200 rounded-md p-2 text-sm z-10"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>Must match the first password input field.</p>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!validName || !validPwd || !validMatch ? true : false}
          className="my-4"
        >
          Signup
        </Button>
        <div className="flex items-center gap-2">
          <p>Already have an account?</p>
          <Button type="button" asChild variant="link">
            <Link to="/login">Signin</Link>
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Signup;

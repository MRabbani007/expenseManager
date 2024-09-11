import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectAuth } from "@/features/auth/authSlice";
import { FormEvent, useEffect, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ChangePassword = () => {
  const auth = useAppSelector(selectAuth);

  const [currentPwd, setCurrentPwd] = useState("");

  const navigate = useNavigate();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // on change remove error message
  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const v1 = PWD_REGEX.test(pwd);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    // try {
    // const response = await axiosPrivate.post(SERVER.USER_PWD, {
    //   roles: auth?.roles,
    //   action: {
    //     type: "pwd",
    //     payload: {
    //       password: currentPwd,
    //       username: auth?.user,
    //       newPassword: pwd,
    //     },
    //   },
    // });
    // console.log(response.data);
    // if (response?.data?.status === "success") {
    //   //clear state and controlled inputs
    //   //need value attrib on inputs for this
    //   setCurrentPwd("");
    //   setPwd("");
    //   setMatchPwd("");
    //   navigate(from, { replace: true });
    //   navigate("/settings", { state: { username: auth?.user } });
    // } else {
    //   alert(response);
    // }
    //   console.log("first");
    // } catch (error) {
    //   if (!error?.response) {
    //     setErrMsg("No Server Response");
    //   } else {
    //     setErrMsg("Failed to change password");
    //   }
    // }
  };

  const onReset = () => {
    setCurrentPwd("");
    setPwd("");
    setMatchPwd("");
    navigate("/settings");
  };

  return (
    <main className="bg-stone-400 items-center justify-center">
      <form
        className="flex flex-col gap-0 p-8 w-full max-w-[400px] bg-white rounded-xl shadow-lg shadow-stone-800"
        onSubmit={handleSubmit}
        onReset={onReset}
      >
        <h1 className="font-light mb-4">Change Password</h1>

        <Label htmlFor="currentPassword" className="mb-2">
          Current Password
        </Label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Current Password"
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
        />
        <Label htmlFor="password" className="my-2">
          New Password
          <CiSquareCheck className={validPwd ? "valid" : "hide"} />
          <CiSquareRemove className={validPwd || !pwd ? "hide" : "invalid"} />
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="New Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <Label htmlFor="matchPassword" className="my-2">
          Re-Enter New Password
          <CiSquareCheck
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <CiSquareRemove
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </Label>
        <Input
          id="matchPassword"
          type="password"
          placeholder="Re-Enter New Password"
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
        />
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button type="submit">Submit</Button>
          <Button type="reset" className="btn btn-blue">
            Cancel
          </Button>
        </div>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
      </form>
    </main>
  );
};

export default ChangePassword;

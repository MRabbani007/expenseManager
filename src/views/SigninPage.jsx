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
import SignIn from "../components/SignIn";

const SigninPage = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <Navbar />
        <div className="text-slate-950 pt-[50px] flex flex-col items-center justify-center min-h-screen">
          {false ? (
            <>
              {/* Header */}
              <div className="">
                {/* <h1 className="">{"Hello, " + signedinUser}</h1> */}
                <p className="btn btn-yellow my-2">
                  {todayDate.day +
                    ", " +
                    todayDate.date +
                    " " +
                    todayDate.month}
                </p>
              </div>
              <button className="btn btn-blue" onClick={handleSignout}>
                Sign Out
              </button>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </AuthProvider>
    </UserProvider>
  );
};

export default SigninPage;

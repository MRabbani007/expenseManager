import React from "react";
import { GlobalProvider } from "../context/GlobalState";
import Navbar from "../components/Navbar";
// Imported Media
import IMG_tenge from "../assets/icons/tenge.png";
import IMG_dollar from "../assets/icons/dollar.png";
import IMG_euro from "../assets/icons/euro.png";
import IMG_ruble from "../assets/icons/ruble.png";
import { FiPlusCircle } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { UserProvider } from "../context/UserState";

const SettingsPage = () => {
  return (
    <UserProvider>
      <GlobalProvider>
        <Navbar />
        <div className="pt-[60px] px-5">
          <h1>Settings</h1>
          <section className="border-2 border-slate-400 rounded-lg p-3">
            <h2 className="text-lg mb-1">Currency</h2>
            <div>
              <img src={IMG_dollar} alt="" className="icon-lg" />
              <img src={IMG_tenge} alt="" className="icon-lg" />
              <img src={IMG_euro} alt="" className="icon-lg" />
              <img src={IMG_ruble} alt="" className="icon-lg" />
            </div>
          </section>
          <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
            <h2 className="text-lg mb-1">Pay Methods</h2>
            <div className="flex items-center gap-3">
              <span className="btn btn-red">Halyk</span>
              <span className="btn btn-red">Kaspi</span>
              <span className="btn btn-red">Cash</span>
              <IoAddCircle className="icon text-red-500" />
            </div>
          </section>
          <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
            <h2 className="text-lg mb-1">Display Settings</h2>
            <div className="flex items-center gap-3">
              <span>Expense description:</span>
              <span className="btn btn-red">Icon Only</span>
              <span className="btn btn-red">Show Text</span>
            </div>
          </section>
          <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
            <h2 className="text-lg mb-1">Account</h2>
            <div className="flex items-center gap-3">
              <span>Name</span>
              <span className="btn btn-red">Enter Name</span>
            </div>
            <div className="flex items-center gap-3 my-3">
              <span>Email</span>
              <span className="btn btn-red">Enter Email</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Change Password</span>
            </div>
          </section>
        </div>
      </GlobalProvider>
    </UserProvider>
  );
};

export default SettingsPage;

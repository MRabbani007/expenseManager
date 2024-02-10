import React from "react";
// Imported Context
import { GlobalProvider } from "../context/GlobalState";
// Imported Components
import Navbar from "../components/Navbar";
// Imported Icons
import { FiPlusCircle } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { UserProvider } from "../context/UserState";
// Imported Media
import IMG_tenge from "../assets/currency/tenge.png";
import IMG_dollar from "../assets/currency/dollar.png";
import IMG_euro from "../assets/currency/euro.png";
import IMG_ruble from "../assets/currency/ruble.png";

const SettingsPage = () => {
  return (
    <UserProvider>
      <GlobalProvider>
        <Navbar />
        <div className="page-container px-5">
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

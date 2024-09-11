// Imported Context
// Imported Components
// Imported Icons
import { IoAddCircle } from "react-icons/io5";
// Imported Media
// import IMG_tenge from "../assets/currency/tenge.png";
// import IMG_dollar from "../assets/currency/dollar.png";
// import IMG_euro from "../assets/currency/euro.png";
// import IMG_ruble from "../assets/currency/ruble.png";
import CardEnterName from "../components/CardEnterName";
import CardEnterEmail from "../components/CardEnterEmail";
import CardUserRoles from "../components/CardUserRoles";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <main className="">
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <Settings size={30} />
        <h1 className="font-bold text-2xl">Settings</h1>
      </header>
      <section className="border-2 border-slate-400 rounded-lg p-3">
        <h2 className="text-lg mb-1">Currency</h2>
        <div></div>
      </section>
      <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
        <h2 className="text-lg mb-1">Display Settings</h2>
        <div className="flex items-center gap-3">
          <span>Expense description:</span>
          <span className="btn btn-red">Icon Only</span>
          <span className="btn btn-red">Show Text</span>
        </div>
      </section>
    </main>
  );
};

export default SettingsPage;

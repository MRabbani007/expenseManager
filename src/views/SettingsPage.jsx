// Imported Context
// Imported Components
// Imported Icons
import { IoAddCircle } from "react-icons/io5";
// Imported Media
import CardEnterName from "../components/CardEnterName";
import CardEnterEmail from "../components/CardEnterEmail";
import CardUserRoles from "../components/CardUserRoles";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { CURRENCY_OBJ } from "../lib/data";

const SettingsPage = () => {
  return (
    <main className="">
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <Settings size={30} />
        <h1 className="font-bold text-2xl">Settings</h1>
      </header>
      <section>
        <h2 className="text-lg mb-1">Currency</h2>
        <div className="flex items-center gap-2">
          {Object.keys(CURRENCY_OBJ).map((item, idx) => (
            <img src={CURRENCY_OBJ[item]} key={idx} className="w-10" />
          ))}
        </div>
      </section>
      {/* <section>
        <h2 className="text-lg mb-1">Display Settings</h2>
        <div className="flex items-center gap-3">
          <span>Expense description:</span>
          <span className="btn btn-red">Icon Only</span>
          <span className="btn btn-red">Show Text</span>
        </div>
      </section> */}
    </main>
  );
};

export default SettingsPage;

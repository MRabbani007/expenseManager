import { Settings } from "lucide-react";
import { CURRENCY_OBJ } from "../lib/data";
import SelectField from "@/components/SelectField";
import { useState } from "react";
import { T_UserSettings } from "@/lib/templates";

const transactionDisplayOptions = [
  { label: "Card", value: "card" },
  { label: "Table", value: "table" },
];

const transactionsPerPage = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(T_UserSettings);

  return (
    <main className="">
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <Settings size={30} />
        <h1 className="font-bold text-2xl">Settings</h1>
      </header>
      <section>
        <h2 className="text-lg mb-1">Display Currency</h2>
        <div className="flex items-center gap-2">
          {Object.keys(CURRENCY_OBJ).map((item, idx) => (
            <img
              src={CURRENCY_OBJ[item as keyof typeof CURRENCY_OBJ]}
              key={idx}
              className="w-10"
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg mb-1">Display Settings</h2>
        <div className="flex items-center gap-3">
          <span>Expense description:</span>
          <span className="btn btn-red">Icon Only</span>
          <span className="btn btn-red">Show Text</span>
        </div>
      </section>
      <section>
        <p>Transactions</p>
        <SelectField
          label="Display"
          options={transactionDisplayOptions}
          value={settings?.transactionDisplay}
          onValueChange={(transactionDisplay) =>
            setSettings((curr) => ({ ...curr, transactionDisplay }))
          }
        />
        <SelectField
          label="Transactions Per Page"
          options={transactionsPerPage}
          value={settings?.transactionsPerPage}
          onValueChange={(transactionsPerPage) =>
            setSettings((curr) => ({
              ...curr,
              transactionsPerPage: +transactionsPerPage,
            }))
          }
        />
        <p></p>
      </section>
    </main>
  );
}

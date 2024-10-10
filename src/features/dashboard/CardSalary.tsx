import { ArrowBigRightDash, CheckCheck } from "lucide-react";

export default function CardSalary() {
  return (
    <div className="bg-zinc-300 rounded-xl p-4 space-y-4">
      <p className="text-xl font-bold">Income</p>
      <div className="bg-green-600/40 rounded-lg p-2 flex items-center gap-2">
        <div className="p-1 rounded-full bg-green-600 border-2 border-green-500 text-white">
          <CheckCheck size={26} />
        </div>
        <div>
          <p className="text-xl font-bold">October</p>
          <p className="text-xs space-x-2">
            <span>450,000</span>
            <span>01/10/2024</span>
          </p>
          <p className="text-sm"></p>
        </div>
      </div>
      <div className="bg-zinc-600/40 rounded-lg p-2 flex items-center gap-2">
        <div className="p-1 rounded-full bg-zinc-600 border-2 border-zinc-500 text-white">
          <ArrowBigRightDash size={26} />
        </div>
        <div>
          <p className="text-xl font-bold">October</p>
          <p className="text-xs space-x-2">
            <span>450,000</span>
            <span>01/11/2024</span>
          </p>
          <p className="text-sm"></p>
        </div>
      </div>
    </div>
  );
}

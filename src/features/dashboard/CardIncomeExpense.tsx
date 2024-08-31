import { getMonth } from "@/lib/date";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";

export default function CardIncomeExpense() {
  const budget = 400000;
  const income = 450000;
  const expense = 250000;
  const currency = "KZT";

  // let { firstDay, lastDay } = getMonth();

  // shadow-[0px_0px_10px_1px_rgb(255,0,0)]
  return (
    <div className="flex items-center gap-4 font-mono">
      <div className="bg-green-700/20 text-green-800 py-2 px-4 rounded-lg flex items-center gap-2">
        <GiReceiveMoney size={40} />
        <p className="space-x-2">
          <span>{currency}</span>
          <span>{income.toLocaleString("en-US")}</span>
        </p>
      </div>
      <div className="bg-blue-800/20 text-blue-800 py-2 px-4 rounded-lg flex items-center gap-2">
        <GiMoneyStack size={40} />
        <p className="space-x-2">
          <span>{currency}</span>
          <span>{budget.toLocaleString("en-US")}</span>
        </p>
      </div>
      <div className="bg-red-800/20 text-red-800 py-2 px-4 rounded-lg flex items-center gap-2">
        <GiPayMoney size={40} />
        <p className="space-x-2">
          <span>{currency}</span>
          <span>{expense.toLocaleString("en-US")}</span>
        </p>
      </div>
    </div>
  );
}

// {/* <div className="hidden my-5 mx-5 pb-3">
//         {/* Budget */}
//         <div className="text-end text-blue-500">
//           {/* <span className="font-semibold">Budget:</span> */}
//           <span>{currency + " " + budget.toLocaleString("en-US")}</span>
//         </div>
//         {/* Progress Bar */}
//         <div className="h-fit bg-slate-200 outline-none rounded-xl overflow-hidden">
//           <div
//             className={
//               " h-full bg-green-600 text-white rounded-xl outline-none text-center bg-blend-overlay shrink-0"
//             }
//             style={{ width: (expense / budget) * 100 + "%" }}
//           >
//             {(expense / budget) * 100 + "%"}
//           </div>
//         </div>
//         {/* Spending */}
//         <div className="text-red-500">
//           <span className="font-semibold">Spending:</span>
//           {currency + expense.toLocaleString("en-US")}
//         </div>
//       </div> */}

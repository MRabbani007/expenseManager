import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

const data01 = [
  {
    name: "Housing",
    value: 500,
  },
  {
    name: "Food & Groceries",
    value: 400,
  },
  {
    name: "Shopping",
    value: 100,
  },
  {
    name: "Transport",
    value: 40,
  },
  {
    name: "Bills & Payments",
    value: 80,
  },
  { name: "Others", value: 30 },
];

export default function ChartMonthSpending() {
  const [month, setMonth] = useState(new Date().getMonth());

  const handlePrev = () => {
    setMonth((curr) => curr - 1);
  };
  const handleNext = () => {
    setMonth((curr) => curr + 1);
  };

  return (
    <div className=" bg-zinc-200 p-4 rounded-xl">
      <div className="flex items-center gap-4 group">
        <p className="text-xl font-bold">Breakdown</p>
        <button
          className="ml-auto opacity-0 group-hover:opacity-100 duration-200"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </button>
        <span className="text-base min-w-8 text-center">
          {format(new Date(new Date().setMonth(month)), "LLL")}
        </span>
        <button
          onClick={handleNext}
          className=" opacity-0 group-hover:opacity-100 duration-200"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="w-full sm:w-[300px] h-[300px] flex items-center justify-center ">
        <ResponsiveContainer height="90%" width="100%">
          <PieChart>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            >
              <LabelList dataKey="value" position="inside" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

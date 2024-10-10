import { ChevronLeft, ChevronRight, Settings2 } from "lucide-react";
import { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function ChartBudget() {
  const [onHand, setOnHand] = useState(150000);
  const [width, setWidth] = useState("50%");
  const [backgroundColor, setBackgroundColor] = useState("#55AA00");

  const [month, setMonth] = useState(new Date().getMonth());

  const handlePrev = () => {
    setMonth((curr) => curr - 1);
  };
  const handleNext = () => {
    setMonth((curr) => curr + 1);
  };

  return (
    <div className="flex flex-col gap-1 min-w-[300px] max-w-[400px] bg-gradient-to-br from-blue-900 via-sky-950 to-sky-800 p-4 rounded-xl text-white ">
      <div className="flex items-center gap-4 group">
        <p className="text-xl font-bold">Budget</p>
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
      <div className="flex items-center gap-4 my-4">
        <div className="mx-auto text-4xl font-sans">
          <CountUp
            // start={-875.039}
            end={onHand}
            duration={2}
          />
          <span className="text-base">KZT</span>
        </div>
      </div>
      <div className="group">
        <div className="flex items-center font-medium mx-2 opacity-0 group-hover:opacity-100 duration-200">
          <span title="Spending" className="text-red-600">
            {/* 250,000 */}
          </span>
          <span title="Budget" className="ml-auto mr-2">
            400,000
          </span>
          <button>
            <Settings2 />
          </button>
        </div>
        <div className="h-6 bg-zinc-200 rounded-full flex items-center text-sm border-zinc-600 shadow-[0_0_4px_0px_gray] mb-4 peer">
          <motion.div
            title="Spending as of Today"
            className="h-6 flex items-center justify-center text-white rounded-l-full"
            style={{ backgroundColor }}
            initial={{ width: 0 }}
            animate={{ width }}
            transition={{ duration: 2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              250,000
            </motion.span>
          </motion.div>
          <motion.div
            className="h-6 flex items-center justify-center text-yellow-500 relative"
            title="Expected Payments for this month"
            style={{ backgroundColor: "#FFCC00" }}
            initial={{ width: 0 }}
            animate={{ width: "20%" }}
            transition={{ duration: 2, delay: 2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 4 }}
              className="absolute top-full left-1/2 -translate-x-1/2 my-auto"
            >
              400,000
            </motion.span>
          </motion.div>
        </div>
      </div>
      {/* <div title="Income" className="text-green-700 font-bold text-end mx-2">
        450,000
      </div> */}
    </div>
  );
}

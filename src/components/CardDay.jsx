import React, { useContext, useState } from "react";
import { genDate } from "../data/utils";
import { GlobalContext } from "../context/GlobalState";

const CardDay = () => {
  const [day, setDay] = useState(() => genDate());
  const { selectedTheme } = useContext(GlobalContext);

  return (
    <div
      className="w-[5rem] rounded-lg inline-block"
      style={{ border: "1px solid " + selectedTheme.navbar_bg }}
    >
      <div
        className="bg-red-600 text-slate-50 rounded-t-lg text-center"
        style={{ backgroundColor: selectedTheme.navbar_bg }}
      >
        {day.day}
      </div>
      <div className="p-2 rounded-b-lg text-center font-bold text-xl">
        {day.date + ", " + day.month}
      </div>
    </div>
  );
};

export default CardDay;

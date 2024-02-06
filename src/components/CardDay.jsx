import React, { useContext, useState } from "react";
import { genDate } from "../data/utils";
import { UserContext } from "../context/UserState";

const CardDay = () => {
  const { theme } = useContext(UserContext);

  const [day, setDay] = useState(genDate());

  return (
    <div
      className="w-[5rem] rounded-lg inline-block"
      style={{ border: "1px solid " + theme.navbar_bg }}
    >
      <div
        className="bg-red-600 text-slate-50 rounded-t-lg text-center"
        style={{ backgroundColor: theme.navbar_bg }}
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

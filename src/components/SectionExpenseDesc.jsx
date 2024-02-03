import React, { useContext } from "react";
import { expenseDesc } from "../data/templates";
import { GlobalContext } from "../context/GlobalState";

const SectionExpenseDesc = () => {
  const { description, handleDesc } = useContext(GlobalContext);

  return (
    <div className="flex flex-wrap gap-3 w-[500px]">
      {expenseDesc.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <img
              key={index}
              src={item.image}
              className={
                (description === item.name ? " bg-yellow-300" : " bg-white") +
                " p-1 rounded-lg icon-lg"
              }
              onClick={() => handleDesc(item.name, item.category)}
            />
            {/* <span className="font-mono">{item.name}</span> */}
          </div>
        );
      })}
    </div>
  );
};

export default SectionExpenseDesc;

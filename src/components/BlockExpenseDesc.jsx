import React from "react";
import CardExpenseDesc from "./CardExpenseDesc";

const BlockExpenseDesc = ({ listTitle = "", expenseDescArray = [] }) => {
  return (
    <div className="lg:min-w-[700px] min-w-[300px] p-2">
      <h2 className="font-mono font-semibold text-xl">{listTitle}</h2>
      <div className="flex flex-wrap gap-2 w-full p-2 mx-auto">
        {expenseDescArray.map((item, index) => {
          return <CardExpenseDesc item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default BlockExpenseDesc;

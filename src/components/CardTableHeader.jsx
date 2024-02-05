import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const CardTableHeader = () => {
  const { selectedTheme } = useContext(GlobalContext);
  return (
    <tr
      style={{
        backgroundColor: selectedTheme.navbar_bg,
        color: selectedTheme.navbar_text,
      }}
    >
      <th className="w-[50px]">SN</th>
      <th className="w-[100px] shrink-0 hidden lg:table-cell">Date</th>
      <th className="w-[200px] shrink-0 hidden lg:table-cell">Category</th>
      <th className="w-[200px] shrink-0">Description</th>
      <th className="w-[100px] shrink-0">Amount</th>
      <th className="w-[150px] shrink-0 hidden lg:table-cell">Account</th>
      <th className="w-[50px]">Edit</th>
    </tr>
  );
};

export default CardTableHeader;

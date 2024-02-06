import React, { useContext } from "react";
import { UserContext } from "../context/UserState";

const CardTableHeader = () => {
  const { theme } = useContext(UserContext);
  return (
    <tr
      style={{
        backgroundColor: theme.navbar_bg,
        color: theme.navbar_text,
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

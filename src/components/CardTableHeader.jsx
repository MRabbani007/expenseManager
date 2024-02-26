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
      <th className="hidden lg:table-cell">SN</th>
      <th className=" hidden lg:table-cell">Date</th>
      <th className=" hidden lg:table-cell">Category</th>
      <th className="">Description</th>
      <th className="">Amount</th>
      <th className=" hidden lg:table-cell">Account</th>
      <th className="">Edit</th>
    </tr>
  );
};

export default CardTableHeader;

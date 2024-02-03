import React from "react";

const CardTableHeader = () => {
  return (
    <tr>
      <th className="w-[50px]">Edit</th>
      <th className="w-[50px]">SN</th>
      <th className="w-[100px] shrink-0 hidden lg:block">Date</th>
      <th className="w-[200px] shrink-0 hidden lg:block">Category</th>
      <th className="w-[200px] shrink-0">Description</th>
      <th className="w-[100px] shrink-0">Amount</th>
      <th className="w-[150px] shrink-0 hidden lg:block">Account</th>
      <th className="w-[50px]">Delete</th>
    </tr>
  );
};

export default CardTableHeader;

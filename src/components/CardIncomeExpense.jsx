import React from "react";

const CardIncomeExpense = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={3}>Total {"(KZT)"}</th>
          </tr>
          <tr>
            <th className="w-[150px]">Income</th>
            <th className="w-[150px]">Expenses</th>
            <th className="w-[150px]">Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CardIncomeExpense;

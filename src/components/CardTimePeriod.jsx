import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const CardTimePeriod = () => {
  const [timePeriod, setTimePeriod] = useState("");
  const { startDate, endDate, handleStartDate, handleEndDate, getTransaction } =
    useContext(GlobalContext);
  const handleTimePeriod = (value) => {
    if (value === timePeriod) {
      setTimePeriod("");
    } else {
      setTimePeriod(value);
    }
  };
  return (
    <div className="">
      <select
        value={timePeriod}
        onChange={(e) => handleTimePeriod(e.target.value)}
        className="time-period-list flex h-fit w-fit mx-auto btn btn-red"
      >
        <option value="day">Show Day</option>
        <option value="week">1 Week</option>
        <option value="month">1 Month</option>
        <option value="quarter">3 Months</option>
        <option value="period">Select Dates</option>
      </select>
      <div className="flex items-center w-fit mx-auto my-2">
        <label htmlFor="startDate" className="mx-2">
          Select Date
        </label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => handleStartDate(e.target.value)}
        />
        <div className={timePeriod === "period" ? "" : "hidden"}>
          <span className="mx-2">Select End Date</span>
          <input
            type="date"
            name="startDate"
            value={endDate}
            onChange={(e) => handleEndDate(e.target.value)}
          />
        </div>
        <button onClick={() => getTransaction()} className="btn btn-red mx-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CardTimePeriod;

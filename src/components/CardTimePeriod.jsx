import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { getDate } from "../data/utils";
import { UserContext } from "../context/UserState";

const CardTimePeriod = () => {
  const { startDate, endDate, handleStartDate, handleEndDate, getTransaction } =
    useContext(GlobalContext);
  const { theme } = useContext(UserContext);

  const [timePeriod, setTimePeriod] = useState("");
  const handleTimePeriod = (value) => {
    setTimePeriod(value);
  };
  const handleFirstDate = (value) => {
    handleStartDate(value);
    if (timePeriod === "day") {
      handleEndDate(getDate(0, value));
    } else if (timePeriod === "week") {
      handleEndDate(getDate(6, value));
    } else if (timePeriod === "month") {
      handleEndDate(getDate(30, value));
    } else if (timePeriod === "quarter") {
      handleEndDate(getDate(90, value));
    }
  };

  return (
    <div className="">
      <select
        value={timePeriod}
        onChange={(e) => handleTimePeriod(e.target.value)}
        className="flex items-center justify-center min-w-[100px] mx-auto btn btn-red py-2 px-4 cursor-pointer"
        style={{
          backgroundColor: theme.navbar_bg,
          color: theme.navbar_text,
        }}
      >
        <option value="day">Show Day</option>
        <option value="week">1 Week</option>
        <option value="month">1 Month</option>
        <option value="quarter">3 Months</option>
        <option value="period">Select Dates</option>
      </select>
      <div className="flex flex-wrap items-center justify-center my-2">
        <div className="flex items-center">
          <label htmlFor="startDate" className="mx-2">
            Select Date
          </label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => handleFirstDate(e.target.value)}
            style={{ border: "1px solid " + theme.navbar_bg }}
          />
        </div>
        <div
          className={
            (timePeriod === "period" ? "" : "hidden") +
            " flex items-center my-2"
          }
        >
          <span className="mx-2">Select End Date</span>
          <input
            type="date"
            name="startDate"
            value={endDate}
            onChange={(e) => handleEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={() => getTransaction()}
          className="btn mx-2"
          style={{
            backgroundColor: theme.navbar_bg,
            color: theme.navbar_text,
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CardTimePeriod;

import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { genDate } from "../data/utils";

const CardHeader = () => {
  const { userName } = useContext(GlobalContext);
  // Display today date value
  const [todayDate, setTodayDate] = useState(genDate(0));

  return (
    <div className="">
      <h1 className="">
        {userName === "" ? (
          <Link to="/signin" className="btn btn-red">
            Signin
          </Link>
        ) : (
          <span className="">{"Hello, " + userName}</span>
        )}
      </h1>
      <p className="btn btn-red my-2">
        {todayDate.day + ", " + todayDate.date + " " + todayDate.month}
      </p>
    </div>
  );
};

export default CardHeader;

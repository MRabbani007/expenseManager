import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { genDate } from "../data/utils";
import CardDay from "./CardDay";
import { UserContext } from "../context/UserState";

const CardHeader = () => {
  const { userName } = useContext(UserContext);

  // Display today date value
  const [todayDate, setTodayDate] = useState(genDate(0));

  return (
    <div className="">
      <CardDay />
      {userName === "" ? (
        <Link to="/signin" className="btn btn-red inline-block">
          Signin
        </Link>
      ) : (
        <h1 className="inline-block ml-3">{"Hello, " + userName}</h1>
      )}
    </div>
  );
};

export default CardHeader;

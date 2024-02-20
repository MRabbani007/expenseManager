import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { genDate } from "../data/utils";
import CardDay from "./CardDay";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../context/UserState";

const CardHeader = () => {
  const { auth } = useAuth();
  const { name } = useContext(UserContext);
  return (
    <div className="">
      <CardDay />
      {auth?.user === "" ? (
        <Link to="/signin" className="btn btn-red inline-block">
          Signin
        </Link>
      ) : (
        <h1 className="inline-block ml-3">
          {"Hello, " +
            (!!name && name !== "" ? name.split(" ")[0] : auth?.user)}
        </h1>
      )}
    </div>
  );
};

export default CardHeader;

import React, { useContext, useState } from "react";
import { expenseDesc_living } from "../data/templates";
import { GlobalContext } from "../context/GlobalState";
import SectionUserDescriptions from "./SectionUserDescriptions";
import { UserContext } from "../context/UserState";
import { CiCircleMore, CiCirclePlus } from "react-icons/ci";

const SectionExpenseDesc = () => {
  const { description, handleDesc } = useContext(GlobalContext);
  const { userSelectedDescriptions } = useContext(UserContext);

  const [addDesc, setAddDesc] = useState(false);

  return (
    <div className=" lg:max-w-[80%] w-fit mb-3">
      <div className="flex items-center">
        {addDesc ? "Select Descriptions" : "Expense Description"}
        <CiCircleMore className="icon" onClick={() => setAddDesc(!addDesc)} />
      </div>
      {!addDesc ? (
        <div className="flex flex-wrap items-center justify-center gap-1 p-0 lg:p-3">
          {userSelectedDescriptions.map((item, index) => {
            return (
              <div key={index} className="">
                <img
                  key={index}
                  src={item.image}
                  title={item.name}
                  className={
                    (description === item.name
                      ? " bg-yellow-300"
                      : " bg-white") + " p-1 rounded-lg icon-xl"
                  }
                  onClick={() => handleDesc(item.name, item.category)}
                />
                {/* <p className="font-mono">{item.name}</p> */}
              </div>
            );
          })}
        </div>
      ) : (
        <SectionUserDescriptions />
      )}
    </div>
  );
};

export default SectionExpenseDesc;

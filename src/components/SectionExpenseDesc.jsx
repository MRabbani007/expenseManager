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
    <>
      <div className="flex flex-wrap items-center justify-center gap-3 lg:w-[80%] p-3">
        {!addDesc ? (
          userSelectedDescriptions.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
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
                {/* <span className="font-mono">{item.name}</span> */}
              </div>
            );
          })
        ) : (
          <SectionUserDescriptions />
        )}
      </div>
      <div className="flex items-center justify-center">
        <CiCircleMore
          className="icon-lg mx-auto"
          onClick={() => setAddDesc(!addDesc)}
        />
      </div>
    </>
  );
};

export default SectionExpenseDesc;

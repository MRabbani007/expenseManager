import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserState";

const CardExpenseDesc = ({ item }) => {
  const {
    userSelectedDescriptions,
    handleAddDescription,
    handleRemoveDescription,
  } = useContext(UserContext);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    let temp = userSelectedDescriptions.findIndex((desc) => {
      return desc.name === item.name;
    });
    if (temp >= 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [userSelectedDescriptions]);

  return (
    <div className="group relative">
      <img
        src={item.image}
        alt=""
        title={item.name}
        className={
          (selected === true ? "bg-yellow-200" : "bg-slate-100") +
          " icon-xl hover:bg-yellow-400 duration-300 rounded-lg cursor-pointer"
        }
      />
      {/* <p className="font-mono">{item.name}</p> */}
      {/* <p>{item.category}</p> */}
      <p className="invisible group-hover:visible">
        <FaTimes
          className="icon-sm text-red-600 absolute right-2 bottom-2 bg-slate-200"
          onClick={() => {
            handleRemoveDescription(item);
            setSelected(false);
          }}
        />
        <FaCheck
          className="icon-sm text-green-600 absolute left-2 bottom-2 bg-slate-200"
          onClick={() => {
            handleAddDescription(item);
            setSelected(true);
          }}
        />
      </p>
    </div>
  );
};

export default CardExpenseDesc;

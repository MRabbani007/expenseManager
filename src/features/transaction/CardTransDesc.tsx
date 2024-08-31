import { DESCRIPTIONS } from "@/lib/data";
import { Description, Transaction } from "@/types/type";
import { Dispatch, SetStateAction, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import FormSelectDescriptions from "./FormSelectDescriptions";

interface Props {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
}

export default function CardTransDesc({ transaction, setTransaction }: Props) {
  const [edit, setEdit] = useState(false);

  const handleDesc = (desc: Description) => {
    setTransaction((curr) => ({
      ...curr,
      category: desc.category,
      description: desc.value,
    }));
  };

  return (
    <div>
      <div className="flex items-center gap-2 group">
        <span className="text-2xl font-semibold">Description</span>
        <button onClick={() => setEdit(true)}>
          <CiCircleMore
            size={30}
            className="invisible group-hover:visible duration-200"
          />
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {DESCRIPTIONS.map((item, index) => (
          <div key={index} className="">
            <img
              key={index}
              src={item.image}
              title={item.label}
              className={
                (transaction?.description === item.value
                  ? " bg-yellow-300"
                  : " bg-white") + " p-1 rounded-lg w-16"
              }
              onClick={() => handleDesc(item)}
            />
          </div>
        ))}
      </div>
      {edit && <FormSelectDescriptions setShowForm={setEdit} />}
    </div>
  );
}

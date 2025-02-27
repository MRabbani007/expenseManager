import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormSelectDescriptions from "./FormSelectDescriptions";
import { useAppSelector } from "@/app/hooks";
import {
  selectSelectedDescriptions,
  selectUserDescriptions,
} from "../globals/globalsSlice";
import { Ellipsis } from "lucide-react";

interface Props {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
}

export default function CardTransDesc({ transaction, setTransaction }: Props) {
  const [edit, setEdit] = useState(false);

  const descriptions = useAppSelector(selectUserDescriptions);
  const selectedDescriptions = useAppSelector(selectSelectedDescriptions);

  const [activeDesc, setActiveDesc] = useState<Description[]>([]);

  useEffect(() => {
    const handleActiveDesc = () => {
      setActiveDesc(() => {
        if (!descriptions) return [];

        if (!selectedDescriptions || selectedDescriptions.length === 0) {
          return descriptions?.filter((item) => item?.isSelected === true);
        }

        return descriptions.filter((item) =>
          selectedDescriptions?.find((selDesc) => selDesc.id === item.id)
            ? true
            : false
        );
      });
    };

    handleActiveDesc();
  }, [descriptions, selectedDescriptions]);

  const handleDesc = (desc: Description) => {
    setTransaction((curr) => ({
      ...curr,
      category: desc.category,
      description: desc.value,
    }));
  };

  return (
    <div className="">
      <div
        title="Description"
        className="flex flex-wrap items-stretch gap-2 group/desc"
      >
        {activeDesc.map((item, index) => (
          <div key={index} className="">
            <img
              key={index}
              src={item?.icon}
              title={item.label}
              className={
                (transaction?.description === item.value
                  ? " bg-yellow-300"
                  : " bg-white") +
                " p-1 rounded-lg w-16 hover:scale-110 duration-200"
              }
              onClick={() => handleDesc(item)}
            />
          </div>
        ))}
        <button
          title="More options"
          onClick={() => setEdit(true)}
          type="button"
          className="flex items-center justify-center w-16 hover:scale-110 duration-200 invisible opacity-0 group-hover/desc:visible group-hover/desc:opacity-100  bg-white rounded-lg "
        >
          <Ellipsis size={30} />
        </button>
      </div>
      {edit && <FormSelectDescriptions setShowForm={setEdit} />}
    </div>
  );
}

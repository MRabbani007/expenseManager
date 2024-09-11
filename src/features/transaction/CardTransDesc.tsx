import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormSelectDescriptions from "./FormSelectDescriptions";
import { useAppSelector } from "@/app/hooks";
import {
  selectSelectedDescriptions,
  selectUserDescriptions,
} from "../globals/globalsSlice";
import { CircleEllipsis, Keyboard } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
}

type Status = "change" | "saved" | "disabled";

export default function CardTransDesc({ transaction, setTransaction }: Props) {
  const [edit, setEdit] = useState(false);

  const [showInput, setShowInput] = useState(false);
  const [customDesc, setCustomDesc] = useState<string | null>(null);

  const [status, setStatus] = useState<Status>("disabled");

  const descriptions = useAppSelector(selectUserDescriptions);
  const selectedDescriptions = useAppSelector(selectSelectedDescriptions);

  const [activeDesc, setActiveDesc] = useState<Description[]>([]);

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

  useEffect(() => {
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
      {/* <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold">Description</span>
      </div> */}
      <div
        title="Description"
        className="flex flex-wrap items-center gap-2 group"
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
                  : " bg-white") + " p-1 rounded-lg w-16"
              }
              onClick={() => handleDesc(item)}
            />
          </div>
        ))}
        <button
          title="Custom description"
          onClick={() => setShowInput((curr) => !curr)}
          className={
            (showInput ? "bg-yellow-300 " : "") + " p-2 rounded-lg w-16"
          }
        >
          <Keyboard size={30} className="mx-auto" />
        </button>
        <button
          title="More options"
          onClick={() => setEdit(true)}
          className="hover:scale-110 duration-200 invisible group-hover:visible"
        >
          <CircleEllipsis size={30} />
        </button>
      </div>
      {showInput ? (
        <div className="mt-4 space-y-4">
          <Input type="text" placeholder="Category" />
          <Input
            type="text"
            placeholder="Description"
            value={customDesc ?? ""}
            onChange={(e) => {
              setStatus("change");
              setCustomDesc(e.target.value);
            }}
          />
        </div>
      ) : null}
      {edit && <FormSelectDescriptions setShowForm={setEdit} />}
    </div>
  );
}

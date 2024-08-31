import { Slider, Slide } from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { DESCRIPTIONS } from "@/lib/data";
import { Description } from "@/types/type";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function FormSelectDescriptions({
  setShowForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [descriptions, setDescriptions] = useState<Description[]>(
    DESCRIPTIONS.filter((item) => item.selected === true)
  );

  const handleAdd = (desc: Description) => {
    setDescriptions((curr) => [
      desc,
      ...curr.filter((item) => item.value !== desc.value),
    ]);
  };

  const handleRemove = (desc: Description) => {
    setDescriptions((curr) => [
      ...curr.filter((item) => item.value !== desc.value),
    ]);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setShowForm(false);
  };

  const onReset = () => {
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-400/70">
      <div className="bg-zinc-50">
        <div className="flex items-center gap-2 py-2 px-4 bg-zinc-200">
          <p className="text-xl font-semibold mr-auto">Select Descriptions</p>
          <form onSubmit={onSubmit} onReset={onReset}>
            <Button variant="ghost" className="p-0">
              <BiCheck size={30} />
            </Button>
            <Button variant="ghost" className="p-0">
              <BiX size={30} />
            </Button>
          </form>
        </div>
        <Slider>
          <Slide title="Living">
            {DESCRIPTIONS.filter((item) => item.category === "housing").map(
              (item, index) => {
                const selected = !!descriptions.find(
                  (desc) => desc.value === item.value
                );
                return (
                  <CardDescription
                    key={index}
                    item={item}
                    selected={selected}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                  />
                );
              }
            )}
          </Slide>
          <Slide title="Bills">
            {DESCRIPTIONS.filter((item) => item.category === "bills").map(
              (item, index) => {
                const selected = !!descriptions.find(
                  (desc) => desc.value === item.value
                );
                return (
                  <CardDescription
                    key={index}
                    item={item}
                    selected={selected}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                  />
                );
              }
            )}
          </Slide>
        </Slider>
      </div>
    </div>
  );
}

function CardDescription({
  item,
  selected,
  handleAdd,
  handleRemove,
}: {
  item: Description;
  selected: boolean;
  handleAdd: (desc: Description) => void;
  handleRemove: (desc: Description) => void;
}) {
  return (
    <div className="group relative">
      <img
        src={item.image}
        alt=""
        title={item.label}
        className={
          (selected === true ? "bg-yellow-200" : "bg-slate-100") +
          " w-16 max-h-16 hover:bg-yellow-400 duration-300 rounded-lg cursor-pointer"
        }
      />
      <p className="invisible group-hover:visible">
        <FaTimes
          className="icon-sm text-red-600 absolute right-2 bottom-2 bg-slate-200"
          onClick={() => {
            handleRemove(item);
          }}
        />
        <FaCheck
          className="icon-sm text-green-600 absolute left-2 bottom-2 bg-slate-200"
          onClick={() => {
            handleAdd(item);
          }}
        />
      </p>
    </div>
  );
}

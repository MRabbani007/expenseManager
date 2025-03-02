import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Slider, Slide } from "@/components/Slider";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  selectSelectedDescriptions,
  selectUserCategories,
  selectUserDescriptions,
  setSelectedDescriptions,
} from "../globals/globalsSlice";
import { useUpdateUserDescriptionsMutation } from "../globals/globalsApiSlice";

export default function FormSelectDescriptions({
  setShowForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const [updateUserDescriptions] = useUpdateUserDescriptionsMutation();

  const descriptions = useAppSelector(selectUserDescriptions);
  const categories = useAppSelector(selectUserCategories);
  const selectedDescriptions = useAppSelector(selectSelectedDescriptions);

  const temp = categories
    ? Array.from(new Set(categories.map((item) => item.group)))
    : [];

  const groups = temp
    .map((item) => ({
      group: item,
      groupNo: categories?.find((cat) => cat.group === item)?.groupNo ?? 0,
      categories: categories
        ?.filter((cat) => cat.group === item)
        .map((cat) => cat.label),
    }))
    .sort((a, b) => ((a?.groupNo ?? 0) > (b.groupNo ?? 0) ? 1 : -1));

  const handleSelected = () => {
    setSelected(() => {
      if (!descriptions) return [];

      if (selectedDescriptions && selectedDescriptions?.length !== 0) {
        return descriptions.filter((item) =>
          selectedDescriptions?.find((selDesc) => selDesc.id === item.id)
            ? true
            : false
        );
      }

      return descriptions.filter((item) => item?.isSelected === true);
    });
  };

  const [selected, setSelected] = useState<Partial<Description>[]>([]);

  useEffect(() => {
    handleSelected();
  }, [descriptions, selectedDescriptions]);

  const handleAdd = (desc: Description) => {
    setSelected((curr) => [
      { id: desc.id, value: desc.value },
      ...curr.filter((item) => item.value !== desc.value),
    ]);
  };

  const handleRemove = (desc: Description) => {
    setSelected((curr) => [
      ...curr.filter((item) => item.value !== desc.value),
    ]);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(setSelectedDescriptions(selected));
    await updateUserDescriptions(selected);

    setShowForm(false);
  };

  const onReset = () => {
    setShowForm(false);
  };

  //  const t=  [{id: '3d987779-2e4a-40af-90a1-208567c33c2b', value: 'pharmacy'},
  // {id: '361620b0-5361-4ac6-809a-0daf1db7f584', value: 'mobile'},
  // {id: '1566e4fa-ff1a-40bb-9e04-6bed44968d91', value: 'scooter'},
  // {id: 'c0369910-09d8-4a3e-bc22-1842417e5070', value: 'bus'},
  // {id: 'ababe9fe-a7d7-4335-8e55-ebc575155834', value: 'taxi'},
  // {id: 'e5abf1c6-bb9a-4068-b626-6e6def4b7b00', value: 'shopping'},
  // {id: '26c833b8-18a1-4fb7-a5a2-7dcc4ce46e75', value: 'clothes'},
  // {id: '4542b9ea-b40d-46dd-88a2-ea61be3a8dbb', value: 'supermarket'},
  // {id: 'd214d651-cdcf-4939-9958-3bacbe8b4e24', value: 'magazine'},
  // {id: '25eb12ea-7cab-4b9e-a4e9-bed0ed5a1ca8', value: 'coffee'},
  // {id: '8cd9c07c-e03b-45f3-bb4a-6584ce302359', value: 'restaurant'},
  // {id: '346458b4-b709-412b-9890-8adc0bf99d40', value: 'car_wash'},
  // {id: 'e4d668d3-12e1-4fb9-85ef-889bf630904b', value: 'fuel'},
  // {id: 'ccc535ca-ed3a-42dd-a16e-f8ae4a5c71e5', value: 'rent'}]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/70 z-50">
      <div className="">
        <div className="flex items-center gap-2 py-2 px-4 bg-zinc-800 text-white rounded-t-lg">
          <p className="text-xl font-semibold mr-auto ">Select Descriptions</p>
          <form onSubmit={onSubmit} onReset={onReset}>
            <button>
              <BiCheck size={25} />
            </button>
            <button>
              <BiX size={25} />
            </button>
          </form>
        </div>
        <div className="bg-zinc-50">
          <Slider>
            {groups?.map((group, idx) => (
              <Slide title={group?.group ?? ""} key={idx}>
                {descriptions &&
                  descriptions
                    .filter((item) => group.categories?.includes(item.category))
                    .map((item, index) => {
                      const isSelected = !!selected.find(
                        (desc) => desc.value === item.value
                      );
                      return (
                        <CardDescription
                          key={index}
                          item={item}
                          selected={isSelected}
                          handleAdd={handleAdd}
                          handleRemove={handleRemove}
                        />
                      );
                    })}
              </Slide>
            ))}
          </Slider>
        </div>
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
        src={item.icon}
        alt=""
        title={item.label}
        className={
          (selected === true ? "bg-yellow-100" : "bg-slate-200") +
          " w-16 max-h-16 p-2 hover:bg-yellow-200 duration-300 rounded-lg cursor-pointer"
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

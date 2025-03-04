import ToolTip from "@/components/ToolTip";
import { Button } from "@/components/ui/button";
import {
  useGetCategoriesQuery,
  useGetDescriptionsQuery,
} from "@/features/admin/AdminApiSlice";
import FormAddDescription from "@/features/admin/FormAddDescription";
import FormEditDescription from "@/features/admin/FormEditDescription";
import { getIcon } from "@/lib/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

type CategoryGroup = { group: string; groupNo: number };

export default function AdminDescriptions() {
  const {
    data: categories,
    isLoading: isLoadingCat,
    isSuccess: isSuccessCat,
    isError: isErrorCat,
  } = useGetCategoriesQuery();

  const {
    data: descriptions,
    // isLoading: isLoadingDesc,
    // isSuccess: isSuccessDesc,
    // isError: isErrorDesc,
  } = useGetDescriptionsQuery();

  const [groups, setGoups] = useState<CategoryGroup[]>([]);

  const [add, setAdd] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Description | null>(null);

  useEffect(() => {
    const temp: CategoryGroup[] = [];
    Array.isArray(categories) &&
      categories.map((item) => {
        if (!temp.find((groupItem) => item.group === groupItem.group)) {
          temp.push({ groupNo: item?.groupNo ?? 0, group: item?.group ?? "" });
        }
      });
    temp.sort((a, b) => (a.groupNo > b.groupNo ? 1 : -1));
    setGoups(temp);
  }, [categories]);

  useEffect(() => {
    console.log("descriptions");
  }, [descriptions]);

  let content = null;
  let noCategory = null;
  if (isLoadingCat) {
    content = <p>Loading...</p>;
  } else if (isErrorCat) {
    content = <p>Error Loading Categories</p>;
  } else if (isSuccessCat) {
    content = groups.map((group) => (
      <div key={group.group} className="space-y-0 p-0">
        {/* <p className="space-x-2 font-medium mb-1">
          <span>{group?.groupNo}</span>
          <span>{group?.group}</span>
        </p> */}
        <div className="flex flex-col items-stretch flex-wrap gap-2">
          {categories
            .filter((category) => category?.group === group?.group)
            .map((category) => (
              <div key={category?.id} className="space-y-0 border-2 rounded-md">
                {/* Category Header */}
                <div className="flex items-stretch gap-2 p-4">
                  <div className="flex items-center gap-2">
                    {getIcon(category?.icon, 30)}
                  </div>
                  <div>
                    <p className="font-semibold text-xl">{category.label}</p>
                    <p className="font-mono text-sm font-semibold text-zinc-500 space-x-2">
                      {/* <span>{item?.groupNo?.toString() ?? null}</span> */}
                      <span>{category?.group}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-stretch flex-wrap gap-4 p-4 pt-0">
                  {descriptions
                    ?.filter((desc) => desc?.categoryID === category?.id)
                    .map((description) => (
                      <RenderDescription
                        key={description?.id}
                        description={description}
                        setEdit={setEdit}
                        setEditItem={setEditItem}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    ));
    noCategory = descriptions
      ?.filter(
        (item) => !categories?.find((cat) => item?.categoryID === cat?.id)
      )
      .map((description) => (
        <RenderDescription
          key={description?.id}
          description={description}
          setEdit={setEdit}
          setEditItem={setEditItem}
        />
      ));
  }

  return (
    <main>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Descriptions</h1>
        <Button onClick={() => setAdd(true)}>Add</Button>
      </header>
      <div className="flex flex-col gap-4">{content}</div>
      <p className="font-medium">No Categories</p>
      <div className="flex flex-wrap gap-4 items-stretch">{noCategory}</div>
      {add && <FormAddDescription setAdd={setAdd} />}
      {edit && editItem && (
        <FormEditDescription description={editItem} setEdit={setEdit} />
      )}
    </main>
  );
}

function RenderDescription({
  description,
  setEdit,
  setEditItem,
}: {
  description: Description;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Description | null>>;
}) {
  return (
    <div
      className={
        (description?.isSelected === true
          ? "bg-yellow-300/20"
          : "bg-zinc-100/20") +
        " p-2 rounded-lg flex flex-col gap-0 items-center relative group"
      }
      title={description?.label}
    >
      {description?.icon && description.icon !== "" ? (
        <ToolTip title={description?.label}>
          <img
            src={description.icon}
            alt="icon"
            className="w-12 h-12 object-contain"
          />
        </ToolTip>
      ) : (
        <p className="font-mono mt-auto text-sm font-semibold text-zinc-800">
          {description?.label}
        </p>
      )}
      <button
        className="absolute top-1 right-1 invisible group-hover:visible"
        onClick={() => {
          setEditItem(description);
          setEdit(true);
        }}
      >
        <CiEdit size={24} />
      </button>
    </div>
  );
}

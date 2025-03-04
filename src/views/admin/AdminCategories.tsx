import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/features/admin/AdminApiSlice";
import FormAddCategory from "@/features/admin/FormAddCategory";
import FormEditCategory from "@/features/admin/FormEditCategory";
import { getIcon } from "@/lib/icons";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

type CategoryGroup = { group: string; groupNo: number };

export default function AdminCategories() {
  const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery();

  const [add, setAdd] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Category | null>(null);

  const [groups, setGoups] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    const temp: CategoryGroup[] = [];
    Array.isArray(data) &&
      data.map((item) => {
        if (!temp.find((groupItem) => item.group === groupItem.group)) {
          temp.push({ groupNo: item?.groupNo ?? 0, group: item?.group ?? "" });
        }
      });
    temp.sort((a, b) => (a.groupNo > b.groupNo ? 1 : -1));
    setGoups(temp);
  }, [data]);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error Loading Categories</p>;
  } else if (isSuccess) {
    content = groups.map((group) => (
      <div key={group.group} className="space-y-2">
        <p className="space-x-2 font-medium mb-1">
          <span>{group?.groupNo}</span>
          <span>{group?.group}</span>
        </p>
        <div className="flex items-stretch flex-wrap gap-2">
          {data
            .filter((category) => category?.group === group?.group)
            .map((item) => (
              <div
                className="bg-zinc-200 p-4 rounded-lg flex flex-col gap-2 items-center relative group"
                key={item?.id}
                title={item.label}
              >
                {getIcon(item?.icon)}
                <p className="font-mono">{item?.label}</p>
                <button
                  className="absolute top-1 right-1 invisible group-hover:visible"
                  onClick={() => {
                    setEdit(true);
                    setEditItem(item);
                  }}
                >
                  <CiEdit size={24} />
                </button>
              </div>
            ))}
        </div>
      </div>
    ));
  }

  return (
    <main>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => setAdd(true)}>Add</Button>
      </header>
      <div className="flex flex-col gap-4">{content}</div>
      {add && <FormAddCategory setAdd={setAdd} />}
      {edit && editItem && (
        <FormEditCategory category={editItem} setEdit={setEdit} />
      )}
    </main>
  );
}

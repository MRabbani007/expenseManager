import { useGetCategoriesQuery } from "@/features/admin/AdminApiSlice";
import FormAddCategory from "@/features/admin/FormAddCategory";
import FormEditCategory from "@/features/admin/FormEditCategory";
import { ICONS } from "@/lib/data";
import { Category } from "@/types/type";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function AdminCategories() {
  const { data, isLoading, isSuccess, isError } = useGetCategoriesQuery();

  const [edit, setEdit] = useState<Category | null>(null);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error Loading Categories</p>;
  } else if (isSuccess) {
    // console.log(data);
    // const { ids, entities } = data;
    content = data.map((item: Category) => (
      <div
        className="bg-zinc-200 p-4 rounded-lg flex flex-col gap-2 items-center relative group"
        key={item?.id}
        title={item.label}
      >
        {{ ...ICONS[item.icon as keyof typeof ICONS] }}
        <p className="font-mono">{item?.label}</p>
        <button
          className="absolute top-1 right-1 invisible group-hover:visible"
          onClick={() => setEdit(item)}
        >
          <CiEdit size={24} />
        </button>
      </div>
    ));
  }

  return (
    <main>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <FormAddCategory />
      </header>
      <div className="flex items-stretch flex-wrap gap-2">{content}</div>
      {edit !== null ? (
        <FormEditCategory category={edit} setEdit={setEdit} />
      ) : null}
    </main>
  );
}

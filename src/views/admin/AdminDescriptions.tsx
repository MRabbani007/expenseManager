import {
  useGetCategoriesQuery,
  useGetDescriptionsQuery,
} from "@/features/admin/AdminApiSlice";
import FormAddDescription from "@/features/admin/FormAddDescription";
import FormEditDescription from "@/features/admin/FormEditDescription";
import { ICONS } from "@/lib/data";
import { Description } from "@/types/type";
import { ReactNode, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function AdminDescriptions() {
  const {
    data: categories,
    isLoading: isLoadingCat,
    isSuccess: isSuccessCat,
    isError: isErrorCat,
  } = useGetCategoriesQuery();

  const { data, isLoading, isSuccess, isError } = useGetDescriptionsQuery(null);

  const [edit, setEdit] = useState<Description | null>(null);

  let content: [{ cat: string; html: ReactNode }] | null = null;
  // if (isLoading) {
  //   content = <p>Loading...</p>;
  // } else if (isError) {
  //   content = <p>Error Loading Categories</p>;
  // } else

  if (isSuccess) {
    // console.log(data);
    // const { ids, entities } = data;
    content = data.map((item: Description) => ({
      cat: item.category,
      html: (
        <div
          className={
            (item?.isSelected === true
              ? "bg-yellow-300/20"
              : "bg-zinc-100/20") +
            " p-2 rounded-lg flex flex-col gap-0 items-center relative group"
          }
          key={item?.id}
          title={item.label}
        >
          {item?.icon && item.icon !== "" ? (
            <img
              src={item.icon}
              alt="icon"
              className="w-12 h-12 object-contain"
            />
          ) : null}
          <p className="font-mono mt-auto text-sm font-semibold text-zinc-800">
            {item?.label}
          </p>
          <button
            className="absolute top-1 right-1 invisible group-hover:visible"
            onClick={() => setEdit(item)}
          >
            <CiEdit size={24} />
          </button>
        </div>
      ),
    }));
  }

  const temp = categories
    ? [...categories].sort((a, b) =>
        (a?.groupNo ?? 0) > (b?.groupNo ?? 0) ? 1 : -1
      )
    : [];

  return (
    <main>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Descriptions</h1>
        <FormAddDescription />
      </header>
      <div className="flex flex-col gap-6">
        {temp.map((item, index) => (
          <div key={index} className="space-y-2">
            {/* Category Header */}
            <div className="flex items-stretch gap-2">
              <div className="flex items-center gap-2">
                {{ ...ICONS[item.icon as keyof typeof ICONS] }}
              </div>
              <div>
                <p className="font-semibold text-xl">{item.label}</p>
                <p className="font-mono text-sm font-semibold space-x-2">
                  {/* <span>{item?.groupNo?.toString() ?? null}</span> */}
                  <span>{item?.group}</span>
                </p>
              </div>
            </div>
            <div className="flex items-stretch flex-wrap gap-4">
              {isSuccess &&
                content &&
                content.map((block) => {
                  if (block.cat === item.label) {
                    return block.html;
                  }
                })}
            </div>
          </div>
        ))}
        <div className="flex items-stretch flex-wrap gap-4">
          {isSuccess &&
            content &&
            content
              .filter((block) =>
                categories?.find((cat) => cat.label === block.cat)
                  ? false
                  : true
              )
              .map((block: { cat: string; html: ReactNode }) => {
                return block.html;
              })}
        </div>
      </div>

      {edit !== null ? (
        <FormEditDescription description={edit} setEdit={setEdit} />
      ) : null}
    </main>
  );
}

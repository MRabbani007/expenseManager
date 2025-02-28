import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type BankCardProps = {
  cardDetails: AccountInfo;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<AccountInfo | null>>;
  className?: string;
};

export default function BankCard({
  setEdit,
  setEditItem,
  cardDetails,
  className = "from-green-700 to-green-950",
}: BankCardProps) {
  const formattedDate =
    cardDetails?.expDate &&
    new Date(cardDetails?.expDate).toLocaleDateString("en-US", {
      month: "2-digit",
      year: "2-digit",
    });

  const color =
    cardDetails?.color === "green"
      ? "from-green-700 to-green-950"
      : cardDetails?.color === "red"
      ? "from-red-700 to-red-950"
      : cardDetails?.color === "blue"
      ? "from-blue-700 to-sky-950"
      : "from-stone-700 to-zinc-950";

  return (
    <div
      className={cn(
        `h-[180px] text-white flex flex-col bg-gradient-to-br rounded-xl font-mono py-4 px-4 shadow-lg shadow-zinc-400 aspect-video duration-200 ease-linear `,
        className,
        color
      )}
    >
      <div className="text-xl ml-2 mb-auto font-semibold">
        {cardDetails.bank}
      </div>
      {/* <div>{currency + " " + income.toLocaleString("en-US")}</div> */}

      <div className="mt-2 flex justify-between items-center">
        <div className="">
          <button
            onClick={() => {
              setEdit(true);
              setEditItem(cardDetails);
            }}
            className="text-white flex items-center gap-4 mt-2 justify-between"
          >
            {cardDetails?.nameOnCard}
          </button>
          <p className="font-mono text-xl">
            **** **** **** {cardDetails?.masked}
          </p>
        </div>
        <div className="relative z-0 h-10 w-14">
          <div className="w-full h-full bg-gradient-to-br from-zinc-100/10 to-zinc-100/20 rounded-lg" />
          <p className="w-6 h-6 rounded-full bg-red-600 -z-10 absolute top-2 left-1/2 -translate-x-1/4" />
          <p className="w-6 h-6 rounded-full bg-yellow-400 -z-20 absolute top-2 left-1/2 -translate-x-3/4" />
        </div>
      </div>
      <div className="text-sm">{formattedDate}</div>
    </div>
  );
}

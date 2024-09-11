import { cn } from "@/lib/utils";

export default function BankCard({
  cardDetails,
  className = "from-green-700 to-green-950",
}: BankCardProps) {
  return (
    <div
      className={cn(
        `h-[180px] text-white flex flex-col bg-gradient-to-br rounded-xl font-mono py-4 px-4 shadow-lg shadow-zinc-400 aspect-video duration-200 ease-linear `,
        className
      )}
    >
      <div className="text-xl ml-2 mb-auto font-semibold">
        {cardDetails.bank}
      </div>
      {/* <div>{currency + " " + income.toLocaleString("en-US")}</div> */}

      <div className="mt-2 flex justify-between items-center">
        <div className="">
          <div className="text-white flex items-center gap-4 mt-2 justify-between">
            {/* <span className="font-semibold">Income:</span> */}
            <span>{cardDetails.nameOnCard}</span>
          </div>
          <p className="font-mono text-xl">
            **** **** **** {cardDetails.masked}
          </p>
        </div>
        <div className="relative z-0 h-10 w-14">
          <div className="w-full h-full bg-gradient-to-br from-zinc-100/10 to-zinc-100/20 rounded-lg" />
          <p className="w-6 h-6 rounded-full bg-red-600 -z-10 absolute top-2 left-1/2 -translate-x-1/4" />
          <p className="w-6 h-6 rounded-full bg-yellow-400 -z-20 absolute top-2 left-1/2 -translate-x-3/4" />
        </div>
      </div>
      <div className="text-sm">{cardDetails.expDate}</div>
    </div>
  );
}

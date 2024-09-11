import { cn } from "@/lib/utils";

export default function CardPayMethod({
  title,
  name,
  className = "from-green-700 to-green-950",
}: {
  title: string;
  name: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        `h-[180px] w-[300px] text-white flex flex-col bg-gradient-to-br  rounded-xl font-mono py-6 px-4 shadow-lg shadow-zinc-400`,
        className
      )}
    >
      <div className="text-xl ml-2 mb-auto">{title}</div>
      {/* <div>{currency + " " + income.toLocaleString("en-US")}</div> */}
      <div className="mt-2 flex justify-between items-start">
        <span>**** **** **** 1212</span>
        <div className="relative z-0">
          <p className="w-6 h-6 rounded-full bg-red-600 z-10" />
          <p className="w-6 h-6 rounded-full bg-yellow-400 z-0 absolute top-0 right-1/2" />
        </div>
      </div>
      <div className="text-white flex items-center gap-4 mt-2 justify-between">
        {/* <span className="font-semibold">Income:</span> */}
        <span>{name}</span>
        <div>{"10/24"}</div>
      </div>
    </div>
  );
}

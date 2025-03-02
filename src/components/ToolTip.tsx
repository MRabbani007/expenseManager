import { ReactNode } from "react";

export default function ToolTip({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="relative group/tooltip">
      {children}
      <span className="absolute top-full z-10 left-1/2 -translate-x-1/2 duration-200 py-1 px-2 text-sm text-nowrap bg-zinc-100 rounded-md invisible opacity-0 -translate-y-2 group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0">
        {title}
      </span>
    </div>
  );
}

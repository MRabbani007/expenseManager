import { LucideUser2 } from "lucide-react";
import React from "react";

export default function ProfilePage() {
  return (
    <main>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <LucideUser2 size={30} />
        <h1 className="font-bold text-2xl">Profile</h1>
      </header>
    </main>
  );
}

import BankCard from "@/components/BankCard";
import FormAddAccount from "@/features/cards/FormAddAccount";
import { Button } from "@/components/ui/button";
import { Banknote, CreditCard, GraduationCap, PiggyBank } from "lucide-react";
import { useEffect, useState } from "react";
import { useLazyGetAccountsQuery } from "@/features/cards/accountSlice";
import { getIcon } from "@/lib/icons";
import FormEditAccount from "@/features/cards/FormEditAccount";

const temp = { icon: GraduationCap };

// const CARD: BankCard = {
//   id: "asd",
//   bank: "Halyk Bank",
//   nameOnCard: "Mohamad Rabbani",
//   expDate: new Date("01-01-09"),
//   masked: "1234",
// };

export default function CardsPage() {
  const [getAccounts, { data, isLoading, isSuccess, isError }] =
    useLazyGetAccountsQuery();
  const [add, setAdd] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<AccountInfo | null>(null);

  useEffect(() => {
    getAccounts(null);
  }, []);

  let cardsContent = null;
  let cashContent = null;
  let savingsContent = null;

  if (isLoading) {
    cardsContent = <p>Loading...</p>;
    cashContent = <p>Loading...</p>;
    savingsContent = <p>Loading...</p>;
  } else if (isError) {
    cardsContent = <p>Error Loading Data</p>;
    cashContent = <p>Error Loading Data</p>;
    savingsContent = <p>Error Loading Data</p>;
  } else if (isSuccess) {
    cardsContent = data.data
      .filter((item) => item.type === "card")
      .map((item) => (
        <BankCard
          key={item.id}
          cardDetails={item}
          setEdit={setEdit}
          setEditItem={setEditItem}
        />
      ));
    cashContent = data.data
      .filter((item) => item.type === "cash")
      .map((item) => (
        <div
          key={item.id}
          onClick={() => {
            setEdit(true);
            setEditItem(item);
          }}
          className="flex flex-col items-center gap-2 bg-zinc-100 rounded-lg py-2 px-6"
        >
          {item?.icon && getIcon(item.icon)}
          <p className="font-semibold text-mono">{item?.name}</p>
        </div>
      ));
    savingsContent = data.data
      .filter((item) => item.type === "savings")
      .map((item) => (
        <div
          key={item.id}
          onClick={() => {
            setEdit(true);
            setEditItem(item);
          }}
          className="flex flex-col items-center gap-2 bg-zinc-100 rounded-lg py-2 px-6"
        >
          {item?.icon && getIcon(item.icon)}
          <p className="font-semibold text-mono">{item?.name}</p>
        </div>
      ));
  }

  return (
    <main>
      <header className="flex items-stretch gap-2">
        <CreditCard size={30} />
        <div className="flex-1">
          <h1 className="font-semibold text-xl">Accounts & Cards</h1>
          <p className="text-sm">View & manage your accounts</p>
        </div>
        <Button onClick={() => setAdd(true)}>Add</Button>
      </header>
      {add ? <FormAddAccount setAdd={setAdd} /> : null}
      {false && <temp.icon size={30} />}
      <div className="flex flex-wrap items-center gap-4">
        {cardsContent}
        {/* <BankCard cardDetails={CARD} className="from-green-700 to-green-950" /> */}
      </div>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <Banknote size={30} />
        <h2 className="font-bold text-2xl">Cash</h2>
      </header>
      <div className="flex flex-wrap items-stretch gap-2">{cashContent}</div>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <PiggyBank size={30} />
        <h2 className="font-bold text-2xl">Savings</h2>
      </header>
      <div className="flex flex-wrap items-stretch gap-2">{savingsContent}</div>
      {edit && editItem && (
        <FormEditAccount accountInfo={editItem} setEdit={setEdit} />
      )}
    </main>
  );
}

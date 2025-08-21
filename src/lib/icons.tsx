import {
  Apple,
  Banknote,
  Bike,
  Car,
  CarTaxiFront,
  Clapperboard,
  Coins,
  Drama,
  Ellipsis,
  GraduationCap,
  House,
  PaintRoller,
  Plane,
  ReceiptText,
  Repeat,
  School,
  ShoppingBag,
  ShoppingCart,
  Stethoscope,
  Store,
  Wallet,
} from "lucide-react";

export function getIcon(iconName: string, size: number = 25) {
  switch (iconName) {
    case "cash":
      return <Banknote size={size} />;
    case "wallet":
      return <Wallet size={size} />;
    case "coins":
      return <Coins size={size} />;
    case "college":
      return <GraduationCap size={size} />;
    case "remont":
      return <PaintRoller size={size} />;
    case "others":
      return <Ellipsis size={size} />;
    case "apple":
      return (
        <div className="p-2 bg-gradient-to-br from-red-700 to-red-800 text-white rounded-md shadow-md shadow-zinc-600">
          <Apple size={size} />
        </div>
      );
    case "bike":
      return (
        <div className="p-2 bg-gradient-to-br from-lime-500 to-lime-700 text-white rounded-md shadow-md shadow-zinc-600">
          <Bike size={size} />
        </div>
      );
    case "car":
      return (
        <div className="p-2 bg-gradient-to-br from-amber-800 to-amber-950 text-white rounded-md shadow-md shadow-zinc-600">
          <Car size={size} />
        </div>
      );
    case "carTaxiFront":
      return (
        <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-md shadow-md shadow-zinc-600">
          <CarTaxiFront size={size} />
        </div>
      );
    case "clapperBoard":
      return (
        <div className="p-2 bg-gradient-to-br from-stone-500 to-stone-700 text-white rounded-md shadow-md shadow-zinc-600">
          <Clapperboard size={size} />
        </div>
      );
    case "drama":
      return (
        <div className="p-2 bg-gradient-to-br from-purple-700 to-purple-950 text-white rounded-md shadow-md shadow-zinc-600">
          <Drama size={size} />
        </div>
      );
    case "ellipsis":
      return (
        <div className="p-2 bg-gradient-to-br from-slate-500 to-slate-900 text-white rounded-md shadow-md shadow-zinc-600">
          <Ellipsis size={size} />
        </div>
      );
    case "house":
      return (
        <div className="p-2 bg-gradient-to-br from-green-800 to-green-950 text-white rounded-md shadow-md shadow-zinc-600">
          <House size={size} />
        </div>
      );
    case "plane":
      return <Plane size={size} />;
    case "receiptText":
      return (
        <div className="p-2 bg-gradient-to-br from-stone-500 to-stone-700 text-white rounded-md shadow-md shadow-zinc-600">
          <ReceiptText size={size} />
        </div>
      );
    case "repeat":
      return (
        <div className="p-2 bg-gradient-to-br from-stone-500 to-stone-700 text-white rounded-md shadow-md shadow-zinc-600">
          <Repeat size={size} />
        </div>
      );
    case "school":
      return (
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-md shadow-md shadow-zinc-600">
          <School size={size} />
        </div>
      );
    case "shoppingBag":
      return (
        <div className="p-2 bg-gradient-to-br from-sky-800 to-sky-950 text-white rounded-md shadow-md shadow-zinc-600">
          <ShoppingBag size={size} />
        </div>
      );
    case "shoppingCart":
      return <ShoppingCart size={size} />;
    case "store":
      return (
        <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-md shadow-md shadow-zinc-600">
          <Store size={size} />
        </div>
      );
    case "stethoscope":
      return (
        <div className="p-2 bg-gradient-to-br from-red-400 to-red-500 text-white rounded-md shadow-md shadow-zinc-600">
          <Stethoscope size={size} />
        </div>
      );
    default:
      return null;
  }
}

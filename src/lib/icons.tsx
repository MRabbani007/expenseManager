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
      return <Apple size={size} />;
    case "bike":
      return <Bike size={size} />;
    case "car":
      return <Car size={size} />;
    case "carTaxiFront":
      return <CarTaxiFront size={size} />;
    case "clapperBoard":
      return <Clapperboard size={size} />;
    case "drama":
      return <Drama size={size} />;
    case "ellipsis":
      return <Ellipsis size={size} />;
    case "house":
      return <House size={size} />;
    case "plane":
      return <Plane size={size} />;
    case "receiptText":
      return <ReceiptText size={size} />;
    case "repeat":
      return <Repeat size={size} />;
    case "school":
      return <School size={size} />;
    case "shoppingBag":
      return <ShoppingBag size={size} />;
    case "shoppingCart":
      return <ShoppingCart size={size} />;
    case "store":
      return <Store size={size} />;
    case "stethoscope":
      return <Stethoscope size={size} />;
    default:
      return null;
  }
}

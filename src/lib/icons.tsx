import {
  Banknote,
  Coins,
  Ellipsis,
  GraduationCap,
  PaintRoller,
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
    default:
      return null;
  }
}

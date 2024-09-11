import { Description } from "@/types/type";
import {
  Apple,
  Bike,
  Car,
  CarTaxiFront,
  Clapperboard,
  Drama,
  Ellipsis,
  House,
  Plane,
  ReceiptText,
  Repeat,
  School,
  ShoppingBag,
  ShoppingCart,
  Stethoscope,
  Store,
} from "lucide-react";

const ICON_SIZE = 30;

export const DESCRIPTIONS: Description[] = [
  {
    category: "housing",
    isSelected: false,
    label: "house",
    value: "house",
    icon: "icons/house_house.png",
  },
  {
    category: "housing",
    isSelected: false,
    label: "build",
    value: "build",
    icon: "icons/house_construction.png",
  },
  {
    category: "housing",
    isSelected: false,
    label: "remont",
    value: "remont",
    icon: "icons/house_remont.png",
  },
  {
    category: "housing",
    isSelected: false,
    label: "cleaning",
    value: "cleaning",
    icon: "icons/house_cleaning.png",
  },
  {
    category: "housing",
    isSelected: false,
    label: "decoration",
    value: "decoration",
    icon: "icons/house_decoration.png",
  },
  {
    category: "housing",
    isSelected: false,
    label: "garden",
    value: "garden",
    icon: "icons/house_garden.png",
  },
  {
    category: "housing",
    isSelected: false,
    label: "tv",
    value: "tv",
    icon: "icons/house_tv.png",
  },
  {
    category: "housing",
    isSelected: false,
    label: "fridge",
    value: "fridge",
    icon: "icons/house_fridge.png",
  },
  {
    category: "car",
    isSelected: false,
    label: "car",
    value: "car",
    icon: "icons/car_car.png",
  },
  {
    category: "car",
    isSelected: false,
    label: "",
    value: "fuel",
    icon: "icons/car_fuel.png",
  },
  {
    category: "bills",
    isSelected: false,
    label: "electricity",
    value: "electricity",
    icon: "icons/bills_electricity.png",
  },
  {
    category: "bills",
    isSelected: false,
    label: "",
    value: "water",
    icon: "icons/bills_water.png",
  },
  {
    category: "bills",
    isSelected: false,
    label: "phone",
    value: "phone",
    icon: "icons/bills_phone.png",
  },
  {
    category: "bills",
    isSelected: false,
    label: "",
    value: "mobile",
    icon: "icons/bills_mobile.png",
  },
  {
    category: "bills",
    isSelected: false,
    label: "satelite",
    value: "satelite",
    icon: "icons/bills_tv.png",
  },
  {
    category: "bills",
    isSelected: false,
    label: "",
    value: "trash",
    icon: "icons/bills_trash.png",
  },
  {
    category: "office",
    isSelected: false,
    label: "office",
    value: "office",
    icon: "icons/office.png",
  },
  {
    category: "office",
    isSelected: false,
    label: "laptop",
    value: "laptop",
    icon: "icons/office_laptop.png",
  },
  {
    category: "office",
    isSelected: false,
    label: "printing",
    value: "printing",
    icon: "icons/office_printing.png",
  },

  {
    category: "housing",
    isSelected: true,
    label: "house",
    value: "house",
    icon: "icons/house_house.png",
  },
  {
    category: "market",
    isSelected: true,
    label: "market",
    value: "market",
    icon: "icons/market_market.png",
  },
  {
    category: "market",
    isSelected: true,
    label: "supermarket",
    value: "supermarket",
    icon: "icons/market_grocerries.png",
  },
  {
    category: "food",
    isSelected: true,
    label: "food",
    value: "food",
    icon: "icons/food.png",
  },
  {
    category: "food",
    isSelected: true,
    label: "coffee",
    value: "coffee",
    icon: "icons/food_coffee.png",
  },
  {
    category: "cigarettes",
    isSelected: true,
    label: "electronic cigarette",
    value: "electronic cigarette",
    icon: "icons/cigarettes_electronic.png",
  },
  {
    category: "shopping",
    isSelected: true,
    label: "clothes",
    value: "clothes",
    icon: "icons/shopping_clothes.png",
  },
  {
    category: "medical",
    isSelected: true,
    label: "medicine",
    value: "medicine",
    icon: "icons/medical_medicine.png",
  },
  {
    category: "medical",
    isSelected: true,
    label: "dentist",
    value: "dentist",
    icon: "icons/medical_dentist.png",
  },
  {
    category: "transport",
    isSelected: true,
    label: "taxi",
    value: "taxi",
    icon: "icons/transport_taxi.png",
  },
];

export const CATEGORIES = [
  { id: 1, label: "House", value: "house", icon: <House size={ICON_SIZE} /> },
  { id: 1, label: "Car", value: "car", icon: <Car size={ICON_SIZE} /> },
  { id: 2, label: "Food", value: "food", icon: <Apple size={ICON_SIZE} /> },
  {
    id: 3,
    label: "Shopping",
    value: "shopping",
    icon: <ShoppingBag size={ICON_SIZE} />,
  },
  {
    id: 3,
    label: "Transport",
    value: "transport",
    icon: <CarTaxiFront size={ICON_SIZE} />,
  },
  {
    id: 4,
    label: "Medical",
    value: "medical",
    icon: <Stethoscope size={ICON_SIZE} />,
  },
  {
    id: 1,
    label: "Education",
    value: "education",
    icon: <School size={ICON_SIZE} />,
  },
  { id: 1, label: "Sports", value: "sports", icon: <Bike size={ICON_SIZE} /> },
  {
    id: 1,
    label: "Entertainment",
    value: "entertainment",
    icon: <Drama size={ICON_SIZE} />,
  },
  {
    id: 1,
    label: "Travel & Tourism",
    value: "travel_tourism",
    icon: <Plane size={ICON_SIZE} />,
  },
  {
    id: 5,
    label: "Bills & Payments",
    value: "bills_payments",
    icon: <ReceiptText size={ICON_SIZE} />,
  },
  {
    id: 5,
    label: "Transfer",
    value: "transfer",
    icon: <Repeat size={ICON_SIZE} />,
  },
  {
    id: 5,
    label: "Other",
    value: "other",
    icon: <Ellipsis size={ICON_SIZE} />,
  },
];

export const ICONS = {
  apple: <Apple size={ICON_SIZE} />,
  bike: <Bike size={ICON_SIZE} />,
  car: <Car size={ICON_SIZE} />,
  carTaxiFront: <CarTaxiFront size={ICON_SIZE} />,
  clapperBoard: <Clapperboard size={ICON_SIZE} />,
  drama: <Drama size={ICON_SIZE} />,
  ellipsis: <Ellipsis size={ICON_SIZE} />,
  house: <House size={ICON_SIZE} />,
  plane: <Plane size={ICON_SIZE} />,
  receiptText: <ReceiptText size={ICON_SIZE} />,
  repeat: <Repeat size={ICON_SIZE} />,
  school: <School size={ICON_SIZE} />,
  shoppingBag: <ShoppingBag size={ICON_SIZE} />,
  shoppingCart: <ShoppingCart size={ICON_SIZE} />,
  store: <Store size={ICON_SIZE} />,
  stethoscope: <Stethoscope size={ICON_SIZE} />,
};

export const CURRENCY_OBJ = {
  KZT: "images/currency/tenge.png",
  RUB: "images/currency/ruble.png",
  USD: "images/currency/dollar.png",
  EUR: "images/currency/euro.png",
};

export const TYPE_OBJ = {
  income: "images/income.png",
  expense: "images/expense.png",
};

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
  Stethoscope,
} from "lucide-react";

const ICON_SIZE = 40;

export const DESCRIPTIONS: Description[] = [
  {
    category: "housing",
    selected: false,
    label: "house",
    value: "house",
    image: "icons/house_house.png",
  },
  {
    category: "housing",
    selected: false,
    label: "build",
    value: "build",
    image: "icons/house_construction.png",
  },
  {
    category: "housing",
    selected: false,
    label: "remont",
    value: "remont",
    image: "icons/house_remont.png",
  },
  {
    category: "housing",
    selected: false,
    label: "cleaning",
    value: "cleaning",
    image: "icons/house_cleaning.png",
  },
  {
    category: "housing",
    selected: false,
    label: "decoration",
    value: "decoration",
    image: "icons/house_decoration.png",
  },
  {
    category: "housing",
    selected: false,
    label: "garden",
    value: "garden",
    image: "icons/house_garden.png",
  },
  {
    category: "housing",
    selected: false,
    label: "tv",
    value: "tv",
    image: "icons/house_tv.png",
  },
  {
    category: "housing",
    selected: false,
    label: "fridge",
    value: "fridge",
    image: "icons/house_fridge.png",
  },
  {
    category: "car",
    selected: false,
    label: "car",
    value: "car",
    image: "icons/car_car.png",
  },
  {
    category: "car",
    selected: false,
    label: "",
    value: "fuel",
    image: "icons/car_fuel.png",
  },
  {
    category: "bills",
    selected: false,
    label: "electricity",
    value: "electricity",
    image: "icons/bills_electricity.png",
  },
  {
    category: "bills",
    selected: false,
    label: "",
    value: "water",
    image: "icons/bills_water.png",
  },
  {
    category: "bills",
    selected: false,
    label: "phone",
    value: "phone",
    image: "icons/bills_phone.png",
  },
  {
    category: "bills",
    selected: false,
    label: "",
    value: "mobile",
    image: "icons/bills_mobile.png",
  },
  {
    category: "bills",
    selected: false,
    label: "satelite",
    value: "satelite",
    image: "icons/bills_tv.png",
  },
  {
    category: "bills",
    selected: false,
    label: "",
    value: "trash",
    image: "icons/bills_trash.png",
  },
  {
    category: "office",
    selected: false,
    label: "office",
    value: "office",
    image: "icons/office.png",
  },
  {
    category: "office",
    selected: false,
    label: "laptop",
    value: "laptop",
    image: "icons/office_laptop.png",
  },
  {
    category: "office",
    selected: false,
    label: "printing",
    value: "printing",
    image: "icons/office_printing.png",
  },

  {
    category: "housing",
    selected: true,
    label: "house",
    value: "house",
    image: "icons/house_house.png",
  },
  {
    category: "market",
    selected: true,
    label: "market",
    value: "market",
    image: "icons/market_market.png",
  },
  {
    category: "market",
    selected: true,
    label: "supermarket",
    value: "supermarket",
    image: "icons/market_grocerries.png",
  },
  {
    category: "food",
    selected: true,
    label: "food",
    value: "food",
    image: "icons/food.png",
  },
  {
    category: "food",
    selected: true,
    label: "coffee",
    value: "coffee",
    image: "icons/food_coffee.png",
  },
  {
    category: "cigarettes",
    selected: true,
    label: "electronic cigarette",
    value: "electronic cigarette",
    image: "icons/cigarettes_electronic.png",
  },
  {
    category: "shopping",
    selected: true,
    label: "clothes",
    value: "clothes",
    image: "icons/shopping_clothes.png",
  },
  {
    category: "medical",
    selected: true,
    label: "medicine",
    value: "medicine",
    image: "icons/medical_medicine.png",
  },
  {
    category: "medical",
    selected: true,
    label: "dentist",
    value: "dentist",
    image: "icons/medical_dentist.png",
  },
  {
    category: "transport",
    selected: true,
    label: "taxi",
    value: "taxi",
    image: "icons/transport_taxi.png",
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

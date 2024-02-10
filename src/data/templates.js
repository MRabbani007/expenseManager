// Payments
import IMG_Payment_cash from "../assets/icons/payment_cash.png";
import IMG_Payment_card from "../assets/icons/payment_card.png";
import IMG_Payment_coins from "../assets/icons/payment_coins.png";
import IMG_Payment_expense from "../assets/icons/payment_expense.png";
// Home
import IMG_house_house from "../assets/icons/house_house.png";
import IMG_house_cleaning from "../assets/icons/house_cleaning.png";
import IMG_house_construction from "../assets/icons/house_construction.png";
import IMG_house_decoration from "../assets/icons/house_decoration.png";
import IMG_house_fridge from "../assets/icons/house_fridge.png";
import IMG_house_garden from "../assets/icons/house_garden.png";
import IMG_house_remont from "../assets/icons/house_remont.png";
import IMG_house_tv from "../assets/icons/house_tv.png";
// Car
import IMG_Car_car from "../assets/icons/car_car.png";
import IMG_Car_fuel from "../assets/icons/car_fuel.png";
// Bills
import IMG_Bills_mobile from "../assets/icons/bills_mobile.png";
import IMG_Bills_phone from "../assets/icons/bills_phone.png";
import IMG_Bills_electricity from "../assets/icons/bills_electricity.png";
import IMG_Bills_water from "../assets/icons/bills_water.png";
import IMG_Bills_tv from "../assets/icons/bills_tv.png";
import IMG_Bills_trash from "../assets/icons/bills_trash.png";
// Family
import IMG_Family_child from "../assets/icons/family_child.png";
// Education
import IMG_Education_books from "../assets/icons/education_books.png";
import IMG_Education_stationary from "../assets/icons/education_stationary.png";
// Office
import IMG_Office from "../assets/icons/office.png";
import IMG_Office_printing from "../assets/icons/office_printing.png";
import IMG_Office_laptop from "../assets/icons/office_laptop.png";
// Shopping
import IMG_Shopping_general from "../assets/icons/shopping_1.png";
import IMG_Shopping_clothes from "../assets/icons/shopping_clothes.png";
import IMG_Shopping_cosmetics from "../assets/icons/shopping_cosmetics.png";
import IMG_Shopping_electronics from "../assets/icons/shopping_electronics.png";
import IMG_Shopping_jewelery from "../assets/icons/shopping_jewelery.png";
// Medical
import IMG_Medical_medicine from "../assets/icons/medical_medicine.png";
import IMG_Medical_doctor from "../assets/icons/medical_doctor.png";
import IMG_Medical_nursing from "../assets/icons/medical_nursing.png";
import IMG_Medical_dentist from "../assets/icons/medical_dentist.png";
import IMG_Medical_hospital from "../assets/icons/medical_hospital.png";
import IMG_Medical_vet from "../assets/icons/medical_vet.png";
import IMG_Medical_ambulance from "../assets/icons/medical_ambulance.png";
// Market
import IMG_Market_market from "../assets/icons/market_market.png";
import IMG_Market_supermarket from "../assets/icons/market_grocerries.png";
// Entertainment
import IMG_Entertainment_cinema from "../assets/icons/entertainment_cinema.png";
import IMG_Entertainment_movies from "../assets/icons/entertainment_movies.png";
// Subscriptions
import IMG_Subs_appletv from "../assets/icons/subs_appletv.png";
import IMG_Subs_music from "../assets/icons/subs_music.png";
import IMG_Subs_youtube from "../assets/icons/subs_youtube.png";
import IMG_Subs_netflix from "../assets/icons/subs_netflix.png";
// Transport
import IMG_Transport_bus from "../assets/icons/ticket_bus.png";
import IMG_Transport_taxi from "../assets/icons/transport_taxi.png";
import IMG_Transport_bike from "../assets/icons/transport_bike.png";
import IMG_Transport_scooter from "../assets/icons/transport_scooter.png";
import IMG_Transport_delivery from "../assets/icons/transport_delivery.png";
// Food
import IMG_Food_restaurant from "../assets/icons/food_restaurant.png";
import IMG_Food_fruits from "../assets/icons/food_fruits.png";
import IMG_Food_sweats from "../assets/icons/food_sweats.png";
import IMG_Food_coffee from "../assets/icons/food_coffee.png";
import IMG_Food_tea from "../assets/icons/food_tea.png";
import IMG_Food_food from "../assets/icons/food.png";
// Cigarrettes
import IMG_Cigarettes_cigar from "../assets/icons/cigarettes_cigar.png";
import IMG_Cigarettes_electronics from "../assets/icons/cigarettes_electronic.png";
import IMG_Cigarettes_iqos from "../assets/icons/cigarettes_iqos.png";
import IMG_Cigarettes_lighter from "../assets/icons/cigarettes_lighter.png";
import IMG_Cigarettes_tobaco from "../assets/icons/cigarettes_tobaco.png";

// import IMG_coffee from "../assets/icons/coffee.png";
// import IMG_supermarket from "../assets/icons/supermarket.png";
// import IMG_restaurant from "../assets/icons/restaurant-2.png";
// import IMG_cigarette from "../assets/icons/cigarette.png";
// import IMG_pharmacy from "../assets/icons/pharmacy.png";
// import IMG_hospital from "../assets/icons/hospital.png";
// import IMG_clothes from "../assets/icons/clothes.png";
// import IMG_taxi from "../assets/icons/taxi.png";
// import IMG_ticket_plane from "../assets/icons/ticket-plane.png";
// import IMG_ticket_train from "../assets/icons/ticket-train.png";
// import IMG_ticket_bus from "../assets/icons/ticket-bus.png";
// import IMG_documents from "../assets/icons/documents.png";
// import IMG_flower from "../assets/icons/flower.png";

import { BsShop } from "react-icons/bs";
import { SiShopee } from "react-icons/si";

export const expenseDesc_living = [
  {
    category: "housing",
    selected: true,
    name: "house",
    image: IMG_house_house,
  },
  {
    category: "housing",
    selected: true,
    name: "build",
    image: IMG_house_construction,
  },
  {
    category: "housing",
    selected: true,
    name: "remont",
    image: IMG_house_remont,
  },
  {
    category: "housing",
    selected: true,
    name: "cleaning",
    image: IMG_house_cleaning,
  },
  {
    category: "housing",
    selected: true,
    name: "decoration",
    image: IMG_house_decoration,
  },
  {
    category: "housing",
    selected: true,
    name: "garden",
    image: IMG_house_garden,
  },
  { category: "housing", selected: true, name: "tv", image: IMG_house_tv },
  {
    category: "housing",
    selected: true,
    name: "fridge",
    image: IMG_house_fridge,
  },
  { category: "car", selected: true, name: "car", image: IMG_Car_car },
  { category: "car", selected: true, name: "fuel", image: IMG_Car_fuel },
  {
    category: "bills",
    selected: true,
    name: "electricity",
    image: IMG_Bills_electricity,
  },
  { category: "bills", selected: true, name: "water", image: IMG_Bills_water },
  { category: "bills", selected: true, name: "phone", image: IMG_Bills_phone },
  {
    category: "bills",
    selected: true,
    name: "mobile",
    image: IMG_Bills_mobile,
  },
  { category: "bills", selected: true, name: "satelite", image: IMG_Bills_tv },
  { category: "bills", selected: true, name: "trash", image: IMG_Bills_trash },
  { category: "office", selected: true, name: "office", image: IMG_Office },
  {
    category: "office",
    selected: true,
    name: "laptop",
    image: IMG_Office_laptop,
  },
  {
    category: "office",
    selected: true,
    name: "printing",
    image: IMG_Office_printing,
  },
];

export const expenseDesc_food = [
  {
    category: "market",
    selected: true,
    name: "market",
    image: IMG_Market_market,
  },
  {
    category: "market",
    selected: true,
    name: "supermarket",
    image: IMG_Market_supermarket,
  },
  { category: "food", selected: true, name: "food", image: IMG_Food_food },
  {
    category: "food",
    selected: true,
    name: "restaurant",
    image: IMG_Food_restaurant,
  },
  { category: "food", selected: true, name: "fruits", image: IMG_Food_fruits },
  { category: "food", selected: true, name: "sweats", image: IMG_Food_sweats },
  { category: "food", selected: true, name: "coffee", image: IMG_Food_coffee },
  { category: "food", selected: true, name: "tea", image: IMG_Food_tea },
  {
    category: "cigarettes",
    selected: true,
    name: "cigar",
    image: IMG_Cigarettes_cigar,
  },
  {
    category: "cigarettes",
    selected: true,
    name: "electronic cigarette",
    image: IMG_Cigarettes_electronics,
  },
  {
    category: "cigarettes",
    selected: true,
    name: "iqos",
    image: IMG_Cigarettes_iqos,
  },
  {
    category: "cigarettes",
    selected: true,
    name: "tobaco",
    image: IMG_Cigarettes_tobaco,
  },
  {
    category: "cigarettes",
    selected: true,
    name: "lighter",
    image: IMG_Cigarettes_lighter,
  },
];

export const expenseDesc_shopping = [
  {
    category: "shopping",
    selected: true,
    name: "clothes",
    image: IMG_Shopping_clothes,
  },
  {
    category: "shopping",
    selected: true,
    name: "cosmetics",
    image: IMG_Shopping_cosmetics,
  },
  {
    category: "shopping",
    selected: true,
    name: "electronics",
    image: IMG_Shopping_electronics,
  },
  {
    category: "shopping",
    selected: true,
    name: "shopping",
    image: IMG_Shopping_general,
  },
  {
    category: "shopping",
    selected: true,
    name: "jewelery",
    image: IMG_Shopping_jewelery,
  },
];

export const expenseDesc_medical = [
  {
    category: "medical",
    selected: true,
    name: "medicine",
    image: IMG_Medical_medicine,
  },
  {
    category: "medical",
    selected: true,
    name: "ambulance",
    image: IMG_Medical_ambulance,
  },
  {
    category: "medical",
    selected: true,
    name: "dentist",
    image: IMG_Medical_dentist,
  },
  {
    category: "medical",
    selected: true,
    name: "doctor",
    image: IMG_Medical_doctor,
  },
  {
    category: "medical",
    selected: true,
    name: "nursing",
    image: IMG_Medical_nursing,
  },
  {
    category: "medical",
    selected: true,
    name: "hospital",
    image: IMG_Medical_hospital,
  },
  {
    category: "medical",
    selected: true,
    name: "vet",
    image: IMG_Medical_vet,
  },
];

export const expenseDesc_sport_entertainment = [
  {
    category: "subscriptions",
    selected: true,
    name: "appletv",
    image: IMG_Subs_appletv,
  },
  {
    category: "subscriptions",
    selected: true,
    name: "music",
    image: IMG_Subs_music,
  },
  {
    category: "subscriptions",
    selected: true,
    name: "netflix",
    image: IMG_Subs_netflix,
  },
  {
    category: "subscriptions",
    selected: true,
    name: "youtube",
    image: IMG_Subs_youtube,
  },
  {
    category: "subscriptions",
    selected: true,
    name: "cinema",
    image: IMG_Entertainment_cinema,
  },
  {
    category: "subscriptions",
    selected: true,
    name: "movies",
    image: IMG_Entertainment_movies,
  },
];

export const expenseDesc_transport = [
  {
    category: "transport",
    selected: true,
    name: "taxi",
    image: IMG_Transport_taxi,
  },
  {
    category: "transport",
    selected: true,
    name: "bus",
    image: IMG_Transport_bus,
  },
  {
    category: "transport",
    selected: true,
    name: "bike",
    image: IMG_Transport_bike,
  },
  {
    category: "transport",
    selected: true,
    name: "scooter",
    image: IMG_Transport_scooter,
  },
  {
    category: "transport",
    selected: true,
    name: "delivery",
    image: IMG_Transport_delivery,
  },
];

// export const expense = [
//   { category: "housing", name: "house", image: IMG_house },
//   { category: "supermarket", name: "market", image: IMG_market },
//   { category: "supermarket", name: "supermarket", image: IMG_supermarket },
//   { category: "food", name: "restaurant", image: IMG_restaurant },
//   { category: "food", name: "coffee", image: IMG_coffee },
//   { category: "food", name: "cigarette", image: IMG_cigarette },
//   { category: "medicine", name: "pharmacy", image: IMG_pharmacy },
//   { category: "medicine", name: "hospital", image: IMG_hospital },
//   { category: "transport", name: "taxi", image: IMG_taxi },
//   { category: "transport", name: "flight", image: IMG_ticket_plane },
//   { category: "transport", name: "train", image: IMG_ticket_train },
//   { category: "transport", name: "bus", image: IMG_ticket_bus },
//   { category: "others", name: "documents", image: IMG_documents },
//   { category: "bills", name: "mobile", image: IMG_mobile },
//   { category: "others", name: "flowers", image: IMG_flower },
// ];

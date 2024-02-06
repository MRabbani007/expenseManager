import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { GlobalContext, GlobalProvider } from "../context/GlobalState";
import CardHeader from "../components/CardHeader";
import CardIncomeExpense from "../components/CardIncomeExpense";
import SectionViewTransactions from "../components/SectionViewTransactions";
import Slider from "../components/Slider";

import IMG_sleek from "../assets/images/sleek.png";
import IMG_movies from "../assets/images/moviesWebsite.png";
import IMG_todoapp from "../assets/images/todoapp.png";
import IMG_travelApp from "../assets/images/travelApp.png";

const projects = [IMG_movies, IMG_sleek, IMG_todoapp, IMG_travelApp];

const HomePage = () => {
  return (
    <GlobalProvider>
      <Navbar />
      <div className="py-[60px] px-2 flex flex-col gap-3">
        <CardHeader />
        <CardIncomeExpense />
        {/* <Slider>
          {projects.map((item, index) => {
            return <img src={item} key={index} className="object-fill" />;
          })}
        </Slider> */}
      </div>
    </GlobalProvider>
  );
};

export default HomePage;

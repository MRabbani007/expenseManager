import React, { useContext, useEffect, useState } from "react";
// Imported Media
import IMG_tenge from "../assets/currency/tenge.png";
import IMG_ruble from "../assets/currency/ruble.png";
import IMG_dollar from "../assets/currency/dollar.png";
import IMG_euro from "../assets/currency/euro.png";

import { FaTengeSign } from "react-icons/fa6";

import { GlobalContext } from "../context/GlobalState";

const CardCurrency = () => {
  const { currency, handleCurrency } = useContext(GlobalContext);
  const [currencyImage, setCurrencyImage] = useState("");

  useEffect(() => {
    handleSelectCurrency("euro");
  }, []);

  const handleSelectCurrency = (value) => {
    switch (value) {
      case "tenge": {
        setCurrencyImage(IMG_ruble);
        handleCurrency("ruble");
        break;
      }
      case "ruble": {
        setCurrencyImage(IMG_dollar);
        handleCurrency("dollar");
        break;
      }
      case "dollar": {
        setCurrencyImage(IMG_euro);
        handleCurrency("euro");
        break;
      }
      case "euro": {
        setCurrencyImage(IMG_tenge);
        handleCurrency("tenge");
        break;
      }
      default: {
        setCurrencyImage(IMG_tenge);
        setCurrencyImage(IMG_tenge);
        handleCurrency("tenge");
      }
    }
  };

  return (
    <div>
      <img
        src={currencyImage}
        alt=""
        className="w-12 min-w-12 cursor-pointer"
        onClick={() => handleSelectCurrency(currency)}
      />
    </div>
  );
};

export default CardCurrency;

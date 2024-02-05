import React, { useContext, useEffect, useState } from "react";
// Imported Media
import IMG_tenge from "../assets/icons/tenge.png";
import IMG_ruble from "../assets/icons/ruble.png";
import IMG_dollar from "../assets/icons/dollar.png";
import IMG_euro from "../assets/icons/euro.png";

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
        className="icon-lg mx-1"
        onClick={() => handleSelectCurrency(currency)}
      />
    </div>
  );
};

export default CardCurrency;

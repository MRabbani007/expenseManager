import React, { useContext, useEffect, useState } from "react";
// Imported Media
import IMG_tenge from "../assets/icons/tenge.png";
import IMG_dollar from "../assets/icons/dollar.png";
import { GlobalContext } from "../context/GlobalState";

const CardCurrency = () => {
  const [edit, setEdit] = useState(false);
  const { currency, handleCurrency } = useContext(GlobalContext);
  const [currencyImage, setCurrencyImage] = useState("");

  useEffect(() => {
    switch (currency) {
      case "dollar": {
        setCurrencyImage(IMG_dollar);
        break;
      }
      case "tenge": {
        setCurrencyImage(IMG_tenge);
        break;
      }
      default: {
        setCurrencyImage(IMG_tenge);
      }
    }
  }, [currency]);

  return (
    <div>
      {edit ? (
        <>
          <img
            src={IMG_dollar}
            alt=""
            className="icon-lg mx-1"
            onClick={() => {
              handleCurrency("dollar");
              setEdit(false);
            }}
          />
          <img
            src={IMG_tenge}
            alt=""
            className="icon-lg mx-1"
            onClick={() => {
              handleCurrency("tenge");
              setEdit(false);
            }}
          />
        </>
      ) : (
        <img
          src={currencyImage}
          alt=""
          className="icon-lg mx-1"
          onClick={() => setEdit(!edit)}
        />
      )}
    </div>
  );
};

export default CardCurrency;

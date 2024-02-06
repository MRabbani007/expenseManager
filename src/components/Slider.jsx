import React, { useState } from "react";
import {
  IoChevronBackCircleOutline,
  IoChevronBackOutline,
  IoChevronForwardCircleOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";

const Slider = ({ children }) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const gotoNext = () => {
    let newIndex = displayIndex === children.length - 1 ? 0 : displayIndex + 1;
    setDisplayIndex(newIndex);
  };
  const gotoPrevious = () => {
    let newIndex = displayIndex === 0 ? children.length - 1 : displayIndex - 1;
    setDisplayIndex(newIndex);
  };
  const gotoSlide = (value) => {
    setDisplayIndex(value);
  };

  return (
    <div className="relative overflow-hidden w-[500px] h-[350px] group">
      {/* Slider controls */}
      <button
        type="button"
        className="hidden group-hover:block absolute left-0 top-[50%] z-50 "
      >
        <IoChevronBackCircleOutline
          className="icon text-red-600 "
          onClick={gotoPrevious}
        />
      </button>
      <button
        type="button"
        className="hidden group-hover:block absolute right-0 top-[50%] z-50 "
      >
        <IoChevronForwardCircleOutline
          className="icon text-red-600"
          onClick={gotoNext}
        />
      </button>
      {/* Carousel Wrapper */}
      <div
        className={`flex w-full h-full duration-700 ease-in-out`}
        style={{ transform: `translateX(${-displayIndex * 100}%)` }}
      >
        {children}
      </div>
      {/* Slider indicators  */}
      <div className="absolute bottom-4 w-full flex items-center justify-center">
        {children.map((item, index) => {
          return (
            <RxDotFilled
              key={index}
              onClick={() => gotoSlide(index)}
              className={
                (displayIndex === index ? "text-white" : "text-red-700") +
                " cursor-pointer duration-500 text-3xl"
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;

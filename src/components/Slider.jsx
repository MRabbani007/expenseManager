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
    <div className="relative lg:px-[10%] px-10 w-fit">
      {/* Slider controls */}
      <button type="button" className="absolute left-0 top-[50%] z-10 ">
        <IoChevronBackOutline
          className="inline text-4xl text-red-700"
          onClick={gotoPrevious}
        />
      </button>
      <button type="button" className="absolute right-0 top-[50%] z-10 ">
        <IoChevronForwardOutline
          className="inline text-4xl text-red-700"
          onClick={gotoNext}
        />
      </button>
      {/* Slider indicators  */}
      <div className="absolute bottom-[-30px] left-0 right-0 flex items-center justify-center">
        {children.map((item, index) => {
          return (
            <RxDotFilled
              key={index}
              onClick={() => gotoSlide(index)}
              className={
                (displayIndex === index
                  ? "text-red-700 text-4xl"
                  : "text-red-400 text-3xl") + " cursor-pointer duration-500"
              }
            />
          );
        })}
      </div>
      {/* Carousel Wrapper */}
      <div className=" lg:w-[700px] w-[300px] min-h-[200px] overflow-hidden">
        <div
          className={`flex flex-row h-full duration-700 ease-in-out`}
          style={{ transform: `translateX(${-displayIndex * 100}%)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Slider;

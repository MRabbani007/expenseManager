import { ReactNode, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";

export function Slider({ children }: { children: ReactNode }) {
  const [displayIndex, setDisplayIndex] = useState(0);

  const gotoNext = () => {
    if (!children || !Array.isArray(children)) return;

    let newIndex = displayIndex === children?.length - 1 ? 0 : displayIndex + 1;
    setDisplayIndex(newIndex);
  };
  const gotoPrevious = () => {
    if (!children || !Array.isArray(children)) return;

    let newIndex = displayIndex === 0 ? children.length - 1 : displayIndex - 1;
    setDisplayIndex(newIndex);
  };

  const gotoSlide = (value: number) => {
    setDisplayIndex(value);
  };

  return (
    <div className="relative border-2">
      {/* Slider controls */}
      <button type="button" className="absolute right-full top-[50%] z-10 ">
        <IoChevronBackOutline
          className="inline text-4xl text-red-700"
          onClick={gotoPrevious}
        />
      </button>
      <button type="button" className="absolute left-full top-[50%] z-10 ">
        <IoChevronForwardOutline
          className="inline text-4xl text-red-700"
          onClick={gotoNext}
        />
      </button>
      {/* Slider indicators  */}
      <div className="absolute top-full left-0 right-0 flex items-center justify-center">
        {children &&
          Array.isArray(children) &&
          children.map((item, index) => {
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
      <div className=" lg:w-[700px] w-[300px] min-h-[200px] overflow-hidden border-2">
        <div
          className={`flex flex-row h-full duration-700 ease-in-out`}
          style={{ transform: `translateX(${-displayIndex * 100}%)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function Slide({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="lg:min-w-[700px] min-w-[300px] p-2">
      <h2 className="font-mono font-semibold text-xl">{title}</h2>
      <div className="flex flex-wrap gap-2 w-full p-2 mx-auto">{children}</div>
    </div>
  );
}

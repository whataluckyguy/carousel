import React, { useEffect, useState } from "react";
import "./Carousel.css";

const Carousel = ({
  isReverse,
  children,
  gradientColor,
  textColor,
  direction,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 6000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div
      className="carousel"
      onMouseLeave={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

export const CarouselItem = ({
  isReverse,
  children,
  width,
  gradientColor,
  textColor,
  direction,
}) => {
  return (
    <div className="carouselItem" style={{ width: width }}>
      <div
        className={isReverse}
        style={{
          background: `linear-gradient(${direction}, #${gradientColor} 75%, transparent)`,
          color: `#${textColor}`,
        }}
      >
        <h1>Hello World</h1>
      </div>

      <img src={children} alt="Travel Quail" />
    </div>
  );
};

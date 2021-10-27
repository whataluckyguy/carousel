import "./App.css";
import Carousel, { CarouselItem } from "./Carousel";
import { sliderData } from "./Data";

function App() {
  return (
    <div className="App">
      <Carousel>
        {sliderData.map((item) => {
          return (
            <CarouselItem
              children={item.imageURL}
              gradientColor={item.gradientColor}
              textColor={item.textColor}
              isReverse={item.isReverse}
              direction={item.direction}
              margin={item.margin}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

export default App;

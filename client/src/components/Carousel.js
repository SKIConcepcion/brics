import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logo from "../assets/dark.jpg";

const Carousel = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  const placeholderImage = Logo;
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  }

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setActiveSlide(index),
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
    if (sliderRef.current && sliderRef.current.slickGoTo) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const containerHeight = 220;

  if (images.length === 1) {
    return (
      <div className="relative rounded-t-lg overflow-hidden">
        <div
          className="h-[220px] sm:h-[400px] w-full"
          style={{ height: `${containerHeight}px` }}
        >
          <img
            src={images[0] ? images[0] : placeholderImage}
            alt={`Slide 1`}
            className="object-cover h-full w-full"
            onError={onImageError}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-t-lg overflow-hidden">
      <div
        className="h-[220px] sm:h-[400px] w-full min-w-[600px] sm:min-w-[800px]"
        style={{ height: `${containerHeight}px` }}
      >
        <Slider ref={sliderRef} {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="hs-carousel-slide h-full">
              <img
                src={image ? image : placeholderImage}
                alt={`Slide ${index + 1}`}
                className="object-cover h-full w-full"
                onError = {onImageError}
                style={{ maxHeight: `${containerHeight}px` }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`size-3 border border-gray-400 rounded-full cursor-pointer ${activeSlide === index ? "bg-[#3B82F6] border-[#3B82F6]" : "bg-gray-400 border-gray-400"
              }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

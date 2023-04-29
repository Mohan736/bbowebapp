import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MySlider() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    fade: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed:1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <div
          className="bg"
          style={{ background: `url(images/login.jpg)` }}
        ></div>
      </div>
      <div>
        <div
          className="bg"
          style={{ background: `url(images/bg-1.jpg)` }}
        ></div>
      </div>
      <div>
        <div
          className="bg"
          style={{ background: `url(images/bg-2.jpg)` }}
        ></div>
      </div>

    </Slider>
  );
}

export default MySlider;

import React, { useState } from "react";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
} from "../../assets/index";

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "75%",
          left: "0",
          right: "0",
          margin: "0 auto",
          transform: "translate(-50%,-50%)",
          width: "0",
          padding: "0 10px",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                background: "#131921",
                padding: "8px 0",
                cursor: "pointer",
                border: "1px solid #f3a847",
                margin: "0 8px",
              }
            : {
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                background: "#131921",
                opacity: "80%",
                padding: "8px 0",
                cursor: "pointer",
                border: "1px solid white",
                margin: "0 7px",
              }
        }
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "0",
                right: "0",
                margin: "0 auto",
                transform: "translate(-50%,-50%)",
                width: "90px",
              }}
            >
              <ul
                style={{
                  width: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 8px",
                }}
              >
                {dots}
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "30px",
                      height: "30px",
                      borderRadius: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      background: "#131921",
                      padding: "8px 10px",
                      cursor: "pointer",
                      border: "1px solid #f3a847",
                    }
                  : {
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#232F3E",
                      color: "white",
                      padding: "8px 0",
                      cursor: "pointer",
                      border: "1px solid white",
                    }
              }
            >
              {i + 1}
            </div>
          ),
        },
      },
    ],
  };
  return (
    <div className="w-full">
      <div className="relative w-full h-full">
        <Slider {...settings}>
          <div>
            <img src={bannerImgOne} alt="bannerImgOne" />
          </div>
          <div>
            <img src={bannerImgTwo} alt="bannerImgTwo" />
          </div>
          <div>
            <img src={bannerImgThree} alt="bannerImgThree" />
          </div>
          <div>
            <img src={bannerImgFour} alt="bannerImgFour" />
          </div>
          <div>
            <img src={bannerImgFive} alt="bannerImgFive" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;

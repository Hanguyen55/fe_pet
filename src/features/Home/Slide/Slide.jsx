import React from "react";
import "../../../sass/Home/Slide.scss";
import imgCat from "../../../images/cat1.jpg";
import imgDog from "../../../images/dog1.jpg";
import imgVoi from "../../../images/voi1.jpg";
import { useRef } from "react";
import { useEffect } from "react";
export default function Slide() {
  const slideEl = useRef(null);

  useEffect(() => {
    let slides = slideEl.current.querySelectorAll(".slide-item");
    let slideIndex = 0;
    const slideShow = (n) => {
      let slideActive = slideEl.current.querySelector(
        ".slide-item.slide-active"
      );
      slideActive.classList.remove("slide-active");
      slides[n].classList.add("slide-active");
    };
    const AutoSlide = () => {
      if (slideIndex === slides.length - 1) {
        slideIndex = 0;
      } else if (slideIndex >= 0) {
        slideIndex += 1;
      }
      slideShow(slideIndex);
    };
    let a = setInterval(() => {
      AutoSlide();
    }, 4000);
    return () => {
      clearInterval(a);
    };
  }, []);

  return (
    <div className="Slide">
      <div className="slideWrapper">
        <div className="slides" ref={slideEl}>
          <div className="blur"></div>
          <div
            className="slide-item slide-active"
            style={{ color: "#978e79 " }}
          >
            <img src={imgCat} alt="" />
            <div className="slide-content">
              <h1>01</h1>
              <h3>Mèo ZumBa</h3>
              <div className="hr"></div>
              <span>
                Cung cấp các dịch vụ chăm sóc đặc biệt cho thú cưng của bạn
              </span>
              <br />
              <button>Xem ngay</button>
            </div>
          </div>
          <div className="slide-item " style={{ color: "#724c3d " }}>
            <img src={imgDog} alt="" />
            <div className="slide-content">
              <h1>02</h1>
              <h3>Chó ShiBa</h3>
              <div className="hr"></div>
              <span>
                Cung cấp các dịch vụ chăm sóc đặc biệt cho thú cưng của bạn
              </span>
              <br />
              <button>Xem ngay</button>
            </div>
          </div>
          <div className="slide-item " style={{ color: "#4c433c " }}>
            <img src={imgVoi} alt="" />
            <div className="slide-content">
              <h1>03</h1>
              <h3>Voi TiKa</h3>
              <div className="hr"></div>
              <span>
                Cung cấp các dịch vụ chăm sóc đặc biệt cho thú cưng của bạn
              </span>
              <br />
              <button>Xem ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

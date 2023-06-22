import React from "react";
import "../../sass/Banner/Banner.scss";
import img1 from "../../images/pet2.jpg";
export default function Banner() {
  return (
    <div className="Banner">
      <div className="blur"></div>
      <img src={img1} alt="" />
    </div>
  );
}

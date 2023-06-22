import { Container } from "@material-ui/core";
import React from "react";
import imgAbout from "../../../images/aboutus.jpg";
import imgCat from "../../../images/cat2.jpg";
import imgDog from "../../../images/dog2.jpg";
import "../../../sass/Home/AboutUs.scss";
export default function AboutUs() {
  return (
    <div className="AboutUs">
      <Container maxWidth="lg">
        <div className="post-gird">
          <div className="post-item">
            <img src={imgAbout} alt="" />
          </div>
          <div className="post-item">
            <h1>
              Làm cho thú cưng trở nên
              <span className="text-oranger"> Happy</span>
            </h1>
            <span>
              Để bảo vệ sức khỏe của vật nuôi bạn cần biết cách chăm sóc thú
              cưng đúng cách. Vì vậy, chúng tôi cung cấp các dịch vụ tạo ra lộ
              trình chăm sóc thú cưng của bạn, vật nuôi của bạn 1 cách an toàn
              nhất.
            </span>
          </div>
          <div className="post-item">
            <img src={imgCat} alt="" />
            <div className="item-content">
              <div className="text">
                <h2>Giá cả hợp lý</h2>
                <span>
                  Có từng loại dịch vụ phù hợp với đại đa số những người yêu
                  thích thú cưng khắp cả nước.
                </span>
              </div>
            </div>
            <div className="blur"></div>
          </div>
          <div className="post-item">
            <img src={imgDog} alt="" />
            <div className="item-content">
              <div className="text">
                <h2>Thú cưng khoẻ mạnh</h2>
                <span>
                  Tạo ra một môi trường lạnh mạnh cho thú cưng để các bạn nhỏ có
                  một thể trạng tốt nhất.
                </span>
              </div>
            </div>
            <div className="blur"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}

import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import contactApi from "../../../api/contactApi";
import socialNetworkApi from "../../../api/socialNetworkApi";
import "../../../sass/Home/Footer.scss";
import { iconFooter } from "../../Admin/svg/IconSvg";
export default function Footer() {
  const [contact, setContact] = useState(null);
  const [socialNetwork, setSocialNetwork] = useState(null);
  useEffect(() => {
    contactApi.getAll({ status: 1 }).then((ok) => {
      setContact(ok.data.rows);
    });
    socialNetworkApi.getAll({ status: 1 }).then((ok) => {
      setSocialNetwork(ok.data.rows);
    });
  }, []);
  return (
    <div className="Footer">
      <Container>
        <Grid container className="footer-content">
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Giới thiệu</div>
            <div className="hr"></div>
            <div className="item-content about">
              {!contact ? "" : contact[0]?.description}
            </div>
          </Grid>
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Liên lạc với chúng tôi</div>
            <div className="hr"></div>
            <div className="item-content">
              <div className="address">
                Địa chỉ: <span>{!contact ? "" : contact[0]?.address}</span>
              </div>
              <div className="contact">
                <div className="phone">
                  Điện thoại: <span>{!contact ? "" : contact[0]?.phone}</span>
                </div>
                <div className="email">
                  Email: <span>{!contact ? "" : contact[0]?.email}</span>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Đường dẫn nhanh</div>
            <div className="hr"></div>
            <div className="item-content">
              <div className="item-link">
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Trang chủ</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Dịch vụ</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Cửa hàng thú cưng</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Tin tức</Link>
                </div>
                <div className="link">
                  <div className="icon">{iconFooter}</div>
                  <Link to="#">Liên hệ</Link>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={6} sm={12} className="footer-item">
            <div className="item-title">Mạng xã hội</div>
            <div className="hr"></div>
            <div className="item-content">
              {socialNetwork?.map((ok, index) => (
                <div
                  className="icon"
                  key={index}
                  style={{ background: ok.color }}
                >
                  {renderHTML(ok.icon)}
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

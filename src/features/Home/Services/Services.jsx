import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import serviceApi from "../../../api/ServiceApi";
import imgDog from "../../../images/cat3.jpg";
import "../../../sass/Home/Services.scss";
export default function Services() {
  const style = {
    background: `url(${imgDog}) center no-repeat`,
    backgroundSize: "cover",
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    serviceApi.getServiceHome({ limit: 6 }).then((ok) => {
      setData(ok.data);
    });
  }, []);

  return (
    <div className="Services" style={style}>
      <div className="blur"></div>
      <div className="heading">
        <div className="heading__title text-white">
          <h3>Dịch vụ của chúng tôi</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="container">
        <div className="post-grid">
          {data?.map((ok, index) => (
            <div className="post-item" key={index}>
              <div className="icon">{renderHTML(ok.icon)}</div>
              <div className="title">{ok.name}</div>
              <div className="description">{ok.description}</div>
              <div className="btn">
                <Link to={`/RegisterService/${ok.id}`}>Đăng ký ngay</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

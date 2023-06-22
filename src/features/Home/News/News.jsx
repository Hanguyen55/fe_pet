import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newApi from "../../../api/newApi";
import "../../../sass/Home/News.scss";
export default function News() {
  const [data, setData] = useState(null);
  useEffect(() => {
    newApi
      .getNewHome()
      .then((ok) => {
        setData(ok.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="News">
      <div className="heading">
        <div className="heading__title">
          <h3>
            <Link to="/ListNews" className="link-color-orange">
              Tin tức
            </Link>{" "}
            động vật
          </h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <Container maxWidth="lg">
        <div className="new-content">
          {data?.map((ok, index) => (
            <div className="new-item" key={index}>
              <div className="img">
                <img src={ok.avatar} alt="" />
              </div>
              <div className="text">
                <div className="text-title">
                  <Link to={`/ListNews/${ok.id}`} title={ok.name}>
                    {ok.name}
                  </Link>
                </div>
                <div className="text-content">{ok.samary}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import petApi from "../../../api/petApi";
import productApi from "../../../api/productApi";
import "../../../sass/Shop/Related.scss";
export default function Related({ id, onLoad, load }) {
  const [data, setData] = useState([]);
  const { pathname } = useLocation();

  const getPathName = () => {
    let arr = pathname.split("/");
    arr.pop();
    let newLink = arr.join("/");
    return newLink;
  };

  const getType = () => {
    return pathname.split("/")[2];
  };

  useEffect(() => {
    console.log("getType :", getType());
    if (getType() === "pet") {
      petApi.getAll({ page: 1 }).then((ok) => {
        setData(cutData(ok.data));
      });
    } else {
      productApi.getAll({ page: 1 }).then((ok) => {
        setData(cutData(ok.data));
      });
    }
  }, [load]);

  const cutData = (e) => {
    let arr = [];
    for (let i = 0; i < e.rows.length; i++) {
      const element = e.rows[i];
      if (element.id !== +id) {
        arr.push(element);
      }
      if (i === 3) {
        return arr;
      }
    }
    return arr;
  };

  return (
    <div className="Related">
      <div className="heading">
        <div className="heading__title">
          <h3>Sản phẩm liên quan</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <Grid container spacing={3}>
        {data?.map((ok, index) => (
          <Grid item lg={3} md={4} sm={6} key={index}>
            <div className="item-pet">
              <div className="img">
                <img src={ok.avatar} alt="" />
                <div className="add-cart">Thêm vào giỏ</div>
                <div className="blur"></div>
              </div>
              <div className="name">
                <Link
                  to={`${getPathName()}/${ok.id}`}
                  onClick={() => {
                    onLoad();
                  }}
                >
                  {ok.name}
                </Link>
              </div>
              <div className="price">
                {/* <div className="price1">
                  <del>400.000</del>
                </div> */}
                <div className="price2">
                  {parseInt(ok?.price).toLocaleString()}
                </div>
                <div className="gia">VNĐ</div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

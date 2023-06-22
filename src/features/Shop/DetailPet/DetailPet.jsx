import { Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderHtml from "react-render-html";
import { useParams } from "react-router-dom";
import petApi from "../../../api/petApi";
import productApi from "../../../api/productApi";
import "../../../sass/Shop/DetailPet.scss";
import Banner from "../../Banner/Banner";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import Related from "../Related/Related";
import "./DetailPetJs";
import { ClickImg } from "./DetailPetJs";
import { addListCart, updateListCart } from "../../../app/Slice/CartSlide";
import { messageShowErr, messageShowSuccess } from "../../../function";

export default function DetailPet() {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [quantityNumber, setQuantityNumber] = useState(1);
  const listCart = useSelector((state) => state.cart.listCart);
  const hangdleQuantityNumber = (e) => {
    let number = e.target.value;
    if (Number(number) !== isNaN && number > 0 && number <= data.quantity) {
      setQuantityNumber(Number(number));
    } else {
      setQuantityNumber(0);
    }
  };
  const dispatch = useDispatch();

  const listBread = [
    { name: "Trang chủ", link: "/" },
    { name: "Cửa hàng", link: "/Shop" },
    { name: data?.name },
  ];

  const { id, type } = useParams();
  const imgActiveEl = useRef(null);
  const listImgEl = useRef(null);

  useEffect(() => {
    if (type === "pet") {
      petApi.getOne(id).then((ok) => {
        setData(ok);
      });
    } else {
      productApi.getOne(id).then((ok) => {
        setData(ok);
      });
    }
    window.scrollTo(0, 0);
  }, [load]);

  useEffect(() => {
    ClickImg(imgActiveEl.current, listImgEl.current);
  }, [data]);

  const handleAddCart = (infor) => {
    let isExist = listCart.find(
      (x) => x.id === infor.id && x.name === infor.name,
    );
    infor = { ...infor, quantityCurrent: quantityNumber };

    if (isExist) {
      if (isExist.quantityCurrent !== quantityNumber) {
        dispatch(updateListCart(infor));
        messageShowSuccess("Cập nhật số lượng thành công!");
      } else {
        messageShowErr("Sản phẩm đã có trong giỏ hàng!");
      }
    } else {
      dispatch(addListCart(infor));
      messageShowSuccess("Thêm giỏ hàng thành công!");
    }
  };

  return (
    <div className="DetailPet">
      <Banner />
      <Breadcrumbs breadCrumbList={listBread} />
      <div className="container">
        <Grid container spacing={3}>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <div className="product-img">
              <div className="img-active">
                <img src={data?.avatar} alt="" ref={imgActiveEl} />
              </div>
              <div className="list-img" ref={listImgEl}>
                {type === "pet"
                  ? data?.imgpet?.map((ok, index) => (
                      <div className="img" key={index}>
                        <img src={ok.link} alt="" />
                      </div>
                    ))
                  : data?.imgproduct?.map((ok, index) => (
                      <div className="img" key={index}>
                        <img src={ok.link} alt="" />
                      </div>
                    ))}
              </div>
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <div className="item-content">
              <div className="name">{data?.name}</div>
              <div className="price">
                {/* <div className="price1">
                  <del>400.000</del>
                </div> */}
                <div className="price2">
                  {parseInt(data?.price).toLocaleString()}
                </div>
                <div className="gia">VNĐ</div>
              </div>
              <div className="description">
                <div className="title">Mô tả</div>
                <div className="content">{data?.description}</div>
              </div>
              <div className="high-light">
                <div className="title">Điểm nổi bật</div>
                <div className="content">
                  {renderHtml(data ? data.text : "")}
                </div>
              </div>
              <div className="quantity">
                <div className="title">Số lượng: {data?.quantity}</div>
                <div className="title">
                  Nhập số lượng muốn mua:{" "}
                  <input
                    type="number"
                    className="input_quantity"
                    value={quantityNumber}
                    onChange={hangdleQuantityNumber}
                  />
                </div>
              </div>
              <div className="button">
                <div className="add-cart" onClick={() => handleAddCart(data)}>
                  Thêm vào giỏ
                </div>
                <div className="buy">Mua ngay</div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Related
          type={data?.type}
          id={id}
          load={load}
          onLoad={() => {
            setLoad(!load);
          }}
        />
      </div>
    </div>
  );
}

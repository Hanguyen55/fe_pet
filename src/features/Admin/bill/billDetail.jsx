import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import billApi from "../../../api/billApi";
import Spinner from "../Spin/Spinner";
import "../../../sass/Admin/BillDetail.scss";
import Banner from "../../Banner/Banner";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import { Container } from "@material-ui/core";
export default function BillDetail() {
  const { id } = useParams();
  const { url } = useRouteMatch();
  console.log("url",url);
  const [data, setdata] = useState(null);
  const [adminOrUser, setAdminOrUser] = useState("Admin");
  const [bill, setBill] = useState(null);
  const listBread = [{ name: "Trang chủ", link: "/" }, { name: "Lịch sử mua hàng", link: "/PurchaseHistory"  }, { name: bill?.id },];
  useEffect(() => {
    billApi
      .getOne(id)
      .then((ok) => {
        setdata(JSON.parse(ok.listProduct));
        setBill(ok);
      })
      .catch((err) => {
        console.log(err);
      });
      var urlSplit = url.split("/")
      setAdminOrUser(urlSplit[1])
  }, [id]);

  return (
    <div className="AdminTable">
        {adminOrUser !== "Admin" ?
        <>
            <Banner />
            <Breadcrumbs breadCrumbList={listBread} />
        </>
        :
        null
        }
        {/* <Banner />
        <Breadcrumbs breadCrumbList={listBread} /> */}
        <Container>
        {adminOrUser === "Admin" ?
        <div className="heading">
            <div className="heading__title">
                <h3>Chi tiết Hoá đơn</h3>
            </div>
            <div className="heading__hr"></div>
        </div>
        :
        null
        }
        <div className="bill-detail">
            {data && bill ? (
                <>
            <div className="container">
                {data.map((ok) => (
                <div className="box" key={ok.id}>
                    <div className="box-img">
                    <img src={ok.avatar} alt="" />
                    </div>
                    <div className="box-content">
                    <div className="title">{ok.name}</div>
                    <div className="price">
                        Giá: {Number(ok.price).toLocaleString()} vnđ
                    </div>
                    <div className="quantity">
                        Số lượng mua: {ok.quantityCurrent}
                    </div>
                    <div className="result">
                        Tổng tiền:{" "}
                        {Number(ok.priceResult).toLocaleString()} vnđ
                    </div>
                    <div className="phone">Số điện thoại: {bill.phone}</div>
                    <div className="address">Địa chỉ: {bill.address}</div>
                    </div>
                </div>
                ))}
            </div>
            <div className="result-all">
                Thành tiền: {bill.price}vnđ
            </div>
            </>
            ) : (
            <Spinner />
            )}
        </div>
        </Container>
    </div>
  );
}

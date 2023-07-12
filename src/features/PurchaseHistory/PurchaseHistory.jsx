import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link, useRouteMatch } from "react-router-dom";
import { Container } from "@material-ui/core";
import { countPagination, formatDate } from "../../function";
import Banner from "../Banner/Banner";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Table from "../Table/Table";
import Spinner from "../Spin/Spinner";
import billApi from "../../api/billApi";
export default function PurchaseHistory() {
    const listBread = [{ name: "Trang chủ", link: "/" }, { name: "Lịch sử mua hàng" }];
    const userInfor = useSelector((state) => state.user.userInfor);
  const { url } = useRouteMatch();
  const titleTable = [
    { title: "STT", name: "STT" },
    { title: "Thời gian", name: "time" },
    { title: "Hình thức thanh toán", name: "payment" },
    { title: "Điện thoại", name: "phone" },
    { title: "Địa chỉ", name: "address" },
    { title: "Giá tiền", name: "price" },
    { title: "Trạng thái", name: "action" },
    { title: "Chi tiết", name: "detail" },
  ];

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    billApi.getAll({ page: page })
      .then((ok) => {
        let data = [];
        for (let i = 0; i < ok.data.rows.length; i++) {
            if(ok.data.rows[i].userId == userInfor.id) {
                data.push(ok.data.rows[i]);
            }
        }
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  const onchangeEdit = (e) => {
    history.push(`${url}/AddPriceService/${e}`);
  };
  const onchangeDelete = async (e) => {
    // await priceServicesApi.deletePriceServices(e);
    // setLoad(!load);
  };
  const handlePaymentType = (e) => {
    let paymentType = '';
    switch (e) {
        case 0:
            paymentType="Thanh toán khi nhận hàng";
        break;
        case 1:
            paymentType="Chuyển khoản";
        break;
        case 2:
            paymentType="Trực tiếp";
        break;
        default:
            paymentType="Hình thức khác";
        break;
    }
    return paymentType
  };
  const handleStatus = (e) => {
    let status = '';
    switch (e) {
        case 0:
            status="Đang sử lý";
        break;
        case 1:
            status="Đang được gửi";
        break;
        case 2:
            status="Đã nhận";
        break;
        default:
            status="Đang cập nhập";
        break;
    }
    return status
  };
  const history = useHistory();
  const handleClickDetail = (e) => {
    history.push(`${url}/${e}`);
  };
  return (
    <div className="UserInfor">
    <Banner />
    <Breadcrumbs breadCrumbList={listBread} />
    <Container>
    <div className="content">
    {data !== null ? (
        <div>
          <Table
            titleTable={titleTable}
            // hidentDot
            nchangeDelete={onchangeDelete}
            onchangeEdit={onchangeEdit}
            dataSource={data.map((ok, index) => ({
              key: ok.id,
              STT: index + 1,
              time: formatDate(ok.createdAt),
              payment: handlePaymentType(ok.paymentType),
              phone: ok.phone,
              address: ok.address,
              price: ok.price,
              action: handleStatus(ok.status),
              detail: (
                <p
                    style={{ cursor: "pointer", color: "orange" }}
                    onClick={() => handleClickDetail(ok.id)}
                    >
                    Chi tiết
                </p>
                // <Link to={`${url}/${ok.id}`}>Chi tiết</Link>
                  ),
            }))}
          />
          <Pagination
            onChange={(e, i) => {
              setPage(i);
            }}
            count={countPagination(data.length)}
            color="secondary"
            variant="outlined"
            shape="rounded"
          />
        </div>
      ) : (
        <Spinner />
      )}
          </div>
    </Container>
  </div>
  );
}

import { Pagination } from "@material-ui/lab";
import { MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import billApi from "../../../api/billApi";
import { countPagination, formatDate } from "../../../function";
import Spinner from "../Spin/Spinner";
import Table from "../Table/Table";
import Select from "react-select";
export default function Bill() {
  const { url } = useRouteMatch();
  const titleTable = [
    { title: "Người mua", name: "user" },
    { title: "Điện thoại", name: "phone" },
    { title: "Địa chỉ", name: "address" },
    { title: "Thời gian", name: "time" },
    { title: "Trạng thái", name: "status" },
    { title: "Chi tiết", name: "detail" },
  ];
  const dataType = [
    { value: 0, label: "Đang sử lý" },
    { value: 1, label: "Đang được gửi" },
    { value: 2, label: "Đã nhận" },
  ];
  const [typeStatus, setTypeStatus] = useState("chó");
  const [value, setValue] = useState("");
  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const onchangeTypeStatus = (e) => {
    setTypeStatus(e.label);
  };
  useEffect(() => {
    billApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
        console.log("test",ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const history = useHistory();
  const handleStatus = async (e,id) => {
    await billApi.editbill({ status: e, id: id });
    setLoad(!load);
  };
//   const onchangeEdit = (e) => {
//     history.push(`${url}/AddCategory/${e}`);
//   };
//   const onchangeDelete = async (e) => {
//     await billApi.deletecategory(e);
//     setLoad(!load);
//   };
  const handleClickDetail = (e) => {
    history.push(`${url}/DetailBill/${e}`);
  };
  return (
    <div className="AdminTable">
      <div className="heading">
        <div className="heading__title">
          <h3>Hoá đơn</h3>
        </div>
        <div className="heading__hr"></div>
      </div>

      {data !== null ? (
        <div>
          <Table
            titleTable={titleTable}
            hidentDot
            // onchangeDelete={onchangeDelete}
            // onchangeEdit={onchangeEdit}
            dataSource={data.rows.map((ok, index) => ({
              key: ok.id,
              user: ok.userName,
              phone: ok.phone,
              address: ok.address,
              time: formatDate(ok.createdAt),
            //   status: ok.id,
              status: (
                <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    value={ ok.status}
                    onChange={(e) => handleStatus(e.target.value,ok.id)}
                    select
                    label=""
                >
                <MenuItem key={1} value="0">
                    Đang sử lý
                </MenuItem>
                <MenuItem key={2} value="1">
                    Đang được gửi
                </MenuItem>
                <MenuItem key={2} value="2">
                    Đã nhận
                </MenuItem>
                </TextField>
              ),
              detail: (
                <p
                  style={{ cursor: "pointer", color: "orange" }}
                  onClick={() => handleClickDetail(ok.id)}
                >
                  Chi tiết
                </p>
              ),
            }))}
          />
          <Pagination
            onChange={(e, i) => {
              setPage(i);
            }}
            count={countPagination(data.count)}
            color="secondary"
            variant="outlined"
            shape="rounded"
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

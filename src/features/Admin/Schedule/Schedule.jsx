import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useRouteMatch } from "react-router-dom";
import { add } from "../svg/IconSvg";
import { MenuItem, TextField } from "@material-ui/core";
import scheduleApi from "../../../api/ScheduleApi";
import { countPagination, formatDate } from "../../../function";
import Spinner from "../Spin/Spinner";
import Table from "../Table/Table";
export default function Schedule() {
  const { url } = useRouteMatch();
  const titleTable = [
    { title: "Người đặt", name: "name" },
    { title: "Điện thoại", name: "phone" },
    { title: "Địa chỉ", name: "address" },
    { title: "Thời gian", name: "time" },
    { title: "Trạng thái", name: "status" },
    { title: "Chi tiết", name: "detail" },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    scheduleApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
      scheduleApi.getRevenueService({ status: 2 })
  }, [load, page]);
  const history = useHistory();
  const handleStatus = async (e,id) => {
    await scheduleApi.editschedule({ status: e, id: id });
    setLoad(!load);
  };
//   const onchangeEdit = (e) => {
//     history.push(`${url}/AddCategory/${e}`);
//   };
//   const onchangeDelete = async (e) => {
//     await scheduleApi.deletecategory(e);
//     setLoad(!load);
//   };
  const handleClickDetail = (e) => {
    history.push(`${url}/ScheduleDetail/${e}`);
  };
  return (
    <div className="AdminTable">
        <div className="heading">
            <div className="heading__title">
            <h3>Lịch Spa</h3>
            </div>
            <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
            <button>
            <Link to={`${url}/RegisterService/1`}>
                <div className="icon">{add}</div>
                <div className="text">Thêm lịch</div>
            </Link>
            </button>
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
              name: ok.name,
              phone: ok.phone,
              address: ok.address,
              time: formatDate(ok.date),
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
                    Đã xác nhận
                </MenuItem>
                <MenuItem key={3} value="2">
                    Đã hoàn thành
                </MenuItem>
                <MenuItem key={4} value="3">
                    Đã hủy
                </MenuItem>
                {/* <MenuItem key={2} value="2">
                    Đã nhận
                </MenuItem> */}
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

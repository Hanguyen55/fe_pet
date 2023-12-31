import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import scheduleApi from "../../../api/ScheduleApi";
import Spinner from "../Spin/Spinner";
import "../../../sass/RegisterService/ScheduleDetail.scss";
import { formatDate } from "../../../function";
export default function ScheduleDetail() {
  const { id } = useParams();

  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    scheduleApi
      .getOne(id)
      .then((ok) => {
        setSchedule(ok);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="AdminTable">
      <div className="heading">
        <div className="heading__title">
          <h3>Chi tiết đặt lịch</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="bill-detail">
        {schedule ? (
          <div className="container">
            <div className="schedule-detail">
              <div className="title">Loại dịch vụ: {schedule.serviceId}</div>
              <div className="form">
                <p>
                  <div className="text-bold">Tên Người dùng</div>:{" "}
                  {schedule.name}
                </p>
                <p>
                  <div className="text-bold">Số điện thoại</div>:{" "}
                  {schedule.phone}
                </p>
                <p>
                  <div className="text-bold">Địa chỉ</div>: {schedule.address}
                </p>
                <p>
                  <div className="text-bold">Loại thú cưng</div>:{" "}
                  {schedule.petId}
                </p>
                <p>
                  <div className="text-bold">Cân nặng</div>:{" "}
                  {Number(schedule.weightId).toLocaleString()}
                </p>
                <p>
                  <div className="text-bold">Thời gian</div>:{" "}
                  {formatDate(schedule.date)}
                </p>
                <p>
                  <div className="text-bold">Tổng tiền</div>:{" "}
                  {Number(schedule.result).toLocaleString()} vnđ
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

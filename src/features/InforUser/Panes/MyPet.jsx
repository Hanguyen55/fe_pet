import { Grid, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { useParams } from "react-router";
import petApi from "../../../api/petApi";
import { messageShowErr, messageShowSuccess } from "../../../function";
import "../../../sass/InforUser/MyPet.scss";
import {
  petCheckNull,
  petCheckPending,
  petCheckSuccess,
} from "../../Admin/svg/IconSvg";
export default function MyPet() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    petApi.getPetUser(id).then((ok) => {
      setData(ok.rows);
    });
  }, [load]);
  const renderCheckAdmin = (e) => {
    if (e === 0) {
      return <Tooltip title="Chưa bật kiểm duyệt">{petCheckNull}</Tooltip>;
    } else if (e === 1) {
      return <Tooltip title="Chưa kiểm duyệt">{petCheckPending}</Tooltip>;
    } else {
      return <Tooltip title="Đã kiểm duyệt">{petCheckSuccess}</Tooltip>;
    }
  };
  const hangdleOnclick = (status, checkAdmin, id) => {
    if (status === 1) {
      setData(null);
      petApi
        .editpet({
          status: 0,
          id: id,
        })
        .then((data) => {
          messageShowSuccess("Ẩn thành công!");
        })
        .catch((err) => {
          messageShowErr("Có lỗi xảy ra!");
        });
    } else {
      if (checkAdmin === 0) {
        setData(null);
        petApi
          .editpet({ checkAdmin: 1, id, id })
          .then((data) => {
            messageShowSuccess("Đã gửi yêu cầu duyệt tới admin!");
          })
          .catch((err) => {
            messageShowErr("Có lỗi xảy ra!");
          });
      } else if (checkAdmin === 1) {
        messageShowSuccess("Đang trong quá trình đợi duyệt!");
      } else {
        setData(null);
        petApi
          .editpet({
            status: 1,
            id: id,
          })
          .then((data) => {
            messageShowSuccess("Thú cưng đã có trong cửa hàng!");
          })
          .catch((err) => {
            messageShowErr("Có lỗi xảy ra!");
          });
      }
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <div className="tab-pane">
      <Grid container spacing={4}>
        {data?.map((ok, index) => (
          <Grid item lg={6} md={6} sm={6} xs={12} key={index}>
            <div className="myPet">
              <div className="avatar">
                <img src={ok.avatar} alt="" />
              </div>
              <div className="text">
                <div className="text_name">{ok.name}</div>
                <div className="text_price">
                  {parseInt(ok.price).toLocaleString()} vnđ
                </div>

                <div className="detail">
                  Chi tiết ...
                  <div className="detail-content">
                    <div className="description">
                      <div className="detail-content-title">Mô tả</div>
                      {ok.description}
                    </div>
                    <div className="text-detail">
                      <div className="detail-content-title">Điểm nổi bật</div>
                      {renderHTML(ok.text)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkadmin">
                {renderCheckAdmin(ok.checkAdmin)}
              </div>
              <p className="btn-delete">Xoá</p>
              {ok.status === 1 ? (
                <p
                  className="btn-no"
                  onClick={() => hangdleOnclick(1, ok.checkAdmin, ok.id)}
                >
                  Không bán
                </p>
              ) : (
                <p
                  className="btn-yes"
                  onClick={() => hangdleOnclick(0, ok.checkAdmin, ok.id)}
                >
                  Đăng bán
                </p>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

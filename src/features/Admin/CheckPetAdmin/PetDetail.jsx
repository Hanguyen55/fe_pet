import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import petApi from "../../../api/petApi";
import "../../../sass/Admin/PetDatail.scss";
import reactRenderHtml from "react-render-html";
export default function PetDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    petApi.getOne(id).then((ok) => {
      setData(ok);
    });
  }, []);
  return (
    <div className="PetDetail">
      <div className="heading">
        <div className="heading__title">
          <h3>Kiểm tra thú cưng</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <div className="avatar">
          <div className="title">Ảnh đại diện</div>
          <img src={data?.avatar} alt="" />
        </div>
        <div className="list-avatar">
          <div className="title">Ảnh liên quan</div>
          {data?.imgpet?.map((oki) => (
            <img src={oki.link} alt="" />
          ))}
        </div>
        <div className="price">
          <div className="title">Giá</div>
          {data?.price}
        </div>
        <div className="description">
          <div className="title">mô tả</div>
          {data?.description}
        </div>
        <div className="text">
          <div className="title">Chi tiết</div>
          {reactRenderHtml(data ? data?.text : "")}
        </div>
      </div>
    </div>
  );
}

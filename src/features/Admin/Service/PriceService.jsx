import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useRouteMatch } from "react-router-dom";
import priceServicesApi from "../../../api/priceServicesApi";
import weightApi from "../../../api/weightApi";
import ServiceApi from "../../../api/ServiceApi";
import { countPagination, formatDate, getValue } from "../../../function";
import Spinner from "../Spin/Spinner";
import { add, statusOff, statusOn } from "../svg/IconSvg";
import Table from "../Table/Table";
import renderHTML from "react-render-html";

export default function PriceService() {
    const { url } = useRouteMatch();
    const titleTable = [
        { title: "Dịch vụ", name: "services" },
        { title: "Cân nặng", name: "weights" },
        { title: "Giá", name: "price" },
        { title: "Ngày tạo", name: "time" },
        // { title: "action", name: "action" },
      ];
  
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        priceServicesApi.getAllPrice().then((ok) => {
            setData(ok.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [load,page]);
    const history = useHistory();
    const onchangeEdit = (e) => {
      history.push(`${url}/AddPriceService/${e}`);
    };
    const onchangeDelete = async (e) => {
      await priceServicesApi.deletePriceServices(e);
      setLoad(!load);
    };
    return (
      <div className="AdminTable">
        <div className="heading">
          <div className="heading__title">
            <h3>Giá dịch vụ</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to={`${url}/AddPriceService`}>
              <div className="icon">{add}</div>
              <div className="text">Thêm giá dịch vụ</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              onchangeEdit={onchangeEdit}
              dataSource={data.map((ok, index) => ({
                key: ok.id,
              services: ok.service,
              weights: ok.weight,
              price: ok.price,
              time: formatDate(ok.createdAt),
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
    );
}

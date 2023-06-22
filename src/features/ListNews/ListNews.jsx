import { Container, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import newApi from "../../api/newApi";
import { countPagination } from "../../function";
import "../../sass/ListNews/ListNews.scss";
import Banner from "../Banner/Banner";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export default function ListNews() {
  const listBread = [{ name: "Trang chủ", link: "/" }, { name: "Tin tức" }];
  const { path } = useRouteMatch();
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
    newApi.getNewHome({ page: page }).then((ok) => {
      setData(ok.data);
    });
  }, [page]);
  return (
    <div className="ListNews">
      <Banner />
      <Breadcrumbs breadCrumbList={listBread} />
      <Container>
        <div className="heading-detail">
          <div className="heading-detail__title">
            <h3>Tin tức</h3>
          </div>
          <div className="heading-detail__hr"></div>
        </div>
        <Grid container spacing={2} className="content-item">
          {data?.rows?.map((ok, index) => (
            <Grid item lg={3} md={3} sm={6} key={index}>
              <div className="item-new">
                <div className="img">
                  <img src={ok.avatar} alt="" />
                </div>
                <div className="text">
                  <div className="text-title">
                    <Link to={`${path}/${ok.id}`}>{ok.name}</Link>
                  </div>
                  <div className="text-content">{ok.samary}</div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Pagination
          onChange={(e, i) => {
            setPage(i);
          }}
          count={countPagination(data?.count, 8)}
          color="secondary"
          variant="outlined"
          shape="rounded"
        />
      </Container>
    </div>
  );
}

import { Container, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import categoryApi from "../../../api/CategoryApi";
import petApi from "../../../api/petApi";
import {
  countPagination,
  messageShowErr,
  messageShowSuccess,
} from "../../../function";
import "../../../sass/Shop/ShopPet.scss";
import { addListCart } from "../../../app/Slice/CartSlide";
import { search } from "../../Admin/svg/IconSvg";
import Banner from "../../Banner/Banner";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
export default function ShopPet() {
  const listBread = [{ name: "Trang chủ", link: "/" }, { name: "Cửa hàng" }];
  const { path } = useRouteMatch();
  const [categoryData, setCategoryData] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [petOrProduct, setPetOrProduct] = useState("pet");
  const [category, setCategory] = useState("Thức ăn cho chó");
  const [countPet, setCountPet] = useState(null);
  const typingTimeout = useRef(null);
  const listCart = useSelector((state) => state.cart.listCart);
  useEffect(() => {
    petApi.getShop({ page, type, category, petOrProduct, name }).then((ok) => {
      setData(ok.data);
    });
  }, [page, type, category, petOrProduct, name]);

  useEffect(() => {
    categoryApi.getAll({ status: 1 }).then((ok) => {
      setCategoryData(ok.data.rows);
    });
    petApi.countTypePet().then((ok) => {
      setCountPet(ok);
    });
    window.scrollTo(0, 0);
  }, []);

  const onChangeName = (e) => {
    const { value } = e.target;
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      setName(value);
    }, 300);
  };

  const onChangeTypePet = (e) => {
    setPetOrProduct("pet");
    setType(e);
  };

  const onChangeCategory = (e) => {
    setPetOrProduct("product");
    setCategory(e);
  };

  const dispatch = useDispatch();

  const handleAddCart = (infor) => {
    let isExist = listCart.find(
      (x) => x.id === infor.id && x.name === infor.name,
    );
    infor = { ...infor, quantityCurrent: 1 };
    if (isExist) {
      messageShowErr("Sản phẩm đã có trong giỏ hàng!");
    } else {
      dispatch(addListCart(infor));
      messageShowSuccess("Thêm giỏ hàng thành công!");
    }
  };

  return (
    <div className="Shop">
      <Banner />
      <Breadcrumbs breadCrumbList={listBread} />
      <Container>
        <div className="heading-detail">
          <div className="heading-detail__title">
            <h3>Cửa hàng tiện lợi</h3>
          </div>
          <div className="heading-detail__hr"></div>
        </div>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <div className="left">
              <div className="search">
                <div className="title">Tìm kiếm</div>
                <div className="input-search ">
                  <input type="text" name="name" onChange={onChangeName} />
                  <div className="icon">{search}</div>
                </div>
              </div>
              <div className="category">
                <div className="title">Thú cưng</div>
                <div className="content">
                  <div className="item" onClick={() => onChangeTypePet("chó")}>
                    <div className="name">Chó</div>
                    <div className="count">{countPet?.countDog}</div>
                  </div>
                  <div className="item" onClick={() => onChangeTypePet("mèo")}>
                    <div className="name">Mèo</div>
                    <div className="count">{countPet?.countCat}</div>
                  </div>
                  <div className="item" onClick={() => onChangeTypePet("khác")}>
                    <div className="name">Khác</div>
                    <div className="count">{countPet?.countOther}</div>
                  </div>
                  <div className="item" onClick={() => onChangeTypePet(null)}>
                    <div className="name">Tất cả</div>
                    <div className="count">{countPet?.countAll}</div>
                  </div>
                </div>
              </div>
              <div className="grand">
                <div className="title">Danh mục sản phẩm</div>
                <div className="content">
                  {categoryData?.map((ok, index) => (
                    <div
                      className="item"
                      onClick={() => onChangeCategory(ok.name)}
                      key={index}
                    >
                      {ok.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={9} md={9} sm={9} xs={12}>
            <Grid container spacing={2}>
              {data?.rows?.map((ok, index) => (
                <Grid item lg={3} md={4} sm={6} key={index}>
                  <div className="item-pet">
                    <div className="img">
                      <img src={ok.avatar} alt="" />
                      <div
                        className="add-cart"
                        onClick={() => handleAddCart(ok)}
                      >
                        Thêm vào giỏ
                      </div>
                      <div className="blur"></div>
                    </div>
                    <div className="name">
                      <Link to={`${path}/${petOrProduct}/${ok.id}`}>
                        {ok.name}
                      </Link>
                    </div>
                    <div className="price">
                      <div className="price2">
                        {parseInt(ok.price).toLocaleString()}
                      </div>
                      <div className="gia">VNĐ</div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Pagination
          onChange={(e, i) => {
            setPage(i);
          }}
          count={countPagination(data?.count)}
          color="secondary"
          variant="outlined"
          shape="rounded"
        />
      </Container>
    </div>
  );
}

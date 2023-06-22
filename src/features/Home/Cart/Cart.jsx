import { Drawer } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeListCart } from "../../../app/Slice/CartSlide";
import { messageShowErr, messageShowSuccess } from "../../../function";
import "../../../sass/Home/Cart.scss";
import { cart } from "../../Admin/svg/IconSvg";
import Payment from "../Payment/Payment";

export default function Cart() {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [statusDialog, setStatusDialog] = useState(false);
  const listCart = useSelector((state) => state.cart.listCart);
  const userInfor = useSelector((state) => state.user.userInfor);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(removeListCart(id));
  };

  const handlePayment = () => {
    if (userInfor.length === 0) {
      messageShowErr("Bạn cần đăng nhập trước!");
    } else {
      if (!userInfor.address || !userInfor.phone) {
        messageShowErr("Bạn cần cập nhật địa chỉ và số điện thoại trước!");
      } else {
        setStatusDialog(true);
      }
    }
  };

  const handleCloseDialog = () => {
    setStatusDialog(false);
  };

  return (
    <div className="cart">
      {listCart?.length !== 0 && (
        <div className="number">{listCart?.length}</div>
      )}
      <div className="icon" onClick={() => setToggleDrawer(!toggleDrawer)}>
        {cart}
      </div>
      {userInfor && (
        <Payment
          statusDialog={statusDialog}
          onClose={handleCloseDialog}
          userInfor={userInfor}
          listCart={listCart}
        />
      )}
      <Drawer
        key="12"
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(!toggleDrawer)}
      >
        <div className="cart-content">
          <div className="title">
            Giỏ hàng <div className="hr"></div>
          </div>
          <div className="content">
            <div className="content-header">
              <div className="sp">Sản phẩm</div>
              <div className="dg">Đơn giá</div>
              <div className="sl">Số lượng</div>
              <div className="st">Số tiền</div>
              <div className="tt">Thao tác</div>
            </div>
            {listCart?.map((ok, index) => (
              <div className="content-product" key={index}>
                <div className="sp">
                  <div className="avatar">
                    <img src={ok.avatar} alt="" />
                  </div>
                  <div className="text">{ok.name}</div>
                </div>
                <div className="dg">₫{Number(ok.price).toLocaleString()}</div>
                <div className="sl">{ok.quantityCurrent}</div>
                <div className="st">
                  ₫{Number(ok.priceResult).toLocaleString()}
                </div>
                <div
                  className="tt"
                  onClick={() => handleDelete(ok.id)}
                  style={{ cursor: "pointer" }}
                >
                  Xoá
                </div>
              </div>
            ))}
          </div>
          {listCart?.length > 0 && (
            <div className="btn">
              <button type="submit" onClick={handlePayment}>
                Thanh toán
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}

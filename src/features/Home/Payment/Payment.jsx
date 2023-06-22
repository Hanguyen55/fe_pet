import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useEffect, useState } from "react";
import "../../../sass/Home/Payment.scss";
import Slide from "@material-ui/core/Slide";
import { DialogContentText } from "@material-ui/core";
import billApi from "../../../api/billApi";
import { messageShowSuccess } from "../../../function";
import { useDispatch } from "react-redux";
import { resetCart } from "../../../app/Slice/CartSlide";
import productApi from "../../../api/productApi";
import petApi from "../../../api/petApi";
export default function Payment({
  onClose,
  statusDialog,
  userInfor,
  listCart,
}) {
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  console.log(listCart);
  const handleClose = () => {
    onClose();
  };

  const handleClosePopConfirm = () => {
    setOpenPopconfirm(false);
  };

  const handleGetResult = () => {
    let result = 0;
    listCart.forEach((el) => {
      result += el.priceResult;
    });
    return Number(result).toLocaleString();
  };

  const handleAgree = () => {
    setOpenPopconfirm(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const dispatch = useDispatch();

  const handleAgreePopConfirm = () => {
    setOpenPopconfirm(false);
    onClose();
    billApi
      .postbill({
        userName: userInfor.firstName + " " + userInfor.lastName,
        address: userInfor.address,
        phone: userInfor.phone,
        listProduct: JSON.stringify(listCart),
        price: userInfor.price,
      })
      .then((ok) => {
        let quantityProduct = [];
        let quantityPet = [];
        listCart.forEach((el) => {
          if (!el.type) {
            quantityProduct.push({
              id: el.id,
              quantity: el.quantity - el.quantityCurrent,
              avatar: el.avatar,
            });
          } else {
            quantityPet.push({
              id: el.id,
              checkAdmin: el.checkAdmin,
              type: el.type,
              quantity: el.quantity - el.quantityCurrent,
            });
          }
        });
        if (quantityProduct.length !== 0) {
          productApi.updateQuantityProduct(quantityProduct);
        }
        if (quantityPet.length !== 0) {
          petApi.updateQuantityPet(quantityPet);
        }

        dispatch(resetCart());
        messageShowSuccess("Lên đơn thành công bạn sẽ được liên hệ sớm!");
      });
  };

  return (
    <div className="payment">
      <Dialog
        open={statusDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thanh toán</DialogTitle>
        <DialogContent>
          <div className="infor">
            <div className="infor_title">Thông tin sản phẩm</div>
            <div className="infor_content">
              {listCart?.map((ok, index) => (
                <div className="box" key={index}>
                  <div className="box_title">
                    {index + 1}. {ok.name}
                  </div>
                  <div className="box_content">
                    <div className="item">Số lượng: {ok.quantityCurrent}</div>
                    <div className="item">
                      Giá: {Number(ok.priceResult).toLocaleString()} vnđ
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="result">Thành tiền: {handleGetResult()}vnđ</div>
          <form>
            <div className="input-admin">
              <label htmlFor="">Địa chỉ</label>
              <input type="text" value={userInfor.address} readOnly />
            </div>
            <div className="input-admin">
              <label htmlFor="">Điện thoại</label>
              <input type="text" value={userInfor.phone} readOnly />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button id="hello" onClick={handleAgree} color="secondary">
            Đồng ý
          </Button>
        </DialogActions>
        <Dialog
          open={openPopconfirm}
          TransitionComponent={Transition}
          keepMounted
          className="popConfirm-dialog"
          onClose={handleClosePopConfirm}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Thông báo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Bạn đồng ý tiếp tục tiến hành giao dịch? Bạn không thể huỷ giao
              dịch khi đã bấm tiếp tục.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopConfirm} color="primary">
              Huỷ bỏ
            </Button>
            <Button onClick={handleAgreePopConfirm} color="secondary">
              Tiếp tục
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </div>
  );
}

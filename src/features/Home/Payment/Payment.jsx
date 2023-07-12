import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../../../sass/Home/Payment.scss";
import Slide from "@material-ui/core/Slide";
import { DialogContentText } from "@material-ui/core";
import billApi from "../../../api/billApi";
import { messageShowSuccess } from "../../../function";
import { useDispatch } from "react-redux";
import { resetCart } from "../../../app/Slice/CartSlide";
import productApi from "../../../api/productApi";
import petApi from "../../../api/petApi";
import userApi from "../../../api/userApi";
import QR from "../../../images/qr.jpg";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';

export default function Payment({
  onClose,
  statusDialog,
  userInfor,
  listCart,
}) {
    useEffect(() => {
            userApi.getOne(userInfor.id).then((ok) => {
                setAddress(ok?.address)
                setPhone(ok?.phone)
                setCheckRadio(null)
                setError(true);
          });
      }, [userInfor]);
  const [data, setData] = useState();
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const [checkRadio, setCheckRadio] = useState(null);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [errors, setErrors] = useState({
      address: {
        status: false,
        message: "",
    },
      phone: {
        status: false,
        message: "",
    },
  });
  console.log(userInfor);
  const history = useHistory();
  const handleClose = () => {
    setCheckRadio(null)
    setHelperText('');
    setError(false);
    onClose();
  };

  const handleClosePopConfirm = () => {
    setCheckRadio(null)
    setHelperText('');
    setError(false);
    setOpenPopconfirm(false);
    onClose();
  };

  const handleGetResult = () => {
    let result = 0;
    listCart.forEach((el) => {
      result += el.priceResult;
    });
    var ship = (result/100) *5;
    // var all = result + ship;
    return Number(result).toLocaleString();
  };

  const handleGetShip = () => {
    let result = 0;
    listCart.forEach((el) => {
      result += el.priceResult;
    });
    var ship = (result/100) *5
    return Number(ship).toLocaleString();
  };

  const handleRadioChange = (event) => {
    setCheckRadio((event.target).value)
  };
  const handleCheckPhone = (e) => {
    setAddress(e.target.value)
    if(typeof phone === 'string' && phone.length === 0){
        setErrors((prevState) => ({
            ...prevState,
            phone: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(phone.length === 11) {
        setErrors((prevState) => ({
            ...prevState,
            phone: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
        setErrors((prevState) => ({
            ...prevState,
            phone: {
                message: "Số điện thoại không hợp lệ",
                status: true,
            }
        }));
    } else {
        setErrors((prevState) => ({
            ...prevState,
            phone: {
                message: "",
                status: false,
            }
          }));
    }
  };
  const handleAgree = () => {
   

    if(typeof address === 'string' && address.length === 0){
        setErrors((prevState) => ({
            ...prevState,
            address: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(address.length === 255) {
        setErrors((prevState) => ({
            ...prevState,
            address: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else {
        setErrors((prevState) => ({
            ...prevState,
            address: {
                message: "",
                status: false,
            }
          }));
    }
   if(checkRadio === null) {
    setHelperText('Không được bỏ trống');
    setError(true);
   }
    else {
        // setOpenPopconfirm(true);
        // setCheckRadio(null)
        setHelperText('');
        setError(false);
    }
    if(!errors.address.status
        && !errors.phone.status
        && error === false
        && checkRadio !==null) {
            setOpenPopconfirm(true);
    }
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
        userId: userInfor.id,
        userName: userInfor.firstName + " " + userInfor.lastName,
        address: address,
        phone: phone,
        listProduct: JSON.stringify(listCart),
        price: handleGetResult(),
        status: 0,
        paymentType: checkRadio,
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
        setCheckRadio(null)
        setHelperText('');
        setError(false);
        history.push(`/`);
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
          {/* <div className="">Phí ship: {handleGetShip()}vnđ</div> */}
          <div className="result">Thành tiền: {handleGetResult()}vnđ</div>
          <form>
          <label htmlFor="">Hình thức thanh toán</label>
          <FormControl error={error} >
          <div className="input-radio">
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleRadioChange}
            >
                <FormControlLabel value="0" control={<Radio />} label="Thanh toán khi nhận hàng" className="input-radio2" />
                <FormControlLabel value="1" control={<Radio />} label="Chuyển khoản" className="input-radio2" />
            </RadioGroup>
            </div>
            <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            <div className="input-admin">
              <label htmlFor="">Địa chỉ</label>
              <TextField
                label=" "
                InputLabelProps={{shrink: false}}
                value={address}
                onChange={(e) => handleCheckPhone(e)}
            />
            {errors.address.status && (
                    <span className="text-danger">{errors.address.message}</span>
                )}
            </div>
            <div className="input-admin">
              <label htmlFor="">Điện thoại</label>
              <TextField
                label=" "
                InputLabelProps={{shrink: false}}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone.status && (
                    <span className="text-danger">{errors.phone.message}</span>
                )}
              {/* <input type="text" onChange={(e) => setMessage(e.target.value)}
            //   value={message}
              {...register("phone", {})} /> */}
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
            {checkRadio === "0"?
            <DialogContentText id="alert-dialog-slide-description">
            Bạn đồng ý tiếp tục tiến hành giao dịch? Bạn không thể huỷ giao
            dịch khi đã bấm tiếp tục.
          </DialogContentText>:
          <img className="img-qr" src={QR} alt="" />}
            {/* <DialogContentText id="alert-dialog-slide-description">
              Bạn đồng ý tiếp tục tiến hành giao dịch? Bạn không thể huỷ giao
              dịch khi đã bấm tiếp tục.
            </DialogContentText> */}
            <DialogContentText id="alert-dialog-slide-description">
              Nhân viên sẽ liên hệ và xác nhận với bạn trong thời gian sớm nhất.
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

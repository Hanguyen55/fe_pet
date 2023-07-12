import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import userApi from "../../api/userApi";
import { getName, messageShowErr, messageShowSuccess } from "../../function";
import imgDog from "../../images/login.png";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import "../../sass/Login/Login.scss";
import {
  eyeHidenLogin,
  eyeShowLogin,
  lockLogin,
  nameLogin,
  userLogin,
} from "../Admin/svg/IconSvg";
export default function Register() {
  const [showPass, setShowPass] = useState("password");
  const clickShowPass = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };
  const [showRePass, setShowRePass] = useState("password");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [checkRadio, setCheckRadio] = useState(null);
  const clickShowRePass = () => {
    setShowRePass(showRePass === "password" ? "text" : "password");
  };
  const style = {
    background: `url(${imgDog}) center no-repeat`,
    backgroundSize: "cover",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const history = useHistory();
  const avatarDefault =
    "https://cdn.pixabay.com/photo/2016/11/22/23/18/kingfisher-1851127_960_720.jpg";
    const handleRadioChange = (event) => {
        setCheckRadio((event.target).value)
      };
  const onSubmit = async (data) => {
    console.log("datauser",data,checkRadio);
    if(checkRadio === null) {
        setHelperText('Không được bỏ trống');
        setError(true);
       }
    else {
    userApi
      .postuser({
        name:data.firstName + " " + data.lastName,
        email: data.email,
            phone: data.phone,
            address: data.address,
            male: checkRadio,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: avatarDefault,
        status: 1,
        roleId: 1,
      })
      .then((ok) => {
        if (ok?.message === "Email đã tồn tại!") {
          messageShowErr("Email của bạn đã được đăng ký!");
        } else {
          messageShowSuccess("Đăng ký thành công!");
          history.push("/Login");
        }
      });
        // setCheckRadio(null)
        setHelperText('');
        setError(false);
       }
  };
  return (
    <div>
      <div className="Login" style={style}>
        <div className="blur"></div>
        <div className="box-login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="title-login">Đăng ký</div>
            <div className="form-account">
              <label htmlFor="">Họ người dùng</label>
              <div className="input">
                <div className="icon">{nameLogin}</div>
                <input
                  type="text"
                  id=""
                  {...register("lastName", {
                    required: "Không được để trống!",
                  })}
                />
              </div>
              {errors.lastName && (
                <p className="text-danger">{errors.lastName.message}</p>
              )}
            </div>
            <div className="form-account">
              <label htmlFor="">Tên người dùng</label>
              <div className="input">
                <div className="icon">{nameLogin}</div>
                <input
                  type="text"
                  id=""
                  {...register("firstName", {
                    required: "Không được để trống!",
                  })}
                />
              </div>
              {errors.firstName && (
                <p className="text-danger">{errors.firstName.message}</p>
              )}
            </div>
            <label htmlfor="">Giới tính</label>
            <FormControl error={error} >
          <div className="input-radio">
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleRadioChange}
            >
                <FormControlLabel value="1" control={<Radio />} label="Nam" className="input-radio2" />
                <FormControlLabel value="0" control={<Radio />} label="Nữ" className="input-radio2" />
            </RadioGroup>
            </div>
            </FormControl>
            <FormHelperText className="style-male">{helperText}</FormHelperText>
            <div className="form-account">
              <label htmlFor="">Số điện thoại</label>
              <div className="input">
                <div className="icon">{nameLogin}</div>
                <input
                  type="text"
                  id=""
                  {...register("phone", {
                    required: "Không được để trống!",
                    maxLength: { value: 11, message: "Vượt quá ký tự cho phép!" },
                    pattern: {
                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                        message: "Không đúng định dạng số điện thoại!",
                      },
                  })}
                />
              </div>
              {errors.phone && (
                <p className="text-danger">{errors.phone.message}</p>
              )}
            </div>
            <div className="form-account">
              <label htmlFor="">Địa chỉ</label>
              <div className="input">
                <div className="icon">{nameLogin}</div>
                <input
                  type="text"
                  id=""
                  {...register("address", {
                    required: "Không được để trống!",
                  })}
                />
              </div>
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </div>
            <div className="form-account">
              <label htmlFor="">Email đăng nhập</label>
              <div className="input">
                <div className="icon">{userLogin}</div>
                <input
                  type="text"
                  id=""
                  {...register("email", {
                    required: "Không được để trống!",
                    pattern: {
                      value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      message: "Không đúng định dạng email!",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="form-password">
              <label htmlFor="">Mật khẩu</label>
              <div className="input">
                <div className="icon">{lockLogin}</div>
                <input
                  type={`${showPass}`}
                  id=""
                  className="pass"
                  {...register("password", {
                    required: "Không được để trống!",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu ít nhất 6 ký tự!",
                    },
                    maxLength: {
                      value: 20,
                      message: "Mật khẩu quá dài!",
                    },
                  })}
                />

                <div className="icon-show" onClick={clickShowPass}>
                  {showPass === "password" ? eyeHidenLogin : eyeShowLogin}
                </div>
              </div>
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="form-password">
              <label htmlFor="">Nhập lại mật khẩu</label>
              <div className="input">
                <div className="icon">{lockLogin}</div>
                <input
                  type={`${showRePass}`}
                  {...register("rePassword", {
                    required: "Không được để trống!",
                    validate: (value) =>
                      value === password.current ||
                      "Không trùng khớp với mật khẩu!",
                  })}
                  id=""
                  className="pass"
                />
                <div className="icon-show" onClick={clickShowRePass}>
                  {showRePass === "password" ? eyeHidenLogin : eyeShowLogin}
                </div>
              </div>
              {errors.rePassword && (
                <p className="text-danger">{errors.rePassword.message}</p>
              )}
            </div>
            <div className="btn-login">
              <button style={{ color: "white" }}>Đăng ký</button>
            </div>
            {/* <div className="login-other">
              <div className="text">Hoặc đăng nhập với</div>
              <div className="icon-login">
                <div className="icon" style={{ backgroundColor: "#087ceb" }}>
                  {facebook}
                </div>
                <div className="icon" style={{ backgroundColor: "#1da1f3" }}>
                  {twitter}
                </div>
                <div className="icon" style={{ backgroundColor: "#ea4235" }}>
                  {google}
                </div>
              </div>
            </div> */}
            <div className="login-2">
              <Link to="/Login">Đăng nhập</Link>
              <span> nếu bạn đã có tài khoản</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

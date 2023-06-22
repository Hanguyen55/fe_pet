import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import loginApi from "../../api/loginApi";
import { userData } from "../../app/Slice/UserSlice";
import { messageShowErr, messageShowSuccess } from "../../function";
import imgDog from "../../images/login.png";
import "../../sass/Login/Login.scss";
import {
  eyeHidenLogin,
  eyeShowLogin,
  facebook,
  google,
  lockLogin,
  twitter,
  userLogin,
} from "../Admin/svg/IconSvg";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState("password");
  const clickShowPass = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };
  const style = {
    background: `url(${imgDog}) center no-repeat`,
    backgroundSize: "cover",
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const actionResult = async (page) => {
    await dispatch(userData());
  };
  const onSubmit = async (data) => {
    await loginApi
      .login({ email: data.email, password: data.password })
      .then((ok) => {
        if (ok === "err") {
          messageShowErr("Email hoặc mật khẩu không chính xác!");
        } else {
          messageShowSuccess(`Đăng nhập thành công!`);
          localStorage.setItem("tokenPet", ok);
          setTimeout(() => {
            actionResult();
          }, 300);
          history.push("/");
        }
      });
  };
  return (
    <div className="Login" style={style}>
      <div className="blur"></div>
      <div className="box-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="title-login">Đăng nhập</div>
          <div className="form-account">
            <label htmlFor="">Tài khoản</label>
            <div className="input">
              <div className="icon">{userLogin}</div>
              <input
                type="text"
                {...register("email", {
                  required: "Không được để trống!",
                  pattern: {
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: "Không đúng định dạng email!",
                  },
                })}
                id=""
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
                id=""
                className="pass"
              />
              <div className="icon-show" onClick={clickShowPass}>
                {showPass === "password" ? eyeHidenLogin : eyeShowLogin}
              </div>
            </div>
          </div>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
          <div className="forgot">
            <span>Quên mật khẩu?</span>
          </div>
          <div className="btn-login">
            <button style={{ color: "white" }}>Đăng nhập</button>
          </div>
          <div className="login-other">
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
          </div>
          <div className="register">
            <Link to="/Register">Đăng ký</Link>
            <span> nếu bạn chưa có tài khoản</span>
          </div>
        </form>
      </div>
    </div>
  );
}

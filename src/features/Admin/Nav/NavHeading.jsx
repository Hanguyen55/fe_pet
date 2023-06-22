import React, { useState } from "react";
import {
  bar,
  bell,
  close,
  group,
  home,
  profile,
  setting,
} from "../svg/IconSvg";
import img1 from "../../../images/pet8.jpg";
import { useRef } from "react";
import { useEffect } from "react";
import { clickAvatar, clickBar } from "./NavJs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function NavHeading() {
  const barEl = useRef(null);
  const liSelectEL = useRef(null);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    clickBar(barEl.current);
    clickAvatar(liSelectEL.current);
  }, []);
  const [checkBar, setCheckBar] = useState(true);
  const hangdleClickBar = () => {
    setCheckBar(!checkBar);
  };
  return (
    <div className="Navheading">
      <div className="bar" onClick={hangdleClickBar} ref={barEl}>
        {checkBar ? bar : close}
      </div>
      <ul>
        <li>
          <div className="notification">{bell}</div>
        </li>
        <li>
          <div className="contact">{group}</div>
        </li>
        <li className="liSelect" ref={liSelectEL}>
          <div className="avatar">
            <img src={user?.avatar} alt="" />
          </div>
          <div className=" blurJs"></div>
          <div className="SelectAvatar ">
            <div className="minimal">
              <h3>Chức vụ</h3>
              <p>Nhân viên quản trị</p>
            </div>
            <div className="hr"></div>
            <ul>
              <li>
                <Link to="/">
                  <div className="icon">{home}</div>
                  <div className="text">Trang chủ</div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <div className="icon">{profile}</div>
                  <div className="profile">Cá nhân</div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <div className="icon">{setting}</div>
                  <div className="setting">Chỉnh sửa</div>
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

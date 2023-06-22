import React from "react";
import { spinner } from "../svg/IconSvg";
import "../../../sass/Admin/Spinner.scss";
export default function Spinner() {
  return (
    <div className="Spinner">
      <div className="icon">{spinner}</div>
    </div>
  );
}

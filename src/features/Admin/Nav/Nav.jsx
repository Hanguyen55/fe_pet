import React from "react";
import "../../../sass/Admin/Nav.scss";
import NavContent from "./NavContent";
import NavHeading from "./NavHeading";
import NavMenu from "./NavMenu";
export default function Nav() {
  return (
    <div className="Nav">
      <NavMenu />
      <div className="nav-right">
        <NavHeading />
        <NavContent />
      </div>
    </div>
  );
}

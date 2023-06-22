import React from "react";
import { Link } from "react-router-dom";
import "../../sass/Breadcrumbs/Breadcrumbs.scss";
export default function Breadcrumbs({ breadCrumbList }) {
  return (
    <div className="Breadcrumbs">
      <div className="list">
        {breadCrumbList.map((ok, index) => (
          <Link to={ok.link ? ok.link : "#"} key={index}>
            {ok.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

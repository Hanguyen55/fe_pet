import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../../sass/Admin/Table.scss";
import { dot, edit, trash } from "../svg/IconSvg";
import { showAction } from "./TableJs";
export default function Table({
  dataSource,
  titleTable,
  onchangeEdit,
  onchangeDelete,
  hidentDot,
}) {
  const tableEl = useRef(null);
  const blurEl = useRef(null);
  useEffect(() => {
    showAction(tableEl.current, blurEl.current);
  }, []);

  let arrTitle = [];
  for (let i = 0; i < titleTable.length; i++) {
    arrTitle.push(titleTable[i].name);
  }

  return (
    <div className="tableAdmin">
      <div className="search"></div>
      <div className="blurJs" ref={blurEl}></div>
      <table ref={tableEl}>
        <thead>
          <tr className="title">
            {titleTable.map((ok, index) => (
              <th key={index}>
                <p>{ok.title}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((ok, index) => (
            <tr className="content" key={ok.key}>
              {arrTitle.map((oki, index1) => (
                <td key={index1}>{ok[oki]}</td>
              ))}
              {hidentDot ? (
                ""
              ) : (
                <td>
                  <div className="action">{dot}</div>
                </td>
              )}

              <React.Fragment>
                <div className="action-content action-hident">
                  <ul>
                    <li>
                      <Link
                        to="#"
                        onClick={() => {
                          onchangeDelete(ok.key);
                        }}
                      >
                        <div className="icon">{trash}</div>
                        <div className="text">Xoá</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        onClick={() => {
                          onchangeEdit(ok.key);
                        }}
                      >
                        <div className="icon">{edit}</div>
                        <div className="text">Sửa</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

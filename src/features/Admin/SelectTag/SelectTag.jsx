import React, { useEffect, useRef, useState } from "react";
import "../../../sass/Admin/SelectTag.scss";
export default function SelectTag({ dataTag, onchangeTag, TagDefault }) {
  const inputEl = useRef(null);
  const dataSelectEl = useRef(null);
  const blurEl = useRef(null);
  // console.log(TagDefault);
  const idTagDefault = (e) => {
    var arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push(e[i].id);
    }
    return arr;
  };
  const [DataInput, setDataInput] = useState([]);
  const onchange = (DataInput) => {
    let id = [];
    for (let i = 0; i < DataInput.length; i++) {
      id.push(Number(DataInput[i].id));
    }
    onchangeTag(id);
  };
  useEffect(() => {
    onchange(DataInput);
    let ListTag = dataSelectEl.current.querySelectorAll(".tag");
    // if (TagDefault.lenght !== 0) {
    //   for (let i = 0; i < ListTag.length; i++) {
    //     if (idTagDefault(TagDefault).includes(Number(ListTag[i].id))) {
    //       ListTag[i].classList.add("active");
    //       let dataActive = dataSelectEl.current.querySelectorAll(".active");
    //       let data = [];
    //       for (let i = 0; i < dataActive.length; i++) {
    //         data.push({
    //           id: dataActive[i].id,
    //           name: dataActive[i].innerText,
    //         });
    //       }
    //       setDataInput(data);
    //     }
    //   }
    // }
    js(inputEl.current, dataSelectEl.current, blurEl.current);
  }, [DataInput]);
  const js = (inputEl, dataSelectEl, blurEl) => {
    let showData = 1;
    let ListTag = dataSelectEl.querySelectorAll(".tag");

    inputEl.onclick = function () {
      console.log(showData);
      if (showData === 1) {
        dataSelectEl.style.display = "block";
        blurEl.classList.add("blur");
        showData--;
      } else {
        dataSelectEl.style.display = "none";
        blurEl.classList.remove("blur");
        showData++;
      }
    };
    blurEl.onclick = function () {
      dataSelectEl.style.display = "none";
      blurEl.classList.remove("blur");
    };
    ListTag.forEach((item, index) => {
      item.onclick = function () {
        item.classList.toggle("active");
        let dataActive = dataSelectEl.querySelectorAll(".active");
        let data = [];
        for (let i = 0; i < dataActive.length; i++) {
          data.push({
            id: dataActive[i].id,
            name: dataActive[i].innerText,
          });
        }
        setDataInput(data);
      };
    });
  };
  return (
    <div className="SelectTag">
      <div className="input" ref={inputEl}>
        {DataInput.map((ok, index) => (
          <div className="tag" id={ok.id}>
            <div className="tag-name">{ok.name}</div>
          </div>
        ))}
      </div>
      <div className="dataSelect" ref={dataSelectEl}>
        {dataTag.map((ok, index) => (
          <div className="tag" id={ok.id}>
            <div className="name">{ok.name}</div>
          </div>
        ))}
      </div>
      <div className="" ref={blurEl}></div>
    </div>
  );
}

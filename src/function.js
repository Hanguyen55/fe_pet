import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
// import dayjs from 'dayjs'
export const formatDate = (e) => {
    var date = new Date(e);
//   var year = e.substr(0, 4);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
  var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
  var hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
  var minute = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
  return hour + ":" + minute + " " + day + "/" + month + "/" + year;
};
export const checkArrayEquar = (a, b) => {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
};
export const getValue = (data,value) => {
    var dataValue;
    data.forEach((el) => {
        if(el.id === value)
        dataValue = el;
    });
      return dataValue;
  };
export const countPagination = (e, i) => {
  if (i) {
    return Math.ceil(e / 8);
  } else {
    return Math.ceil(e / 10);
  }
};
export const messageShowErr = (e) => {
  return Toastify({
    text: e,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #ffd000, #ff8300)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
};
export const messageShowSuccess = (e) => {
  return Toastify({
    text: e,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
};
export const getName = (e) => {
  let index = e.lastIndexOf(" ");
  var firtName = e.slice(0, index);
  var lastName = e.slice(index + 1);
  return { firtsName: firtName, lastName: lastName };
};
export const getMale = (e) => {
  if (e === 1) {
    return "Nam";
  } else {
    return "Nữ";
  }
};
export const setMale = (e) => {
  if (e === "Nam") {
    return 1;
  } else {
    return 0;
  }
};

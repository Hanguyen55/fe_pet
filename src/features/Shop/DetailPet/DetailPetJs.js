export const ClickImg = (imgDefault, listImgEl) => {
  const listImg = listImgEl.querySelectorAll(".img img");
  listImg.forEach((item, index) => {
    item.onclick = function () {
      let imgSrc = item.src;
      imgDefault.setAttribute("src", imgSrc);
    };
  });
};

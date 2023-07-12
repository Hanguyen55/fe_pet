export const showAction = (e, blur) => {
  const actionBtn = e.querySelectorAll(".action");
  const actionsShow = e.querySelectorAll(".action-content");
  const blurJs = blur;

  let i = 0;
  blurJs.onclick = function (e) {
    blurJs.classList.remove("blur");
    actionsShow[i].classList.add("action-hident");
  };
  actionBtn.forEach((item, index) => {
    item.onclick = function (event) {
      i = index;
      event.stopPropagation();
      actionsShow[index].classList.remove("action-hident");
      blurJs.classList.add("blur");
    };
  });
};

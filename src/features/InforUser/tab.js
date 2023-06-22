export const tabJs = (itemEl, panesEl, lineEl) => {
  let tabItems = itemEl.querySelectorAll(".tab-item");
  let tabPanes = panesEl.querySelectorAll(".tab-pane");
  const line = () => {
    var tabActive = itemEl.querySelector(".tab-item.active");

    lineEl.style.left = tabActive.offsetLeft + "px";
    lineEl.style.width = tabActive.offsetWidth + "px";
  };
  for (let i = 0; i < tabItems.length; i++) {
    const element = tabItems[i];
    if (i === 0) {
      element.classList.add("active");
      line();
    }
  }
  for (let i = 0; i < tabPanes.length; i++) {
    const element = tabPanes[i];
    if (i === 0) {
      element.classList.add("active");
    }
  }
  window.addEventListener("resize", () => {
    line();
  });
  tabItems.forEach((item, index) => {
    item.onclick = function (e) {
      itemEl.querySelector(".tab-item.active").classList.remove("active");
      panesEl.querySelector(".tab-pane.active").classList.remove("active");
      item.classList.add("active");
      tabPanes[index].classList.add("active");
      line();
    };
  });
};

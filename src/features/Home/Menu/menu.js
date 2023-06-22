export const menuJs = (MenuEl, MenuHidentEl, MenuBarEl) => {
  let Menu = MenuEl;
  document.addEventListener("scroll", () => {
    if (window.pageYOffset >= 16) {
      Menu.classList.add("menu-scroll");
    } else {
      Menu.classList.remove("menu-scroll");
    }
  });
  let menuHide = MenuHidentEl;
  let menuBar = MenuBarEl;
  let indexShowMenu = "khong";

  const resizeMenu = (n) => {
    if (n <= 937) {
      menuHide.style.height = "0px";
      indexShowMenu = "khong";
    } else {
      menuHide.style.height = "auto";
      indexShowMenu = "co";
    }
  };
  menuBar.onclick = () => {
    clickBar();
  };
  const clickBar = () => {
    if (indexShowMenu === "khong") {
      menuHide.style.height = "350px";
      indexShowMenu = "co";
    } else {
      menuHide.style.height = "0";
      indexShowMenu = "khong";
    }
  };
  window.addEventListener("resize", () => {
    var widthScreen = window.innerWidth;
    resizeMenu(widthScreen);
  });
};

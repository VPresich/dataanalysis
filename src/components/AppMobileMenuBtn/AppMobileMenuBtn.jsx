import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import iconsPath from "../../assets/img/icons.svg";
import AppMobileMenuContent from "../AppMobileMenuContent/AppMobileMenuContent";
import clsx from "clsx";
import css from "./AppMobileMenuBtn.module.css";

const AppMobileMenuBtn = () => {
  const theme = useSelector(selectTheme);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={css.menuBtn} onClick={handleClick}>
        <svg
          className={clsx(css.menuIcon, css[theme])}
          width="24"
          height="24"
          aria-label="burger menu button"
        >
          <use href={`${iconsPath}#icon-menu`} />
        </svg>
      </button>
      <div className={clsx(css.mobileMenu, { [css.open]: isOpen })}>
        <button className={css.closeBtn} onClick={handleClick}>
          <svg
            className={clsx(css.closeIcon, css[theme])}
            width="24"
            height="24"
            aria-label="close menu button"
          >
            <use href={`${iconsPath}#icon-x-close`} />
          </svg>
        </button>
        <AppMobileMenuContent onMenuClick={handleClick} />
      </div>
    </>
  );
};

export default AppMobileMenuBtn;

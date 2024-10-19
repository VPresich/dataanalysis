import { useEffect, useRef } from "react";
import AppNav from "../AppNav/AppNav";
import AuthMenu from "../Authentication/AuthMenu/AuthMenu";
import AppMobileMenuBtn from "../AppMobileMenuBtn/AppMobileMenuBtn";
import ColorSelector from "../ColorSelector/ColorSelector";
import Logo from "../Logo/Logo";
import css from "./AppBar.module.css";

export default function AppBar() {
  const headerRef = useRef();

  const handleScroll = () => {
    if (headerRef.current) {
      const scrollPos = window.scrollY;
      if (scrollPos > 50) {
        headerRef.current.classList.add(css.onscroll);
      } else {
        headerRef.current.classList.remove(css.onscroll);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className={css.header}>
      <Logo />
      <AppNav />
      <div className={css.wrapper}>
        <AuthMenu />
        <AppMobileMenuBtn />
        <ColorSelector />
      </div>
    </header>
  );
}

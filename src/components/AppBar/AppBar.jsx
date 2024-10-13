import AppNav from "../AppNav/AppNav";
import AuthMenu from "../Authentication/AuthMenu/AuthMenu";
import AppMobileMenuBtn from "../AppMobileMenuBtn/AppMobileMenuBtn";
import ColorSelector from "../ColorSelector/ColorSelector";
import Logo from "../Logo/Logo";
import css from "./AppBar.module.css";

export default function AppBar() {
  return (
    <header className={css.header}>
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

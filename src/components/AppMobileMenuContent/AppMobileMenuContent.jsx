import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectTheme } from "../../redux/auth/selectors";
import { selectUserName } from "../../redux/auth/selectors";
import AuthButton from "../../components/Authentication/AuthButton/AuthButton";
import GoogleButton from "../Authentication/GoogleBtn/GoogleBtn";
import RegistrationButton from "../Authentication/RegistrationButton/RegistrationButton";
import clsx from "clsx";
import css from "./AppMobileMenuContent.module.css";

const AppMobileMenuContent = ({ onMenuClick }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const theme = useSelector(selectTheme);
  const classItem = ({ isActive }) => {
    return clsx(css.item, isActive && css.active);
  };

  return (
    <div className={css.mobileContent}>
      <div className={css.authPart}>
        {isLoggedIn ? (
          <>
            <p
              className={clsx(css.userName, css[theme])}
            >{`Hi, ${userName}`}</p>
            <AuthButton handleClick={onMenuClick}>Logout</AuthButton>
          </>
        ) : (
          <>
            <AuthButton handleClick={onMenuClick}>Log In</AuthButton>
            <RegistrationButton handleClick={onMenuClick} />
            <GoogleButton />
          </>
        )}
      </div>
      <nav className={css.nav}>
        <NavLink className={classItem} to="/" onClick={onMenuClick}>
          Home
        </NavLink>
        <NavLink className={classItem} to="/teachers" onClick={onMenuClick}>
          Teachers
        </NavLink>
        {isLoggedIn && (
          <NavLink className={classItem} to="/favorites" onClick={onMenuClick}>
            Favorites
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default AppMobileMenuContent;

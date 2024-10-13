import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AppNav.module.css";
import clsx from "clsx";

const classItem = ({ isActive }) => {
  return clsx(css.item, isActive && css.active);
};

export default function AppNav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.nav}>
      <NavLink className={classItem} to="/">
        Home
      </NavLink>
      <NavLink className={classItem} to="/teachers">
        Teachers
      </NavLink>
      <NavLink className={classItem} to="/data">
        Example Analysis
      </NavLink>
      {isLoggedIn && (
        <NavLink className={classItem} to="/favorites">
          Favorites
        </NavLink>
      )}
    </nav>
  );
}

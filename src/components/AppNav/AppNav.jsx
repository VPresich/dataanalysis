import { NavLink } from "react-router-dom";

import css from "./AppNav.module.css";
import clsx from "clsx";

const classItem = ({ isActive }) => {
  return clsx(css.item, isActive && css.active);
};

export default function AppNav() {
  return (
    <nav className={css.nav}>
      <NavLink className={classItem} to="/">
        Home
      </NavLink>

      <NavLink className={classItem} to="/data">
        IMMAnalysis
      </NavLink>

      <NavLink className={classItem} to="/hough">
        Hough
      </NavLink>

      <NavLink className={classItem} to="/hough3d">
        Hough3D
      </NavLink>

      <NavLink className={classItem} to="/houghtracks">
        HoughTracks
      </NavLink>
    </nav>
  );
}

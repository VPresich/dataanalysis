import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import clsx from "clsx";
import css from "./LevelItem.module.css";

const LevelItem = ({ title, isActive }) => {
  const theme = useSelector(selectTheme);
  return (
    <div className={clsx(css.container, isActive && css[theme])}>
      <span className={css.title}>{`# ${title}`}</span>
    </div>
  );
};

export default LevelItem;

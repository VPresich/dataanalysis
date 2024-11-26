import { useSelector } from "react-redux";
import clsx from "clsx";
import iconsPath from "../../../assets/img/icons.svg";
import { selectIs3D } from "../../../redux/datafilters/selectors";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./ToggleButton.module.css";

const ToggleButton = ({ onToggle }) => {
  const theme = useSelector(selectTheme);
  const is3D = useSelector(selectIs3D);
  return (
    <div className={css.wrapper}>
      <label className={clsx(css.label, css[theme])}>
        <input
          type="checkbox"
          checked={is3D}
          onChange={onToggle}
          className={css.hiddenCheckbox}
        />
        <span className={css.customCheckbox}>
          <svg className={css.checkIcon}>
            <use href={`${iconsPath}#icon-check`} />
          </svg>
        </span>
        {"3D"}
      </label>
    </div>
  );
};

export default ToggleButton;

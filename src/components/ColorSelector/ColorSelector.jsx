import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTheme } from "../../redux/auth/operations";
import { selectTheme, selectIsLoggedIn } from "../../redux/auth/selectors";
import { setTheme } from "../../redux/auth/slice";

import iconsPath from "../../assets/img/icons.svg";
import clsx from "clsx";
import css from "./ColorSelector.module.css";

const themes = ["yellow", "green", "blue", "pink", "red"];

const ColorSelector = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoggedIn) return false;

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value.toLowerCase();
    dispatch(setTheme(selectedTheme));
    dispatch(updateTheme({ color: selectedTheme }));
    setIsOpen(false);
  };

  return (
    <div className={css.header}>
      <button
        className={clsx(css.btn, { [css.open]: isOpen }, css[theme])}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className={clsx(css.icon, css[theme])} aria-label="arrow icon">
          <use href={`${iconsPath}#icon-dropdown`} />
        </svg>
      </button>
      {isOpen && (
        <div className={clsx(css.dropdown, css[theme])}>
          {themes.map((themeOption) => (
            <label
              key={themeOption}
              className={clsx(css.label, css[themeOption])}
            >
              <input
                type="radio"
                value={themeOption}
                checked={theme === themeOption}
                onChange={handleThemeChange}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelector;

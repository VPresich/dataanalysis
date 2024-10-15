import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import css from "./Loader.module.css";
import clsx from "clsx";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  const [color, setColor] = useState("default");

  const theme = useSelector(selectTheme);

  useEffect(() => {
    const root = document.querySelector(`.${css.triangle}.${css[theme]}`);
    if (root) {
      const computedStyle = getComputedStyle(root);
      const triangleColor = computedStyle.getPropertyValue("--triangle-color");
      setColor(triangleColor);
    }
  }, [theme]);

  return (
    <div className={css.container}>
      <Triangle
        visible={true}
        height="100"
        width="100"
        color={color.trim()}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass={clsx(css.triangle, css[theme])}
      />
    </div>
  );
};

export default Loader;

import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import clsx from "clsx";
import css from "./Image.module.css";

const Image = ({ imgUrl, name }) => {
  const theme = useSelector(selectTheme);
  return (
    <div className={clsx(css.container, css[theme])}>
      <img className={css.img} src={imgUrl} alt={name} />
      <span className={css.onlineMarker}></span>
    </div>
  );
};
export default Image;

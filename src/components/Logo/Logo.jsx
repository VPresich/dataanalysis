import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import logoIconUrl from "../../assets/img/main-icon-def.svg";
import logoUkraineUrl from "../../assets/img/main-icon.svg";

import css from "./Logo.module.css";

export default function Logo() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.logoContainer}>
      {isLoggedIn ? (
        <img src={logoUkraineUrl} alt="Ukraine icon" className={css.logoIcon} />
      ) : (
        <img src={logoIconUrl} alt="Logo icon" className={css.logoIcon} />
      )}
      <span className={css.logoText}>LearnLingo</span>
    </div>
  );
}

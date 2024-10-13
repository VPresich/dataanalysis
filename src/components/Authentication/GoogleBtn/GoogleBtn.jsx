import css from "./GoogleBtn.module.css";
import googleIcon from "../../../assets/img/google/google-icon.svg";
import { BaseURL } from "../../../api/axiosInst";

export default function GoogleBtn({ app = "teachers" }) {
  return (
    <a href={`${BaseURL}/users/google?app=${app}`} className={css.btn}>
      <span>
        <img src={googleIcon} alt="google icon" className={css.icon} />
      </span>
    </a>
  );
}

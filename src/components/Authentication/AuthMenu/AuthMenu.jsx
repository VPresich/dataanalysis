import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUserName,
} from "../../../redux/auth/selectors";
import AuthButton from "../AuthButton/AuthButton";
import RegistrationButton from "../RegistrationButton/RegistrationButton";
import GoogleButton from "../GoogleBtn/GoogleBtn";

import css from "./AuthMenu.module.css";

const AuthMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);

  return (
    <div className={css.authPart}>
      {isLoggedIn ? (
        <>
          <p className={css.userName}>{`Hi, ${userName}`}</p>
          <AuthButton>Logout</AuthButton>
        </>
      ) : (
        <>
          <AuthButton>Log In</AuthButton>
          <div className={css.btnsWrapper}>
            <RegistrationButton />
            <GoogleButton />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthMenu;

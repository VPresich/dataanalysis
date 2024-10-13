import { useState } from "react";
import { useDispatch } from "react-redux";
import { errNotify } from "../../../auxiliary/notification/notification";
import { ERR_REGISTRATION } from "../Forms/constants";
import { register } from "../../../redux/auth/operations";
import ModalWrapper from "../../UI/ModalWrapper/ModalWrapper";
import RegisterForm from "../Forms/RegisterForm/RegisterForm";
import css from "./RegistrationButton.module.css";

const RegistrationButton = ({ handleClick }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const dispatch = useDispatch();

  const handleShowRegister = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegister = () => {
    setShowRegisterForm(false);
  };

  const handleRegistration = (values) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        setShowRegisterForm(false);
        handleClick && handleClick();
      })
      .catch((error) => {
        if (error.includes("409")) {
          errNotify("The user is already registered");
        } else {
          errNotify(ERR_REGISTRATION);
        }
      });
  };

  return (
    <>
      <button className={css.btn} onClick={handleShowRegister}>
        Registration
      </button>

      {showRegisterForm && (
        <ModalWrapper onClose={handleCloseRegister}>
          <RegisterForm handleRegistration={handleRegistration} />
        </ModalWrapper>
      )}
    </>
  );
};

export default RegistrationButton;

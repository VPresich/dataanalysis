import React from "react";
import { useForm } from "react-hook-form";
import Button from "../UI/Button/Button";
import css from "./UnauthorizedModal.module.css";

const UnauthorizedModal = ({ onClose }) => {
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Access Denied</h3>
            <p className={css.text}>
              This feature is only available for authorized users.
            </p>
          </div>
          <Button type="submit">Close</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default UnauthorizedModal;

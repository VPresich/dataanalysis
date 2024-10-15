import { useFormContext, Controller } from "react-hook-form";
import iconsPath from "../../../assets/img/icons.svg";
import css from "./InputWithButton.module.css";

const InputWithButton = ({ name, placeholder, type, onSubmit }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={css.wrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={css.inputContainer}>
            <input
              {...field}
              placeholder={placeholder}
              className={css.input}
              type={type}
            />
            <button
              type="button"
              onClick={onSubmit}
              className={css.searchButton}
            >
              <svg className={css.icon}>
                <use href={`${iconsPath}#icon-search`}></use>
              </svg>
            </button>
          </div>
        )}
      />
      {errors[name] && (
        <span className={css.error}>{errors[name].message}</span>
      )}
    </div>
  );
};

export default InputWithButton;

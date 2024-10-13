import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/auth/selectors";
import { useFormContext, Controller } from "react-hook-form";
import css from "./RadioGroup.module.css";

const RadioGroup = ({ name, options }) => {
  const { control } = useFormContext();
  const theme = useSelector(selectTheme);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={css.radioGroup}>
          {options.map((option, index) => (
            <label key={index} className={css.radioLabel}>
              <input
                type="radio"
                value={option}
                checked={field.value === option}
                onChange={() => field.onChange(option)}
                className={clsx(css.radioInput, css[theme])}
              />
              <span className={css.customRadio}></span>
              {option}
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default RadioGroup;

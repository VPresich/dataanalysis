import { useState } from "react";
import iconsPath from "../../../assets/img/icons.svg";
import Button from "../Button/Button";
import clsx from "clsx";
import css from "./MultySelector.module.css";

const MultySelector = ({
  btnLabel,
  options,
  selectedOptions = [],
  onChange,
  optionCSSClass,
  dropdownCSSClass,
  btnCSSClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    let updatedOptions;

    if (selectedOptions.includes(value)) {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    } else {
      updatedOptions = [...selectedOptions, value];
    }
    onChange(updatedOptions);
  };

  const handleSelectAllToggle = () => {
    if (selectedOptions.length === options.length) {
      onChange([]);
    } else {
      onChange(options);
    }
  };

  return (
    <div className={css.container}>
      <button
        className={clsx(
          css.btn,
          { [css.open]: isOpen },
          btnCSSClass && btnCSSClass
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={clsx(css.text, btnCSSClass)}>
          {selectedOptions.length > 0
            ? `${selectedOptions.length} selected`
            : btnLabel}
        </span>
        <div className={clsx(css.iconContainer)}>
          <svg className={clsx(css.icon)} aria-label="arrow icon">
            <use href={`${iconsPath}#icon-dropdown`} />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div
          className={clsx(
            css.dropdownWrapper,
            dropdownCSSClass && dropdownCSSClass
          )}
        >
          <div className={clsx(css.dropdown)}>
            <div className={clsx(css.checkboxWrapper)}>
              <Button
                onClick={handleSelectAllToggle}
                btnAuxStyles={css.btnAuxStyles}
              >
                {selectedOptions.length === options.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>
            {options.map((option, index) => (
              <div key={index} className={clsx(css.checkboxWrapper)}>
                <label
                  className={clsx(
                    css.option,
                    { [css.selected]: selectedOptions.includes(option) },
                    optionCSSClass && optionCSSClass
                  )}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                  <span className={css.customCheckbox}>
                    <svg className={css.checkIcon}>
                      <use href={`${iconsPath}#icon-check`} />
                    </svg>
                  </span>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultySelector;

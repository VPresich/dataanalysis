import { useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import css from "./ModalWrapper.module.css";
import iconsPath from "../../../assets/img/icons.svg";

const ModalWrapper = ({
  children,
  onClose,
  portalId = "portal-root",
  isGraph = false,
}) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      event.stopPropagation();
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  const handleDocumentKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  return ReactDOM.createPortal(
    <div className={css.modalWrapper} onClick={handleClickOutside}>
      <div
        className={clsx(css.modal, isGraph && css.graph)}
        ref={wrapperRef}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button className={css.closeBtn} onClick={onClose}>
          <svg
            className={clsx(css.icon, isGraph && css.graph)}
            aria-label="close button icon"
          >
            <use href={`${iconsPath}#icon-x-close`} />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById(portalId)
  );
};

export default ModalWrapper;

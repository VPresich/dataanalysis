import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import UnauthorizedModal from "../../../components/UnauthorizedModal/UnauthorizedModal";
import { selectIsFavorite } from "../../../redux/favorites/selectors";
import { selectTheme } from "../../../redux/auth/selectors";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import {
  addFavorite,
  removeFavorite,
} from "../../../redux/favorites/operations";

import iconsPath from "../../../assets/img/icons.svg";
import css from "./FavoriteButton.module.css";

const FavoriteButton = ({ id }) => {
  const dispatch = useDispatch();
  const [showFavoriteDiny, setShowFavoriteDiny] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const theme = useSelector(selectTheme);
  const isFavorite = useSelector((state) => selectIsFavorite(state, id));

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      setShowFavoriteDiny(true);
      return;
    }
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  const handleClose = () => {
    setShowFavoriteDiny(false);
  };

  return (
    <>
      <button className={css.btn} onClick={handleToggleFavorite}>
        <svg
          className={clsx(isFavorite ? css[theme] : css.default)}
          width="24"
          height="24"
          aria-label="btn icon"
        >
          <use href={`${iconsPath}#favorite`} />
        </svg>
      </button>
      {showFavoriteDiny && (
        <ModalWrapper onClose={handleClose}>
          <UnauthorizedModal onClose={handleClose} />
        </ModalWrapper>
      )}
    </>
  );
};

export default FavoriteButton;

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLevel } from "../../redux/filters/selectors";
import CardFeatures from "../CardFeatures/CardFeatures";
import LevelList from "../LevelList/LevelList";
import CardDetails from "../CardDetails/CardDetails";
import FavoriteButton from "../../components/UI/FavoriteButton/FavoriteButton";
import Button from "../UI/Button/Button";
import ModalWrapper from "../UI/ModalWrapper/ModalWrapper";
import BookingFormContent from "../BookingFormContent/BookingFormContent";
import Image from "../UI/Image/Image";

import EllipsisText from "../UI/EllipsisText/EllipsisText";

import css from "./Card.module.css";

export default function Card({ teacher }) {
  const { avatar_url, name, lesson_info, conditions, languages, levels } =
    teacher;

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const levelFilter = useSelector(selectLevel);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleValues = (values) => {
    console.log(values);
    setShowModal(false);
    setShowDetails(false);
  };

  return (
    <div className={css.container}>
      <Image imgUrl={avatar_url} name={name} />

      <div className={css.infoWrapper}>
        <div className={css.firstLine}>
          <div className={css.nameWrapper}>
            <span className={css.label}>Languages</span>
            <p className={css.name}>{name} </p>
          </div>
          <CardFeatures teacher={teacher} />
          <div className={css.favoriteContainer}>
            <FavoriteButton id={teacher._id} />
          </div>
        </div>
        <div className={css.mainInfo}>
          <div className={css.langWrapper}>
            <span className={css.label}>Speaks: </span>
            <span className={css.languages}>{languages.join(", ")}</span>
          </div>

          <div className={css.descrWrapper}>
            <span className={css.label}>Lesson Info:</span>
            <EllipsisText
              text={lesson_info}
              maxLines={3}
              className={css.description}
            />
          </div>

          <div className={css.descrWrapper}>
            <span className={css.label}>Conditions:</span>
            <EllipsisText
              text={conditions.join(" ")}
              maxLines={3}
              className={css.description}
            />
          </div>
        </div>
        {!showDetails && (
          <span className={css.readMore} onClick={handleShowDetails}>
            Read more
          </span>
        )}
        <div
          className={
            showDetails
              ? `${css.details} ${css.visible}`
              : `${css.details} ${css.hidden}`
          }
        >
          <CardDetails teacher={teacher} />
        </div>

        <LevelList levels={levels} levelFilter={levelFilter} />

        <div
          className={
            showDetails
              ? `${css.details} ${css.visible}`
              : `${css.details} ${css.hidden}`
          }
        >
          <Button onClick={handleClick} btnAuxStyles={css.btnAuxStyles}>
            Book trial lesson
          </Button>
        </div>
      </div>
      {showModal && (
        <ModalWrapper onClose={handleClose}>
          <BookingFormContent teacher={teacher} handleValues={handleValues} />
        </ModalWrapper>
      )}
    </div>
  );
}

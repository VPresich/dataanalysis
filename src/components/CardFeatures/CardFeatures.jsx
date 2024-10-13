import VertSeparator from "../UI/VertSeparator/VertSeparator";
import iconsPath from "../../assets/img/icons.svg";
import formatNumber from "../../auxiliary/formatNumber";

import css from "./CardFeatures.module.css";

export default function CardFeatures({ teacher }) {
  return (
    <div className={css.container}>
      <div className={css.feature}>
        <svg className={css.iconContainer} aria-label="open book icon">
          <use className={css.iconBook} href={`${iconsPath}#icon-book`} />
        </svg>
        <span className={css.featureValue}>Lessons online</span>
        <VertSeparator />
      </div>

      <div className={css.feature}>
        <span className={css.featureTitle}>Lessons done:</span>
        <span className={css.featureValue}>{teacher.lessons_done}</span>
        <VertSeparator />
      </div>

      <div className={css.feature}>
        <svg className={css.iconContainer} aria-label="star icon">
          <use className={css.iconStar} href={`${iconsPath}#icon-star`} />
        </svg>
        <span className={css.featureTitle}>Rating:</span>
        <span className={css.featureValue}>{formatNumber(teacher.rating)}</span>
        <VertSeparator />
      </div>

      <div className={css.feature}>
        <span className={css.featureTitle}>Price / 1 hour:</span>
        <span className={css.price}>{teacher.price_per_hour}$</span>
      </div>
    </div>
  );
}

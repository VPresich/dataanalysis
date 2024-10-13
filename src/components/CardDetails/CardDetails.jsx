import Reviewers from "../Reviewers/Reviewers";
import css from "./CardDetails.module.css";

const CardDetails = ({ teacher }) => {
  const { experience, reviews } = teacher;
  return (
    <div className={css.container}>
      <div className={css.descrWrapper}>
        <span className={css.label}>Experience:</span>
        <p className={css.experience}>{experience}</p>
      </div>
      <Reviewers reviews={reviews} />
    </div>
  );
};

export default CardDetails;

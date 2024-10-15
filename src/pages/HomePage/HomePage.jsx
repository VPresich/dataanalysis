import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { selectTheme } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import Button from "../../components/UI/Button/Button";
import imgDefaultUrl from "../../assets/img/home/default_block.svg";
import imgYellowUrl from "../../assets/img/home/yellow_analysis_block.webp";
import imgGreenUrl from "../../assets/img/home/blue_analysis_block.webp";
import imgBlueUrl from "../../assets/img/home/green_analysis_block.webp";
import imgPinkUrl from "../../assets/img/home/pink_analysis_block.webp";
import imgRedUrl from "../../assets/img/home/red_analysis_block.webp";
import { refreshUser } from "../../redux/auth/operations";
import { saveToken } from "../../redux/auth/slice";

const selectImgUrl = (theme) => {
  let imgUrl = imgDefaultUrl;

  switch (theme) {
    case "yellow":
      imgUrl = imgYellowUrl;
      break;
    case "green":
      imgUrl = imgGreenUrl;
      break;
    case "blue":
      imgUrl = imgBlueUrl;
      break;
    case "pink":
      imgUrl = imgPinkUrl;
      break;
    case "red":
      imgUrl = imgRedUrl;
      break;
    default:
      break;
  }
  return imgUrl;
};

import { useNavigate } from "react-router-dom";

import css from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      dispatch(saveToken(token));
      dispatch(refreshUser());
      navigate("/");
    }
  }, [dispatch, location.search, navigate]);

  const theme = useSelector(selectTheme);

  const handleClick = () => {
    navigate("/teachers");
  };

  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>
      <div className={css.container}>
        <section className={css.welcome}>
          <div className={css.info}>
            <h1 className={css.title}>
              Unlock your potential with the best{" "}
              <span className={clsx(css.accent, css[theme])}>data</span>{" "}
              analysts.
            </h1>
            <p className={css.text}>
              Embark on an Exciting Data Analysis Journey with Expert Data
              Analysts: Elevate your data proficiency to new heights by
              connecting with highly skilled and experienced data professionals.
            </p>
            <Button onClick={handleClick} btnAuxStyles={css.btnAuxStyles}>
              Get started
            </Button>
          </div>
          <div className={css.imgContainer}>
            <img src={selectImgUrl(theme)} alt="Picture" className={css.img} />
          </div>
        </section>

        <section className={clsx(css.statistics, css[theme])}>
          <ul className={css.statisticsList}>
            <li className={css.statisticsItem}>
              <p className={css.itemValue}>32,000 +</p>
              <p className={css.itemTitle}>Experienced tutors</p>
            </li>
            <li className={css.statisticsItem}>
              <p className={css.itemValue}>300,000 +</p>
              <p className={css.itemTitle}>5-star tutor reviews</p>
            </li>
            <li className={css.statisticsItem}>
              <p className={css.itemValue}>120 +</p>
              <p className={css.itemTitle}>Subjects taught</p>
            </li>
            <li className={css.statisticsItem}>
              <p className={css.itemValue}>200 +</p>
              <p className={css.itemTitle}>Tutor nationalities</p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

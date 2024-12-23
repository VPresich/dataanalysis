import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHoughTrajectoryData } from "../../redux/houghTrajectory/operations";
import {
  setHoughTrajectory,
  setTrajectoryData,
} from "../../redux/houghTrajectory/slice";
import generateTrajectoryPoints from "../../auxiliary/genereateTrajectoryPointsNorm";
import hough2DTrajectories from "../../auxiliary/hough2DTrajectories";
import Loader from "../../components/UI/Loader/Loader";
import clsx from "clsx";
import HoughTrajectoryTable from "../../components/HoughTrajectoryTable/HoughTrajectoryTable";
import ModalWrapper from "../../components/UI/ModalWrapper/ModalWrapper";
import Button from "../../components/UI/Button/Button";
import Hough2DTrajectoryVisualizer from "../../components/Hough2DTrajectoryVisualizer/Hough2DTrajectoryVisualizer";
import Hough2DTrajectoryResult from "../../components/Hough2DTrajectoryResult/Hough2DTrajectoryResult";
import {
  selectTrajectoryData,
  selectIsLoading,
  selectError,
} from "../../redux/houghTrajectory/selectors";

import { selectTheme } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./Hough2DTrajectory.module.css";

export default function Hough2DTrajectory() {
  const dispatch = useDispatch();
  const [showVisGraph, setShowVisGraph] = useState(false);
  const [showResultGraph, setShowResultGraph] = useState(false);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const trajectoryData = useSelector(selectTrajectoryData);
  const theme = useSelector(selectTheme);

  const handleVisClick = () => {
    setShowVisGraph(true);
  };

  const handleVizClose = () => {
    setShowVisGraph(false);
  };

  const handleResultClick = () => {
    setShowResultGraph(true);
  };

  const handleResultClose = () => {
    setShowResultGraph(false);
  };

  useEffect(() => {
    const trajectoryPoints = generateTrajectoryPoints();
    const sortedTrajectoryPoints = trajectoryPoints.sort((a, b) => a.t - b.t);
    dispatch(setTrajectoryData(sortedTrajectoryPoints));

    const houghTrajectory = hough2DTrajectories(trajectoryPoints);
    console.log(houghTrajectory);
    dispatch(setHoughTrajectory(houghTrajectory));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getHoughTrajectoryData())
  //     .unwrap()
  //     .then((data) => {
  //       const houghTrajectory = hough2DTrajectories(data);
  //       dispatch(setHoughTrajectory(houghTrajectory));
  //     })
  //     .catch((error) => {
  //       console.error("Error in get Hough Data:", error);
  //     });
  // }, [dispatch]);

  return (
    <React.Fragment>
      <DocumentTitle>Hough2D Trajectory</DocumentTitle>
      <section className={css.container}>
        <h2 className="visually-hidden">Hough2D Trajectory</h2>
        <div className={css.auxLine}>
          <Button btnAuxStyles={css.auxBtn} onClick={handleVisClick}>
            Hough Visualization
          </Button>
          <Button btnAuxStyles={css.auxBtn} onClick={handleResultClick}>
            Hough Result
          </Button>
        </div>
        <div className={css.tableContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              {!error && trajectoryData.length > 0 ? (
                <HoughTrajectoryTable data={trajectoryData} />
              ) : (
                <p className={clsx(css.text, css[theme])}>Not found data.</p>
              )}
            </React.Fragment>
          )}
        </div>
      </section>
      {showVisGraph && (
        <ModalWrapper onClose={handleVizClose} isGraph={true}>
          <Hough2DTrajectoryVisualizer />
        </ModalWrapper>
      )}
      {showResultGraph && (
        <ModalWrapper onClose={handleResultClose} isGraph={true}>
          <Hough2DTrajectoryResult />
        </ModalWrapper>
      )}
    </React.Fragment>
  );
}

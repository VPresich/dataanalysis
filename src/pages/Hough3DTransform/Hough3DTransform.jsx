import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllHoughData } from "../../redux/houghdata/operations";
import { setResult3D } from "../../redux/houghdata/slice";
import Loader from "../../components/UI/Loader/Loader";
import clsx from "clsx";
import Hough3DDataTable from "../../components/Hough3DDataTable/Hough3DDataTable";
import ModalWrapper from "../../components/UI/ModalWrapper/ModalWrapper";
import Button from "../../components/UI/Button/Button";
import HoughTransform3DVisualizer from "../../components/HoughTransform3DVisualizer/HoughTransform3DVisualizer";
import HoughTransform3DResult from "../../components/HoughTransform3DResult/HoughTransform3DResult";
import {
  selectHoughData,
  selectIsLoading,
  selectError,
} from "../../redux/houghdata/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import hough3DTransform from "../../auxiliary/hough3DTransform";
import css from "./Hough3DTransform.module.css";

export default function HoughTransform() {
  const dispatch = useDispatch();
  const [showVisGraph, setShowVisGraph] = useState(false);
  const [showResultGraph, setShowResultGraph] = useState(false);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const houghData = useSelector(selectHoughData);
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
    dispatch(getAllHoughData())
      .unwrap()
      .then((data) => {
        const result3D = hough3DTransform(data);
        dispatch(setResult3D(result3D));
      })
      .catch((error) => {
        console.error("Error in get Hough Data:", error);
      });
  }, [dispatch]);

  return (
    <React.Fragment>
      <DocumentTitle>Hough 3DTransform</DocumentTitle>
      <section className={css.container}>
        <h2 className="visually-hidden">Hough 3D Transform</h2>
        <div className={css.auxLine}>
          <Button btnAuxStyles={css.auxBtn} onClick={handleVisClick}>
            Hough 3D Visualization
          </Button>
          <Button btnAuxStyles={css.auxBtn} onClick={handleResultClick}>
            Hough 3D Result
          </Button>
        </div>
        <div className={css.tableContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              {!error && houghData.length > 0 ? (
                <Hough3DDataTable data={houghData} />
              ) : (
                <p className={clsx(css.text, css[theme])}>Not found data.</p>
              )}
            </React.Fragment>
          )}
        </div>
      </section>
      {showVisGraph && (
        <ModalWrapper onClose={handleVizClose} isGraph={true}>
          <HoughTransform3DVisualizer />
        </ModalWrapper>
      )}
      {showResultGraph && (
        <ModalWrapper onClose={handleResultClose} isGraph={true}>
          <HoughTransform3DResult />
        </ModalWrapper>
      )}
    </React.Fragment>
  );
}

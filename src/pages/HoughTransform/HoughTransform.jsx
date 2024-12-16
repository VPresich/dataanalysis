import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllHoughData } from "../../redux/houghdata/operations";
import { setResult } from "../../redux/houghdata/slice";
import Loader from "../../components/UI/Loader/Loader";
import clsx from "clsx";
import HoughDataTable from "../../components/HoughDataTable/HoughDataTable";
import ModalWrapper from "../../components/UI/ModalWrapper/ModalWrapper";
import Button from "../../components/UI/Button/Button";
import HoughTransformVisualizer from "../../components/HoughTransformVisualizer/HoughTransformVisualizer";
import HoughTransformResult from "../../components/HoughTransformResult/HoughTransformResult";
import {
  selectHoughData,
  selectIsLoading,
  selectError,
} from "../../redux/houghdata/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import houghTransform from "../../auxiliary/houghTransform";
import css from "./HoughTransform.module.css";

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
        const result = houghTransform(data);
        console.log("Transformed result:", result);
        dispatch(setResult(result));
        console.log("Dispatched result:", result);
      })
      .catch((error) => {
        console.error("Error in get Hough Data:", error);
      });
  }, [dispatch]);

  return (
    <React.Fragment>
      <DocumentTitle>Hough Transform</DocumentTitle>
      <section className={css.container}>
        <h2 className="visually-hidden">Hough Transform</h2>
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
              {!error && houghData.length > 0 ? (
                <HoughDataTable data={houghData} />
              ) : (
                <p className={clsx(css.text, css[theme])}>Not found data.</p>
              )}
            </React.Fragment>
          )}
        </div>
      </section>
      {showVisGraph && (
        <ModalWrapper onClose={handleVizClose} isGraph={true}>
          <HoughTransformVisualizer />
        </ModalWrapper>
      )}
      {showResultGraph && (
        <ModalWrapper onClose={handleResultClose} isGraph={true}>
          <HoughTransformResult />
        </ModalWrapper>
      )}
    </React.Fragment>
  );
}

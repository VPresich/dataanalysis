import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import clsx from "clsx";
import DataTable from "../../components/DataTable/DataTable";
import DataFilters from "../../components/DataFilters/DataFilters";
import ModalWrapper from "../../components/UI/ModalWrapper/ModalWrapper";
import Button from "../../components/UI/Button/Button";
import GraphComponent from "../../components/GraphComponent/GraphComponent";

import {
  selectDataForAnalysisLength,
  selectFilteredData,
  selectIsLoading,
  selectError,
} from "../../redux/data/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./ExampleAnalysis.module.css";

export default function ExampleAnalysis() {
  const [showGraph, setShowGraph] = useState(false);

  const dataLength = useSelector(selectDataForAnalysisLength);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dataForTrack = useSelector(selectFilteredData);

  const theme = useSelector(selectTheme);

  const handleClick = () => {
    setShowGraph(true);
  };

  const handleClose = () => {
    setShowGraph(false);
  };

  return (
    <React.Fragment>
      <DocumentTitle>Example Analysis</DocumentTitle>
      <section className={css.container}>
        <h2 className="visually-hidden">Example Analysis</h2>
        <div className={css.auxLine}>
          <DataFilters />
          <Button btnAuxStyles={css.auxBtn} onClick={handleClick}>
            Line graph
          </Button>
        </div>
        <div className={css.tableContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              {!error && dataForTrack.length > 0 ? (
                <DataTable data={dataForTrack} />
              ) : (
                <p className={clsx(css.text, css[theme])}>Not found data.</p>
              )}
            </React.Fragment>
          )}
        </div>
        <span>
          Records: {dataForTrack.length} / {dataLength}
        </span>
      </section>
      {showGraph && (
        <ModalWrapper onClose={handleClose} isGraph={true}>
          <GraphComponent data={dataForTrack} />
        </ModalWrapper>
      )}
    </React.Fragment>
  );
}

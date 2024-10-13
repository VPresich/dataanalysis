import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
// import { selectQueryParams } from "../../redux/filters/selectors";
import DataTable from "../../components/DataTable/DataTable";
import Filters from "../../components/Filters/Filters";
import {
  selectDataForAnalysis,
  selectDataForAnalysisLength,
  selectIsLoading,
  selectError,
} from "../../redux/data/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./ExampleAnalysis.module.css";

export default function ExampleAnalysis() {
  const dataForAnalysis = useSelector(selectDataForAnalysis);
  const dataLength = useSelector(selectDataForAnalysisLength);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const theme = useSelector(selectTheme);

  //   const queryParams = useSelector(selectQueryParams);

  return (
    <React.Fragment>
      <DocumentTitle>Example Analysis</DocumentTitle>
      <section className={css.container}>
        <h2 className="visually-hidden">Example Analysis</h2>
        <Filters />
        <div className={css.tableContainer}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <React.Fragment>
              {!error && dataLength > 0 ? (
                <DataTable data={dataForAnalysis} />
              ) : (
                <p className={clsx(css.text, css[theme])}>Not found data.</p>
              )}
            </React.Fragment>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

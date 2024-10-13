import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { getTeachersWithParams } from "../../redux/teachers/operations";
import { fetchFavorites } from "../../redux/favorites/operations";
import { selectIsLoggedIn, selectTheme } from "../../redux/auth/selectors";
import { selectQueryParams } from "../../redux/filters/selectors";
import { setPage } from "../../redux/teachers/slice";
import CardList from "../../components/CardsList/CardsList";
import Filters from "../../components/Filters/Filters";
import {
  selectTeachers,
  selectCurrentPage,
  selectIsLoading,
  selectItemsPerPage,
  selectIsMore,
  selectError,
  selectTeachersNumber,
} from "../../redux/teachers/selectors";
import Button from "../../components/UI/Button/Button";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./Teachers.module.css";

export default function Teachers() {
  const dispatch = useDispatch();

  const teachers = useSelector(selectTeachers);

  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const isLoading = useSelector(selectIsLoading);
  const isMore = useSelector(selectIsMore);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  const teachersNum = useSelector(selectTeachersNumber);
  const theme = useSelector(selectTheme);

  const queryParams = useSelector(selectQueryParams);

  useEffect(() => {
    dispatch(
      getTeachersWithParams({
        page: currentPage,
        limit: itemsPerPage,
        query: queryParams,
      })
    );
    isLoggedIn && dispatch(fetchFavorites());
  }, [dispatch, currentPage, itemsPerPage, isLoggedIn, queryParams]);

  const handleLoadMore = () => {
    dispatch(setPage(currentPage + 1));
  };
  return (
    <>
      <DocumentTitle>Teachers catalog</DocumentTitle>
      <section className={css.container}>
        <h2 className="visually-hidden"> Teachers catalog</h2>
        <Filters />
        <div className={css.catalog}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {!error && teachersNum > 0 ? (
                <CardList teachers={teachers} />
              ) : (
                <p className={clsx(css.text, css[theme])}>
                  Not found teachers.
                </p>
              )}
              {isMore && (
                <Button
                  onClick={handleLoadMore}
                  btnAuxStyles={css.btnAuxStyles}
                >
                  Load More
                </Button>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

import toast from "react-hot-toast";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectFavorites } from "../../redux/favorites/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import { fetchFavorites } from "../../redux/favorites/operations";
import CardsList from "../../components/CardsList/CardsList";
import DocumentTitle from "../../components/DocumentTitle";
import css from "./Favorites.module.css";
import { Link } from "react-router-dom";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(fetchFavorites())
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        toast.error("Error fetching");
      });
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Favorites</DocumentTitle>
      <div className={css.container}>
        <section className={css.content}>
          <h2 className="visually-hidden"> Favorites</h2>
          {favorites && favorites.length !== 0 ? (
            <CardsList teachers={favorites} />
          ) : (
            <Link to="/teachers" className={css.link}>
              <span className={clsx(css.text, css[theme])}>
                Looks like you have not added any teachers to your favorites
                yet...
              </span>
            </Link>
          )}
        </section>
      </div>
    </>
  );
}

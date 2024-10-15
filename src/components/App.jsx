import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { refreshUser } from "../redux/auth/operations";
import { resetRefreshState } from "../redux/auth/slice";
import { getAllData } from "../redux/data/operations";
import { Toaster } from "react-hot-toast";
import AppBar from "./AppBar/AppBar";
import AppRouter from "./AppRouter";
import AppLayout from "./AppLayout/AppLayout";
import Loader from "./UI/Loader/Loader";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser())
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        dispatch(resetRefreshState());
      });

    dispatch(getAllData())
      .unwrap()
      .then(() => {
        // console.log(data);
      })
      .catch(() => {});
  }, [dispatch]);

  return (
    <React.Fragment>
      {isRefreshing ? (
        <Loader />
      ) : (
        <AppLayout>
          <AppBar />
          <AppRouter />
        </AppLayout>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </React.Fragment>
  );
}

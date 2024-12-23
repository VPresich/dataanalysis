import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import css from "./HoughTrajectoryTable.module.css";

const HoughTrajectoryTable = ({ data }) => {
  const theme = useSelector(selectTheme);
  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but got:", data);
    return <p>No data available</p>;
  }
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={clsx(css.th, css[theme])}>X</th>
          <th className={clsx(css.th, css[theme])}>Y</th>
          <th className={clsx(css.th, css[theme])}>T</th>
        </tr>
      </thead>
      <tbody className={css.tbody}>
        {data.map((item, index) => (
          <tr key={index} className={clsx(css.tr, css[theme])}>
            <td className={css.td}>{item.x}</td>
            <td className={css.td}>{item.y}</td>
            <td className={css.td}>{item.t}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HoughTrajectoryTable;

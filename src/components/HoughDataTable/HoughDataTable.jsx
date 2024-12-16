import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import css from "./HoughDataTable.module.css";

const HoughDataTable = ({ data }) => {
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
        </tr>
      </thead>
      <tbody className={css.tbody}>
        {data.map((item) => (
          <tr key={item._id} className={clsx(css.tr, css[theme])}>
            <td className={css.td}>{item.x}</td>
            <td className={css.td}>{item.y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HoughDataTable;

import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import css from "./DataTable.module.css";

const DataTable = ({ data }) => {
  const theme = useSelector(selectTheme);
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={clsx(css.th, css[theme])}>CV Positive</th>
          <th className={clsx(css.th, css[theme])}>CV Stable</th>
          <th className={clsx(css.th, css[theme])}>CA Positive</th>
          <th className={clsx(css.th, css[theme])}>CA Stable</th>
          <th className={clsx(css.th, css[theme])}>CT Positive</th>
          <th className={clsx(css.th, css[theme])}>CT Stable</th>
          <th className={clsx(css.th, css[theme])}>IMM Consistent Value</th>
          <th className={clsx(css.th, css[theme])}>IMM Consistent</th>
          <th className={clsx(css.th, css[theme])}>IMM Positive</th>
          <th className={clsx(css.th, css[theme])}>Velocity</th>
          <th className={clsx(css.th, css[theme])}>Speed</th>
          <th className={clsx(css.th, css[theme])}>Track</th>
          <th className={clsx(css.th, css[theme])}>Time</th>
        </tr>
      </thead>
      <tbody className={css.tbody}>
        {data.map((item) => (
          <tr key={item._id} className={css.tr}>
            <td className={css.td}>{item.CVpositive}</td>
            <td className={css.td}>{item.CVstable}</td>
            <td className={css.td}>{item.CApositive}</td>
            <td className={css.td}>{item.CAstable}</td>
            <td className={css.td}>{item.CTpositive}</td>
            <td className={css.td}>{item.CTstable}</td>
            <td className={css.td}>{item.IMMconsistentValue}</td>
            <td className={css.td}>{item.IMMconsistent}</td>
            <td className={css.td}>{item.IMMpositive}</td>
            <td className={css.td}>{item.velocityOK}</td>
            <td className={css.td}>{item.speed}</td>
            <td className={css.td}>{item.TrackNum}</td>
            <td className={css.td}>{item.Time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

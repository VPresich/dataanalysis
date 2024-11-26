import { useSelector } from "react-redux";
import { selectIs3D } from "../../redux/datafilters/selectors";
import LineGraph from "../LineGraph/LineGraph";
import LineGraph3D from "../LineGraph3D/LineGraph3D";
import css from "./GraphComponent.module.css";

const GraphComponent = ({ data }) => {
  const is3D = useSelector(selectIs3D);
  return (
    <div className={css.container}>
      {is3D ? <LineGraph3D data={data} /> : <LineGraph data={data} />}
    </div>
  );
};

export default GraphComponent;

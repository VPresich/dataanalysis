import LineGraph from "../LineGraph/LineGraph";
import css from "./GraphComponent.module.css";

const GraphComponent = ({ data }) => {
  return (
    <div className={css.container}>
      <LineGraph data={data} />
    </div>
  );
};

export default GraphComponent;

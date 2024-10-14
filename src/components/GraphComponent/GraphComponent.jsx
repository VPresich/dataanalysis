import LineGraph from "../LineGraph/LineGraph";
import css from "./GraphComponent.module.css";

const GraphComponent = ({ data }) => {
  return (
    <div className={css.container}>
      {/* <div className={css.titleContainer}>
            <h3 className={css.title}>Access Denied</h3>
            <p className={css.text}>
              This feature is only available for authorized users.
            </p>
          </div> */}
      <LineGraph data={data} />
    </div>
  );
};

export default GraphComponent;

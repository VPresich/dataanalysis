import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { saveTrackNum, saveImmConsistent } from "../../redux/datafilters/slice";
import {
  selectTrackNum,
  selectTrackNumbers,
  selectImmConsistent,
  selectImmConsistentValues,
} from "../../redux/datafilters/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import DropDownSelector from "../UI/DropDownSelector/DropDownSelector";
import css from "./DataFilters.module.css";

const DataFilters = () => {
  const theme = useSelector(selectTheme);
  const trackNum = useSelector(selectTrackNum);
  const trackNumbers = useSelector(selectTrackNumbers);
  const immConsistentValues = useSelector(selectImmConsistentValues);
  const immConsistent = useSelector(selectImmConsistent);
  const dispatch = useDispatch();

  const handleTrackNum = (trackNum) => {
    dispatch(saveTrackNum(trackNum));
  };

  const handleImmConsistent = (value) => {
    dispatch(saveImmConsistent(value));
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Track Number:</p>
        <DropDownSelector
          btnLabel={trackNum}
          options={trackNumbers}
          selectedOption={trackNum}
          onChange={handleTrackNum}
          btnCSSClass={css.btnTrackNum}
          dropdownCSSClass={css.dropdownTrackNum}
        />
      </div>
      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>IMM Consistent:</p>
        <DropDownSelector
          btnLabel={immConsistent}
          options={immConsistentValues}
          selectedOption={immConsistent}
          onChange={handleImmConsistent}
          btnCSSClass={css.btnTrackNum}
          dropdownCSSClass={css.dropdownTrackNum}
        />
      </div>
    </div>
  );
};

export default DataFilters;

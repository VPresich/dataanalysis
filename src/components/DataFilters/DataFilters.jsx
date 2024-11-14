import { useDispatch, useSelector } from "react-redux";
import TimeForm from "../TimeForm/TimeForm";
import processData from "../../auxiliary/processData";
import clsx from "clsx";
import {
  saveTrackNum,
  saveSensorNum,
  saveImmConsistent,
  saveImmConsistentMaxValue,
  resetDataFilters,
} from "../../redux/datafilters/slice";
import {
  selectTrackNum,
  selectTrackNumbers,
  selectImmConsistent,
  selectImmConsistentValues,
  selectImmConsistentMaxValue,
  selectSensorNum,
  selectStartTime,
  selectEndTime,
} from "../../redux/datafilters/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import { getFilteredData } from "../../redux/data/operations";
import { updateTrackNumbers, saveTime } from "../../redux/datafilters/slice";
import DropDownSelector from "../UI/DropDownSelector/DropDownSelector";
import SearchForm from "../UI/SearchForm/SearchForm";
import Button from "../UI/Button/Button";
import css from "./DataFilters.module.css";

const DataFilters = () => {
  const theme = useSelector(selectTheme);
  const trackNum = useSelector(selectTrackNum);
  const sensorNum = useSelector(selectSensorNum);
  const trackNumbers = useSelector(selectTrackNumbers);
  const immConsistentValues = useSelector(selectImmConsistentValues);
  const immConsistent = useSelector(selectImmConsistent);
  const immConsistentMaxValue = useSelector(selectImmConsistentMaxValue);
  const startTime = useSelector(selectStartTime);
  const endTime = useSelector(selectEndTime);
  const dispatch = useDispatch();

  const handleTrackNum = (trackNum) => {
    dispatch(saveTrackNum(trackNum));
  };

  const handleSensorNum = (sensorNum) => {
    dispatch(saveSensorNum(sensorNum));
    dispatch(getFilteredData(sensorNum))
      .unwrap()
      .then((data) => {
        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks));
      })
      .catch(() => {});
  };

  const handleImmConsistent = (value) => {
    dispatch(saveImmConsistent(value));
  };

  const handleSearch = (value) => {
    dispatch(saveImmConsistentMaxValue(value));
  };

  const handleChangedTime = (value) => {
    dispatch(saveTime(value));
    dispatch(getFilteredData(sensorNum))
      .unwrap()
      .then((data) => {
        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks));
      })
      .catch(() => {});
  };

  const handleReset = () => {
    dispatch(resetDataFilters());
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
      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Experiment N:</p>
        <DropDownSelector
          btnLabel={sensorNum}
          options={[
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 51, 52, 53, 54, 55, 81, 82,
            83, 84, 85, 86, 87, 88,
          ]}
          selectedOption={sensorNum}
          onChange={handleSensorNum}
          btnCSSClass={css.btnTrackNum}
          dropdownCSSClass={css.dropdownTrackNum}
        />
      </div>
      <div className={css.searchWrapper}>
        <p className={clsx(css.label, css[theme])}>IMM Consistent Value:</p>
        <SearchForm
          onSearch={handleSearch}
          initValue={immConsistentMaxValue}
          placeholder="Input Value"
        />
      </div>
      <div className={css.timeFormWrapper}>
        <p className={clsx(css.label, css[theme])}>Time:</p>
        <TimeForm
          initialValues={{ startTime, endTime }}
          onChange={handleChangedTime}
        />
      </div>
      <Button onClick={handleReset} btnAuxStyles={css.btnReset}>
        Reset
      </Button>
    </div>
  );
};

export default DataFilters;

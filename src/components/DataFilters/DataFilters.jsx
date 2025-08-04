import { useDispatch, useSelector } from "react-redux";
import TimeForm from "../TimeForm/TimeForm";
import processData from "../../auxiliary/processData";
import clsx from "clsx";
import {
  // saveTrackNum,
  saveSensorNum,
  saveImmConsistent,
  saveImmConsistentMaxValue,
  saveSelectedTrackNums,
  resetDataFilters,
  setIs3D,
} from "../../redux/datafilters/slice";
import {
  // selectTrackNum,
  // selectTrackNumbers,
  selectTrackNumbersForMultySelect,
  selectImmConsistent,
  selectImmConsistentValues,
  selectImmConsistentMaxValue,
  selectSensorNum,
  selectStartTime,
  selectEndTime,
  selectSelectedTrackNums,
  selectIs3D,
} from "../../redux/datafilters/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import {
  getFilteredData /*, getDataByNumber*/,
} from "../../redux/data/operations";
import { updateTrackNumbers, saveTime } from "../../redux/datafilters/slice";
import DropDownSelector from "../UI/DropDownSelector/DropDownSelector";
import MultySelector from "../UI/MultySelector/MultySelector";
import SearchForm from "../UI/SearchForm/SearchForm";
import Button from "../UI/Button/Button";
import ToggleButton from "../UI/ToggleButton/ToggleButton";
import css from "./DataFilters.module.css";

const DataFilters = () => {
  const theme = useSelector(selectTheme);
  // const trackNum = useSelector(selectTrackNum);
  const selectedTrackNums = useSelector(selectSelectedTrackNums);
  const sensorNum = useSelector(selectSensorNum);
  // const trackNumbers = useSelector(selectTrackNumbers);
  const trackNumbersForMultySelect = useSelector(
    selectTrackNumbersForMultySelect
  );
  const immConsistentValues = useSelector(selectImmConsistentValues);
  const immConsistent = useSelector(selectImmConsistent);
  const immConsistentMaxValue = useSelector(selectImmConsistentMaxValue);
  const startTime = useSelector(selectStartTime);
  const endTime = useSelector(selectEndTime);
  const is3D = useSelector(selectIs3D);
  const dispatch = useDispatch();

  // const handleTrackNum = (trackNum) => {
  //   dispatch(saveTrackNum(trackNum));
  // };

  const handleSensorNum = (sensorNum) => {
    dispatch(saveSensorNum(sensorNum));
    dispatch(getFilteredData({ sensorNum, startTime, endTime }))
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
    dispatch(
      getFilteredData({
        sensorNum,
        startTime: value.startTime,
        endTime: value.endTime,
      })
    )
      .unwrap()
      .then((data) => {
        const filteredTracks = processData(data, 5);
        dispatch(updateTrackNumbers(filteredTracks));
      })
      .catch(() => {});
  };

  const handleReset = () => {
    dispatch(resetDataFilters());
    setTimeout(() => {
      handleSensorNum(31);
    }, 0);
  };

  const handleSelectionChange = (options) => {
    dispatch(saveSelectedTrackNums(options));
  };

  const handleToggle = () => {
    dispatch(setIs3D(!is3D));
  };

  return (
    <div className={css.container}>
      {/* <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Track Number:</p>
        <DropDownSelector
          btnLabel={trackNum}
          options={trackNumbers}
          selectedOption={trackNum}
          onChange={handleTrackNum}
          btnCSSClass={css.btnTrackNum}
          dropdownCSSClass={css.dropdownTrackNum}
        />
      </div> */}
      <div className={css.wrapper}>
        <p className={clsx(css.label, css[theme])}>Track numbers:</p>
        <MultySelector
          btnLabel="Select  "
          options={trackNumbersForMultySelect}
          selectedOptions={selectedTrackNums}
          onChange={handleSelectionChange}
          dropdownCSSClass={css.dropdownMultyTrackNum}
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
            10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27,
            28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
            46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 62, 63, 64,
            65, 66, 67, 68, 70, 71, 72, 73, 74, 75, 76, 77, 78, 80, 81, 82, 83,
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
      <div className={css.wrapper}>
        <ToggleButton is3D={is3D} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default DataFilters;

import { useDispatch, useSelector } from "react-redux";
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
} from "../../redux/datafilters/selectors";
import { selectTheme } from "../../redux/auth/selectors";
import { getDataByNumber } from "../../redux/data/operations";
import { updateTrackNumbers } from "../../redux/datafilters/slice";
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
  const dispatch = useDispatch();

  const handleTrackNum = (trackNum) => {
    dispatch(saveTrackNum(trackNum));
  };

  const handleSensorNum = (sensorNum) => {
    dispatch(saveSensorNum(sensorNum));
    dispatch(getDataByNumber(sensorNum))
      .unwrap()
      .then((data) => {
        const groupedData = data.reduce((acc, row) => {
          const trackNum = row.TrackNum;
          if (!acc[trackNum]) {
            acc[trackNum] = [];
          }
          acc[trackNum].push(row);
          return acc;
        }, {});

        const filteredTracks = Object.keys(groupedData).filter(
          (trackNum) => groupedData[trackNum].length >= 5
        );
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
        <p className={clsx(css.label, css[theme])}>Sensor Numbers:</p>
        <DropDownSelector
          btnLabel={sensorNum}
          options={[3, 4, 5, 6, 7, 8]}
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
      <Button onClick={handleReset} btnAuxStyles={css.btnReset}>
        Reset
      </Button>
    </div>
  );
};

export default DataFilters;

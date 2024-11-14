import * as Yup from "yup";

export const feedbackSchema = Yup.object().shape({
  startTime: Yup.number()
    .typeError("Must be a number")
    .nullable()
    .notRequired()
    .min(0, "Must be >= 0"),
  endTime: Yup.number()
    .typeError("Must be a number")
    .nullable()
    .notRequired()
    .min(0, "Must be >= 0")
    .test(
      "end-time-greater-or-equal",
      "Must be >= start time",
      function (value) {
        const { startTime } = this.parent;
        if (value === null || value === undefined) {
          return true;
        }
        if (startTime === null || startTime === undefined) {
          return true;
        }
        return value >= startTime;
      }
    ),
});

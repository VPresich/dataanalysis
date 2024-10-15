import * as Yup from "yup";

export const feedbackSchema = Yup.object().shape({
  topic: Yup.string(),
});

import * as Yup from "yup";

import {
  ERR_SHORT,
  ERR_LONG,
  ERR_REQUIRED,
  ERR_EMAIL,
  ERR_PHONE,
  ERR_GOAL,
} from "./constants.js";

export const goals = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

export const feedbackSchema = Yup.object().shape({
  name: Yup.string().min(3, ERR_SHORT).max(50, ERR_LONG).required(ERR_REQUIRED),
  email: Yup.string().email(ERR_EMAIL).required(ERR_REQUIRED),
  phone: Yup.string().min(6, ERR_PHONE).required(ERR_REQUIRED),
  goal: Yup.string().oneOf(goals, ERR_GOAL).required(ERR_REQUIRED),
});

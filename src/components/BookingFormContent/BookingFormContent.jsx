import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../UI/Button/Button.jsx";
import Input from "../UI/Input/Input.jsx";
import RadioGroup from "../UI/RadioGroup/RadioGroup.jsx";
import { feedbackSchema } from "./feedbackSchema.js";
import { goals } from "./feedbackSchema.js";
import css from "./BookingFormContent.module.css";

export default function BookingFormContent({ teacher, handleValues }) {
  const { avatar_url, name } = teacher;
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      goal: "Career and business",
      name: "",
      email: "",
      phone: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    handleValues(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.content}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Book trial lesson</h3>
            <p className={css.text}>
              Our experienced tutor will assess your current language level,
              discuss your learning goals, and tailor the lesson to your
              specific needs.
            </p>
            <div className={css.teacherWrapper}>
              <div className={css.avatarWrapper}>
                <img className={css.img} src={avatar_url} alt={name} />
              </div>
              <div className={css.nameWrapper}>
                <span className={css.tacherLabel}>Your teacher</span>
                <span className={css.techerName}>{name}</span>
              </div>
            </div>
          </div>

          <div className={css.groupWrapper}>
            <p className={css.question}>
              What is your main reason for learning English?
            </p>
            <RadioGroup name="goal" options={goals} />
          </div>

          <div className={css.inputsWrapper}>
            <Controller
              name="name"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Full name" type="text" />
              )}
            />
            <Controller
              name="email"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Email" type="text" />
              )}
            />
            <Controller
              name="phone"
              control={methods.control}
              render={({ field }) => (
                <Input {...field} placeholder="Phone number" type="text" />
              )}
            />
          </div>
          <Button type="submit" btnAuxStyles={css.btnAuxStyles}>
            Book
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

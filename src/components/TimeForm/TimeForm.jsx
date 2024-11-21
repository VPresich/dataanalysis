import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { feedbackSchema } from "./feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import css from "./TimeForm.module.css";

const TimeForm = ({ initialValues, onChange }) => {
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: initialValues || {
      startTime: "",
      endTime: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = methods;

  const onSubmit = (data) => {
    console.log("data:", data);
    if (onChange) {
      onChange(data);
    }
  };

  useEffect(() => {
    methods.reset(initialValues);
  }, [initialValues, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.inputs}>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Start time" type="text" />
            )}
          />
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="End time" type="text" />
            )}
          />
        </div>
        <Button
          type="submit"
          btnAuxStyles={css.btnAuxStyles}
          disabled={!isDirty}
        >
          Save time
        </Button>
      </form>
    </FormProvider>
  );
};

export default TimeForm;

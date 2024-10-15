import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackSchema } from "./feedbackScema";
import InputWithButton from "../InputWithButton/InputWithButton";

const SearchForm = ({
  onSearch,
  initValue = "",
  className = null,
  placeholder = "Search",
}) => {
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      topic: initValue,
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue("topic", initValue);
  }, [initValue, setValue]);

  const onSubmit = (data) => {
    const value = data.topic.trim();
    onSearch(value);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(className && className)}
      >
        <InputWithButton
          name="topic"
          placeholder={placeholder}
          type="text"
          onSubmit={handleSubmit(onSubmit)}
        />
      </form>
    </FormProvider>
  );
};
export default SearchForm;

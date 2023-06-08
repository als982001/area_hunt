import * as React from "react";
import { useForm, useController, UseControllerProps } from "react-hook-form";

type FormValues = {
  FirstName: string;
  LastName: string;
};

function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
    </div>
  );
}

export default function Test() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
      LastName: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} name="FirstName" rules={{ required: true }} />
      <Input control={control} name="LastName" rules={{ required: true }} />
      <input type="submit" />
    </form>
  );
}

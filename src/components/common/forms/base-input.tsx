import { BaseInputProps } from "@/utils/types";
import { Input } from "@heroui/input";
import { useController } from "react-hook-form";

export default function BaseInput({
  extraClass,
  name,
  rules,
  control,
  classNames,
  ...props
}: BaseInputProps) {
  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue: "",
  });

  return (
    <Input
      {...field}
      // reset() without defaultValues sets the field to undefined, which would
      // flip the input from controlled to uncontrolled.
      value={field.value ?? ""}
      classNames={{ ...classNames, helperWrapper: "text-start" }}
      isInvalid={!!fieldState.error}
      errorMessage={fieldState.error?.message}
      className={`  ${extraClass}`}
      {...props}
    />
  );
}

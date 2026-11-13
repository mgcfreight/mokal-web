import { BaseTextAreaProps } from "@/utils/types";
import { Textarea } from "@heroui/react";
import { useController } from "react-hook-form";

export default function BaseTextArea({
  control,
  name,
  rules,
  classNames,
  ...props
}: BaseTextAreaProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules ,defaultValue:''});
  return (
    <Textarea
      isInvalid={!!error}
      classNames={{ ...classNames, helperWrapper: "text-start" }}
      errorMessage={error?.message}
      {...field}
      value={field.value ?? ""}
      {...props}
    />
  );
}

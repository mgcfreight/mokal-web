"use client";

import { BaseCheckboxProps } from "@/utils/types";
import { Checkbox } from "@heroui/react";
import { useController } from "react-hook-form";

export default function BaseCheckBox({
  children,
  name,
  control,
  rules,
}: BaseCheckboxProps) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  return (
    <Checkbox
      {...field}
      value={undefined}
      isSelected={!!field.value}
      isInvalid={!!fieldState.error}
    >
      {children}
    </Checkbox>
  );
}

"use client";

import { BaseSwitchProps } from "@/utils/types";
import { Switch } from "@heroui/react";
import { useController } from "react-hook-form";

export default function BaseSwitch({
  name,
  control,
  rules,
  defaultSelected,
  ...props
}: BaseSwitchProps) {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: defaultSelected,
  });
  return (
    <Switch
      isSelected={!!field.value}
      {...props}
      onValueChange={(booleanValue) => field.onChange(booleanValue)}
    />
  );
}

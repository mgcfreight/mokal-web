"use client";

import { BaseSelectProps } from "@/utils/types";
import { Select, SelectItem } from "@heroui/react";
import { useController } from "react-hook-form";

// const animals = [
//   { key: "cat", label: "Cat" },
//   { key: "dog", label: "Dog" },
//   { key: "elephant", label: "Elephant" },
//   { key: "lion", label: "Lion" },
//   { key: "tiger", label: "Tiger" },
//   { key: "giraffe", label: "Giraffe" },
//   { key: "dolphin", label: "Dolphin" },
//   { key: "penguin", label: "Penguin" },
//   { key: "zebra", label: "Zebra" },
//   { key: "shark", label: "Shark" },
//   { key: "whale", label: "Whale" },
//   { key: "otter", label: "Otter" },
//   { key: "crocodile", label: "Crocodile" },
// ];

export default function BaseSelect({
  items,
  name,
  control,
  rules,
  classNames,
  ...props
}: BaseSelectProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue: "" });
  return (
    <Select
      {...field}
      // HeroUI's Select ignores `value`; drive it from the form state so a
      // reset() actually clears the shown selection.
      selectedKeys={field.value ? [String(field.value)] : []}
      isInvalid={!!error}
      classNames={{ ...classNames, helperWrapper: "text-start" }}
      errorMessage={error?.message}
      className="w-full"
      {...props}
    >
      {items.map((item) => (
        <SelectItem key={item.value}>{item.name}</SelectItem>
      ))}
    </Select>
  );
}

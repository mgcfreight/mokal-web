"use client";

import { BaseFileProps } from "@/utils/types";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";

export default function BaseFile({
  className,
  multiple,
  name,
  control,
  rules,
  label,
  labelClass,
  accept,

  bgColor = "bgWhite",
}: BaseFileProps) {
  const {
    field: { onChange, value },
    fieldState,
  } = useController({ name, control, rules, defaultValue: undefined });
  const inputRef = useRef<HTMLInputElement>(null);

  // The native input keeps its files after the form resets, so picking the
  // same file again would fire no change event. Clear it with the form value.
  useEffect(() => {
    if (!value?.length && inputRef.current) inputRef.current.value = "";
  }, [value]);

  return (
    <div className={`${className} flex flex-col gap-2`}>
      {label && (
        <p
          className={`text-sm ${labelClass} ${
            fieldState.error && "text-[#f31260]"
          }`}
        >
          {label}
        </p>
      )}
      <div
        className={`relative ${bgColor} rounded-xl min-h-11 flex p-8 text-black ${
          fieldState.error && "text-[#f31260] border-1 border-[#f31260]"
        } justify-center items-center`}
      >
        <input
          id={name}
          ref={inputRef}
          type="file"
          accept={accept}
          value={undefined}
          onChange={(e) => {
            const { files } = e.target;
            if (files?.length) {
              onChange(files);
            }
          }}
          multiple={multiple}
          className="absolute opacity-0 z-0"
        />
        <label
          htmlFor={name}
          className="p-2 border-2 border-gray-200 bg-white rounded-lg relative z-10 cursor-pointer"
        >
          Browse Files
        </label>
      </div>

      {value &&
        Object.values(value as FileList).map((e) => (
          <p key={e.name}>{e.name}</p>
        ))}
    </div>
  );
}

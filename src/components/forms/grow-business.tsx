"use client";

import { FieldValues, useForm } from "react-hook-form";
import BaseInput from "../common/forms/base-input";
import BaseButton from "../common/base-button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { isValidPhoneNumber } from "libphonenumber-js";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function GrowBusinessForm() {
  const { control, reset, handleSubmit } = useForm();

  function onError(e: any) {
    const {
      response: {
        data: { message },
      },
    } = e;
    if (typeof message == "object") {
      toast.error(message[0]);
      return;
    }
    toast.error(message);
  }

  function onSuccess() {
    toast.success("Submitted Successfully");
    reset();
  }
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: any) => axiosInstance.post("/platform/grow-business", data),
    onError, onSuccess,
  });

  function growBusiness(values: FieldValues) {
    mutate(values);
  }

  return (
    <form
      onSubmit={handleSubmit(growBusiness)}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex sm:gap-4 gap-8 flex-wrap">
        <BaseInput
          name="firstName"
          rules={{ required: "First Name is required" }}
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          control={control}
          label="First Name"
          labelPlacement="outside"
          placeholder="First Name"
        />
        <BaseInput
          name="lastName"
          rules={{ required: "Last Name is required" }}
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          control={control}
          label="Last Name"
          labelPlacement="outside"
          placeholder="Last Name"
        />
        <BaseInput
          name="companyName"
          rules={{ required: "Company Name is required" }}
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_100%]"
          control={control}
          label="Company Name"
          labelPlacement="outside"
          placeholder="Company Name"
        />
        <BaseInput
          name="phoneNumber"
          rules={{
            required: "Phone Number is required",
            validate: (value) => {
              return isValidPhoneNumber(value) || "Invalid Phone Number";
            },
          }}
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          control={control}
          label="Phone Number"
          labelPlacement="outside"
          placeholder="Phone Number"
        />
        <BaseInput
          name="email"
          rules={{ required: "Email is required" }}
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          control={control}
          type="email"
          label="Work Email"
          labelPlacement="outside"
          placeholder="Work Email"
        />
      </div>
      <BaseButton
        type="submit"
        isLoading={isLoading}
        isDisabled={isLoading}
        extraClass="w-max !min-w-[10rem] !flex !justify-between items-center"
      >
        Help me Grow My Business{" "}
        <MdKeyboardDoubleArrowRight className="text-lg" />
      </BaseButton>
    </form>
  );
}

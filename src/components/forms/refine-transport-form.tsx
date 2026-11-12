"use client";

import { FieldValues, useForm } from "react-hook-form";
import BaseInput from "../common/forms/base-input";
import BaseFile from "../common/forms/base-file";
import BaseCheckBox from "../common/forms/base-checkbx";
import BaseButton from "../common/base-button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function RefineTransportForm() {
  const { control, handleSubmit, reset } = useForm();

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
    mutationFn: (data: any) => axiosInstance.postForm("/platform/refine-transport", data),
    onError, onSuccess,
  });

  function refineSubmit(values: FieldValues) {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      registrationNumber,
      companyName,
      file,
      shippers,
      carriers,
    } = values;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("registrationNumber", registrationNumber);
    formData.append("companyName", companyName);
    formData.append("file", file[0]);
    if (shippers) {
      formData.append("shippers", shippers);
    }
    if (carriers) {
      formData.append("carriers", carriers);
    }

    mutate(formData);
  }
  return (
    <form onSubmit={handleSubmit(refineSubmit)} className="flex flex-col gap-4">
      <div className="flex sm:gap-4 gap-8 flex-wrap">
        <BaseInput
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          name="firstName"
          control={control}
          rules={{ required: "First Name is required" }}
          label="First Name"
          labelPlacement="outside"
          placeholder="First Name"
        />
        <BaseInput
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          name="lastName"
          rules={{ required: "Last Name is required" }}
          control={control}
          label="Last Name"
          labelPlacement="outside"
          placeholder="Last Name"
        />
        <BaseInput
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone Number is required",
            validate: (value) => {
              return isValidPhoneNumber(value) || "Invalid Phone Number";
            },
          }}
          label="Phone Number"
          labelPlacement="outside"
          placeholder="+114155550198"
        />
        <BaseInput
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          type="email"
          label="Work Email"
          labelPlacement="outside"
          placeholder="Work Email"
        />
        <BaseInput
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          name="companyName"
          control={control}
          rules={{ required: "Company Name is required" }}
          label="Company Name"
          labelPlacement="outside"
          placeholder="Company Name"
        />
        <BaseInput
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          name="registrationNumber"
          rules={{ required: "Registration Number is required" }}
          control={control}
          label="MC / DOT / CVOR / Registration Number"
          labelPlacement="outside"
          placeholder="# 000000"
        />
        <BaseFile
          name="file"
          accept=".png,.jpg.jpeg"
          control={control}
          rules={{ required: "Carrier Package is required" }}
          bgColor="bg-gray-100"
          label="Carrier package"
          labelClass="font-bold"
          multiple={false}
          className="w-full"
        />
      </div>
      <div className="flex gap-4">
        <BaseCheckBox control={control} name="shippers">
          Shippers
        </BaseCheckBox>
        <BaseCheckBox control={control} name="carriers">
          Carriers
        </BaseCheckBox>
      </div>
      <BaseButton
        type="submit"
        isLoading={isLoading}
        isDisabled={isLoading}
        extraClass="w-max !min-w-[10rem] !flex !justify-between items-center"
      >
        Contact Us <MdKeyboardDoubleArrowRight className="text-lg" />
      </BaseButton>
    </form>
  );
}

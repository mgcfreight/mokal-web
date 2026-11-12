"use client";

import { useContext, useEffect } from "react";
import { LtlFormContext } from "./ltl-form";
import { FieldValues, useFormContext } from "react-hook-form";
import BaseInput from "@/components/common/forms/base-input";
import BaseButton from "@/components/common/base-button";
import { PackageType } from "@/utils/types";
import { toAddressPayload } from "@/utils/postal-lookup";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export default function Details() {
  const { setActiveState } = useContext(LtlFormContext);
  const { control, handleSubmit, setValue, getValues } = useFormContext();
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
    setActiveState((prev) => prev + 1);
  }
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: any) => axiosInstance.post("/platform/quote-request/ltl", data),
    onError, onSuccess,
  });
  function submit(values: FieldValues) {
    // console.log("neww", values);
    const { pallet, courier, package: packagee } = values;
    const packageType = pallet
      ? PackageType.PALLET
      : courier
      ? PackageType.COURIER_PACK
      : packagee
      ? PackageType.PACKAGE
      : PackageType.ENVELOP;
    const items = values.items.map((e: any) => ({ ...e, packageType }));
    const data = {
      ...values,
      shippingFrom: toAddressPayload(values.shippingFrom),
      shippingTo: toAddressPayload(values.shippingTo),
      packageType,
      items,
    };
    mutate(data);
    // setActiveState((prev) => prev + 1);
  }
  useEffect(() => {
    const { shippingFrom } = getValues();
    setValue("country", shippingFrom.country);
    setValue("city", shippingFrom.city);
  }, []);
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=" bg-white rounded-xl p-8  flex gap-8 flex-col  flex-wrap"
    >
      <div className="flex flex-wrap gap-4">
        <BaseInput
          control={control}
          name="firstName"
          className="flex-[0.5_0_49%]"
          rules={{ required: "First Name is required" }}
          classNames={{
            inputWrapper:
              "bg-transparent border-1 border-base-teal p-7 rounded-xl",
            label: "pb-2",
            input: "!text-base-blue",
          }}
          label="First Name"
          labelPlacement="outside"
          placeholder="Enter"
        />
        <BaseInput
          className="flex-[0.5_0_49%]"
          control={control}
          name="lastName"
          rules={{ required: "Last Name is required" }}
          classNames={{
            inputWrapper:
              "bg-transparent border-1 border-base-teal p-7 rounded-xl",
            label: "pb-2",
            input: "!text-base-blue",
          }}
          label="Last Name"
          labelPlacement="outside"
          placeholder="Enter"
        />
        <BaseInput
          className="flex-[0.5_0_49%]"
          control={control}
          name="country"
          rules={{ required: "Country is required" }}
          classNames={{
            inputWrapper:
              "bg-transparent border-1 border-base-teal p-7 rounded-xl",
            label: "pb-2",
            input: "!text-base-blue",
          }}
          isDisabled={true}
          label="Country"
          labelPlacement="outside"
          placeholder="Select"
        />
        <BaseInput
          className="flex-[0.5_0_49%]"
          control={control}
          name="city"
          isDisabled={true}
          rules={{ required: "City is required" }}
          classNames={{
            inputWrapper:
              "bg-transparent border-1 border-base-teal p-7 rounded-xl",
            label: "pb-2",
            input: "!text-base-blue",
          }}
          label="City"
          labelPlacement="outside"
          placeholder="Select"
        />
        <BaseInput
          className="flex-[0.5_0_49%]"
          control={control}
          rules={{ required: "Email is required" }}
          name="email"
          classNames={{
            inputWrapper:
              "bg-transparent border-1 border-base-teal p-7 rounded-xl",
            label: "pb-2",
            input: "!text-base-blue",
          }}
          label="Email"
          labelPlacement="outside"
          placeholder="Select"
        />
        <BaseInput
          className="flex-[0.5_0_49%]"
          control={control}
          rules={{ required: "Company Name is required" }}
          name="companyName"
          classNames={{
            inputWrapper:
              "bg-transparent border-1 border-base-teal p-7 rounded-xl",
            label: "pb-2",
            input: "!text-base-blue",
          }}
          label="Company Name"
          labelPlacement="outside"
          placeholder="Select"
        />
      </div>
      <div className="flex justify-between">
        <BaseButton
          onClick={() => setActiveState((prev) => prev - 1)}
          extraClass="!p-6"
        >
          Previous
        </BaseButton>
        <BaseButton
          isDisabled={isLoading}
          isLoading={isLoading}
          type="submit"
          extraClass="!p-6"
        >
          Next
        </BaseButton>
      </div>
    </form>
  );
}

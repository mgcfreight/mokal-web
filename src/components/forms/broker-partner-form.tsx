"use client";

import Image from "next/image";
import BaseInput from "../common/forms/base-input";
import BaseButton from "../common/base-button";
import LinearGradientText from "../common/linear-gradient-text";
import { FieldValues, useForm } from "react-hook-form";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export default function BrokerPartnerForm() {
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
    mutationFn: (data: any) => axiosInstance.post("/platform/broker-partner", data),
    onError, onSuccess,
  });

  function brokerPartner(values: FieldValues) {
    mutate(values);
  }
  return (
    <div
      className={`flex sm:flex-row flex-col m-auto sm:px-8 px-4 sm:py-20 bg-white py-16 sm:w-[80%] shadow-lg rounded-xl text-center sm:gap-16 gap-8`}
    >
      <div className="flex flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4">
        <Image
          src={"/images/broker (1).svg"}
          alt="broker"
          width={200}
          height={200}
        />
        <div className="sm:text-[2rem] text-[1.5rem] font-bold">
          <LinearGradientText
            extraClass=""
            text={{ en: "Discover the MGC Freight Advantage", fr: "Découvrez l'avantage de MGC Freight" }}
          />
        </div>
        <p className="text-text-gray text-md">
          Our tailored shipping solutions empower businesses of all sizes with
          speed, reliability, and significant cost savings on pallet, parcel,
          PAK, and envelope shipping. At MGC Freight, we offer a wide range of
          LTL and courier services, including local, cross-border, and
          international shipping. From eCommerce support to white-glove delivery
          and specialized freight handling, you’ll enjoy discounted rates from
          North America’s most trusted carriers. Ready to see how MGC Freight
          can transform your shipping operations? Fill out the form on this page
          to schedule a demo, and one of our Shipping Experts will connect with
          you to show how we can help your business grow with smarter,
          streamlined shipping solutions.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(brokerPartner)}
        className="flex bg-base-shadeBlue p-8 rounded-xl flex-col gap-8 flex-1 items-start"
      >
        <div className="text-2xl font-semibold">
          Reach Out to a Broker Representative
        </div>

        <BaseInput
          name="firstName"
          rules={{ required: "First Name is required" }}
          extraClass=""
          control={control}
          placeholder="First Name"
          label="First Name *"
          labelPlacement="outside"
        />
        <BaseInput
          name="lastName"
          rules={{ required: "Last Name is required" }}
          extraClass=""
          control={control}
          placeholder="Last Name"
          label="Last Name *"
          labelPlacement="outside"
        />
        <BaseInput
          name="companyName"
          rules={{ required: "Company Name is required" }}
          extraClass=""
          control={control}
          placeholder="Company Name"
          label="Company Name *"
          labelPlacement="outside"
        />
        <BaseInput
          name="email"
          extraClass=""
          rules={{ required: " Email is required" }}
          type="email"
          control={control}
          placeholder="Email"
          label="Email *"
          labelPlacement="outside"
        />
        <BaseInput
          name="phoneNumber"
          extraClass=""
          rules={{
            required: "Phone Number is required",
            validate: (value) => {
              return isValidPhoneNumber(value) || "Invalid Phone Number";
            },
          }}
          control={control}
          placeholder="Phone Number"
          label="Phone Number *"
          labelPlacement="outside"
        />
        <BaseButton
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
          extraClass="!py-6"
        >
          Become a Broker Partner <MdKeyboardDoubleArrowRight />
        </BaseButton>
      </form>
    </div>
  );
}

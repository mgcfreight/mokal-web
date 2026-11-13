"use client";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BaseButton from "../common/base-button";
import BaseInput from "../common/forms/base-input";
import LinearGradientText from "../common/linear-gradient-text";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export default function CorporatePartnerForm() {
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
    mutationFn: (data: any) => axiosInstance.post("/platform/corporate-partner", data),
    onError, onSuccess,
  });

  function corporatePartner(values: FieldValues) {
    mutate(values);
  }
  return (
    <div className="bg-base-shadeBlue w-full sm:py-20  py-8">
      <div
        className={`flex sm:flex-row flex-col m-auto sm:px-8 px-4 sm:py-20 bg-white py-16 sm:w-[80%] shadow-lg rounded-xl text-center sm:gap-16 gap-8`}
      >
        <div className="flex flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4">
          <Image
            src={"/images/office-building (1).svg"}
            alt="broker"
            width={200}
            height={200}
          />
          <h1 className="sm:text-[2rem] text-[1.5rem] font-bold">
            <LinearGradientText
              extraClass=""
              text="Building Strong Partnerships"
            />
          </h1>
          <p className="text-text-gray text-md">
            Our Corporate Partnership program is designed to create meaningful
            cross-promotional opportunities. Highlight special offers to MGC
            Freight customers, expand your audience reach, and deliver
            exceptional solutions while offering exclusive access to our
            comprehensive shipping platform to your customer base. Seamless
            IntegrationConnect with hundreds of small and medium-sized
            businesses seeking tools and services to fuel their growth. Enhanced
            Customer SupportEmpower your customers with MGC Freight’s
            cutting-edge freight management platform, built to streamline their
            shipping operations. Shared SuccessEstablish a lasting partnership
            grounded in trust and a mutual commitment to helping businesses
            reach their full potential.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(corporatePartner)}
          className="flex bg-base-shadeBlue p-8 rounded-xl flex-col gap-8 flex-1 items-start"
        >
          <h1 className="text-2xl font-semibold">
            Reach Out to a Broker Representative
          </h1>
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
          <BaseInput
            type="number"
            name="size"
            rules={{ required: "Size is required" }}
            extraClass=""
            control={control}
            placeholder="Enter Size"
            label="Size of Partnership Audience "
            labelPlacement="outside"
          />
          <BaseInput
            name="description"
            extraClass=""
            rules={{ required: "Description is required" }}
            control={control}
            placeholder="Describe"
            label="Describe the type of partnership "
            labelPlacement="outside"
          />

          <BaseButton
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
            extraClass="!py-6"
          >
            Become a Corporate Partner <MdKeyboardDoubleArrowRight />
          </BaseButton>
        </form>
      </div>
    </div>
  );
}

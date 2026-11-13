"use client";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BaseButton from "../common/base-button";
import BaseInput from "../common/forms/base-input";
import BaseSelect from "../common/forms/base-select";
import LinearGradientText from "../common/linear-gradient-text";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";

const regionItems = [
  { name: "US", value: "US" },
  { name: "CA", value: "CA" },
];

const typeOfShipmentItems = [
  { name: "Pallet", value: 1 },
  { name: "Package", value: 2 },
  { name: "Courier Pack", value: 3 },
  { name: "Envelop", value: 4 },
];

const shipmentRatioItems = [
  { name: "10-15 Shipments", value: "10-15 Shipments" },
];

export default function BookADemoForm() {
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
    mutationFn: (data: any) => axiosInstance.post("/platform/book-a-demo", data),
    onError, onSuccess,
  });

  function bookDemo(values: FieldValues) {
    const data = {
      ...values,
      typeOfShipment: Number(values.typeOfShipment),
    };
    mutate(data);
  }

  return (
    <div
      className={`flex sm:flex-row flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] shadow-lg rounded-xl text-center sm:gap-16 gap-8`}
    >
      <div className="flex flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4">
        <div className="sm:text-[2rem] text-[1.5rem] font-bold">
          <LinearGradientText
            extraClass=""
            text={{ en: "Discover the MGC Freight Advantage", fr: "Découvrez les avantages du fret MGC" }}
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
        onSubmit={handleSubmit(bookDemo)}
        className="flex flex-col gap-8 flex-1 items-start"
      >
        <div className="text-2xl font-semibold">Reach Out to Book a Demo</div>
        <BaseSelect
          control={control}
          name="region"
          rules={{ required: "Region is required" }}
          items={regionItems}
          label="Select Region *"
          labelPlacement="outside"
          placeholder="Select"
        />
        <BaseSelect
          control={control}
          rules={{ required: "Type Of Shipment is required" }}
          name="typeOfShipment"
          items={typeOfShipmentItems}
          label="Type of Shipment *"
          labelPlacement="outside"
          placeholder="Pallets"
        />
        <BaseSelect
          control={control}
          rules={{ required: "Shipment Ratio is required" }}
          name="shipmentRation"
          items={shipmentRatioItems}
          label="Shipment Ratio *"
          labelPlacement="outside"
          placeholder="10 - 15 Shipments"
        />
        <BaseInput
          control={control}
          rules={{ required: "Email is required" }}
          name="email"
          extraClass=""
          placeholder="Email"
          label="Email *"
          labelPlacement="outside"
        />
        <BaseButton
          isLoading={isLoading}
          isDisabled={isLoading}
          type="submit"
          extraClass="!py-6"
        >
          Start Booking <MdKeyboardDoubleArrowRight />
        </BaseButton>
      </form>
    </div>
  );
}

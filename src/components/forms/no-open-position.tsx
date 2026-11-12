"use client";

import { FieldValues, useForm } from "react-hook-form";
import BaseInput from "../common/forms/base-input";
import BaseButton from "../common/base-button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BaseFile from "../common/forms/base-file";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import BaseTextArea from "../common/forms/base-textarea";

export default function NoOpenPositionForm() {
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
    mutationFn: (data: any) => axiosInstance.postForm("/platform/job-position", data),
    onError, onSuccess,
  });

  function positionSubmit(values: FieldValues) {
    const {
      email,
      firstName,
      lastName,
      position,
      resume,
      coverLetter,
      message,
    } = values;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("position", position);
    formData.append("message", message);
    formData.append("resume", resume[0]);
    if (coverLetter) {
      formData.append("coverLetter", coverLetter[0]);
    }
    mutate(formData);
  }
  return (
    <form
      onSubmit={handleSubmit(positionSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex sm:gap-4 gap-8 flex-wrap">
        <BaseInput
          name="firstName"
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          rules={{ required: "First Name is required" }}
          control={control}
          label="First Name"
          labelPlacement="outside"
          placeholder="First Name"
        />
        <BaseInput
          name="lastName"
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          control={control}
          rules={{ required: "Last Name is required" }}
          label="Last Name"
          labelPlacement="outside"
          placeholder="Last Name"
        />
        <BaseInput
          name="email"
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          control={control}
          rules={{ required: "Email is required" }}
          type="email"
          label="Work Email"
          labelPlacement="outside"
          placeholder="Work Email"
        />
        <BaseInput
          name="position"
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_40%]"
          rules={{ required: "Position is required" }}
          control={control}
          label="Position you are looking for? *"
          labelPlacement="outside"
          placeholder="Position"
        />
        <BaseFile
          name="resume"
          rules={{ required: "Resume is required" }}
          control={control}
          className="flex-[1_0_100%]"
          bgColor="bg-gray-100"
          label="Resume *"
        />
        <BaseFile
          name="coverLetter"
          control={control}
          className="flex-[1_0_100%]"
          bgColor="bg-gray-100"
          label="Cover Letter"
        />

        <BaseTextArea
          name="message"
          control={control}
          rules={{ required: "Message is required" }}
          className="flex-1"
          label="Message"
          labelPlacement="outside"
          placeholder="Write Message"
          minRows={7}
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

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BaseButton from "../common/base-button";
import BaseFile from "../common/forms/base-file";
import BaseTextArea from "../common/forms/base-textarea";
import BaseInput from "../common/forms/base-input";
import { PortableText } from "@portabletext/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const components = {
  // types: {
  //     image: ({ value }:any) => <img src={value.imageUrl} />,
  // },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({ children }: any) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={(target === "_blank" && "noindex nofollow") as string}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => (
      <b className="text-black font-bold">{children}</b>
    ),
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }: any) => (
      <h1 className="text-2xl mt-5 font-semibold">{children}</h1>
    ),
    normal: ({ children }: any) => <h1 className=" mt-2 ">{children}</h1>,

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => <ul className="mt-xl mt-2">{children}</ul>,
    number: ({ children }: any) => <ol className="mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }: any) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <li className="list-disc leading-relaxed mt-2 ml-5">{children}</li>
    ),
    decimal: ({ children }: any) => (
      <li className="list-desc leading-relaxed mt-2 ml-5">{children}</li>
    ),
    // Ex. 2: rendering custom list items
    checkmarks: ({ children }: any) => <li>✅ {children}</li>,
  },
};

export default function CareerOppurtunity({
  content,
  position,
}: {
  content: any;
  position: any;
}) {
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
    mutationFn: (data: any) => axiosInstance.postForm("/platform/jobApply", data),
    onError, onSuccess,
  });
  function submit(e: FieldValues) {
    const { email, firstName, lastName, resume, coverLetter, message } = e;
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
      onSubmit={handleSubmit(submit)}
      className="w-full flex flex-col gap-2"
    >
      <PortableText value={content} components={components} />

      <div className="flex gap-4 flex-wrap mt-4">
        <BaseInput
          name="firstName"
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_20%]"
          rules={{ required: "First Name is required" }}
          control={control}
          label="First Name"
          labelPlacement="outside"
          placeholder="First Name"
        />
        <BaseInput
          name="lastName"
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_20%]"
          control={control}
          rules={{ required: "Last Name is required" }}
          label="Last Name"
          labelPlacement="outside"
          placeholder="Last Name"
        />
        <BaseInput
          name="email"
          classNames={{ label: "!font-thin !text-sm" }}
          extraClass="flex-[1_0_20%]"
          control={control}
          rules={{ required: "Email is required" }}
          type="email"
          label="Work Email"
          labelPlacement="outside"
          placeholder="Work Email"
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
        className="self-start !bg-base-purple !text-white mt-4"
        isLoading={isLoading}
        isDisabled={isLoading}
        type="submit"
        extraClass="!py-6"
      >
        Submit Application <MdKeyboardDoubleArrowRight />
      </BaseButton>
    </form>
  );
}

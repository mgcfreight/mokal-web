import BaseButton from "@/components/common/base-button";
import BaseInput from "@/components/common/forms/base-input";
import BaseSwitch from "@/components/common/forms/base-switch";
import {
  INVALID_POSTAL_MESSAGE,
  LOOKUP_FAILED_MESSAGE,
  PostalLocation,
  UNSUPPORTED_COUNTRY_MESSAGE,
  isSupportedLocation,
  lookupPostalCode,
  normalizePostalCode,
} from "@/utils/postal-lookup";
import { Input, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";
import Image from "next/image";
import { useContext, useEffect } from "react";
import {
  Controller,

  useController,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { PiWarningCircleFill } from "react-icons/pi";
import { LtlFormContext } from "./ltl-form";
import { PalletFreightClass, PalletType } from "@/utils/types";
const palletValues = Object.entries(PalletFreightClass)
  .filter(([key]) => key.includes("_"))
  .map(([key, value]) => ({
    name: key.replaceAll("_", "").replaceAll("Point", "."),
    value,
  }));
const typeValues = Object.entries(PalletType)
  .filter(([key]) => Number.isNaN(Number(key)))
  .map(([key, value]) => ({
    name: key,
    value,
  }));
export default function PackageLTL() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
    trigger,
    getValues,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: "items", control });
  const watchValues = useWatch({ control });
  const { setActiveState } = useContext(LtlFormContext);
  useEffect(() => {
    if (!fields.length) {
      append({
        length: "",
        weight: "",
        width: "",
        height: "",
        freightClass: "",
        type: "",
        pieces: "",
        description: "",
      });
    }
  }, []);

  function submit() {
    // console.log("values", values);
    setActiveState((prev) => prev + 1);
  }

  const { field: radioFields, fieldState: radioFieldState } = useController({
    name: "measurementType",
    control,
    rules: { required: "Class is required" },
  });

  function fillLocation(
    prefix: "shippingFrom" | "shippingTo",
    loc: PostalLocation | null
  ) {
    setValue(`${prefix}.city`, loc?.city ?? "");
    setValue(`${prefix}.country`, loc?.country ?? "");
    setValue(`${prefix}.countryCode`, loc?.countryCode ?? "");
    setValue(`${prefix}.state`, loc?.state ?? "");
    setValue(`${prefix}.stateCode`, loc?.stateCode ?? "");
  }

  // Auto-fill country/state/city shortly after the user stops typing.
  // The validator does the lookup and fills the fields.
  function scheduleLookup(
    prefix: "shippingFrom" | "shippingTo",
    postal: unknown
  ) {
    if (normalizePostalCode(postal).length < 5) {
      fillLocation(prefix, null);
      return;
    }
    const timeOut = setTimeout(() => trigger(`${prefix}.postalCode`), 600);
    return () => clearTimeout(timeOut);
  }

  const fromPostal = watchValues?.shippingFrom?.postalCode;
  const toPostal = watchValues?.shippingTo?.postalCode;
  useEffect(() => scheduleLookup("shippingFrom", fromPostal), [fromPostal]);
  useEffect(() => scheduleLookup("shippingTo", toPostal), [toPostal]);

  // Validate against the API itself instead of fields that may not be filled yet.
  function postalValidator(prefix: "shippingFrom" | "shippingTo") {
    return async (value: string) => {
      const isCurrent = () =>
        normalizePostalCode(getValues(`${prefix}.postalCode`)) ===
        normalizePostalCode(value);
      let loc: PostalLocation | null;
      try {
        loc = await lookupPostalCode(value);
      } catch {
        if (!isCurrent()) return true;
        fillLocation(prefix, null);
        return LOOKUP_FAILED_MESSAGE;
      }
      // A slower response for an older value must not overwrite the fields
      // or set an error: the run for the current value decides that.
      if (!isCurrent()) return true;
      fillLocation(prefix, loc);
      if (!loc) return INVALID_POSTAL_MESSAGE;
      return isSupportedLocation(loc) || UNSUPPORTED_COUNTRY_MESSAGE;
    };
  }

  useEffect(() => {
    const { envelop, package: packagee, courier, pallet } = watchValues;
    if (packagee) {
      setValue("pallet", null);
      setValue("envelop", null);
      setValue("courier", null);
    }
    if (envelop) {
      setValue("pallet", null);
      setValue("package", null);
      setValue("courier", null);
    }
    if (courier) {
      setValue("pallet", null);
      setValue("envelop", null);
      setValue("package", null);
    }
    if (pallet) {
      setValue("package", null);
      setValue("envelop", null);
      setValue("courier", null);
    }
    if (!envelop && !packagee && !courier && !pallet) {
      return;
    }
    trigger("package");
    trigger("envelop");
    trigger("courier");
    trigger("pallet");
    // if (!packagee && !envelop && !courier && !pallet) {
    //   setValue("pallet", null, { shouldValidate: true });
    //   setValue("envelop", null, { shouldValidate: true });
    //   setValue("package", null, { shouldValidate: true });
    //   setValue("courier", null, { shouldValidate: true });
    // }
  }, [
    watchValues.envelop,
    watchValues.pallet,
    watchValues.package,
    watchValues.courier,
  ]);

  const switchErrors =
    !!errors.pallet && !!errors.package && !!errors.courier && !!errors.envelop;

  //   console.log(watchValues);
  //   console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-white rounded-xl p-8 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4 items-start">
        <p className="text-base-purple font-semibold text-lg">
          Select Your Package Type:
        </p>
        <div className="flex gap-4 w-full">
          <div
            className={`flex flex-1 p-4 justify-between ${
              switchErrors && "border-red-400 text-red-400"
            } border-base-teal border-1 rounded-lg`}
          >
            <div className="flex gap-4 items-center">
              <Image
                src={"/icons/pallet.svg"}
                width={30}
                height={30}
                alt="pallet"
              />
              <p>Pallet</p>
            </div>
            <BaseSwitch
              defaultSelected={true}
              name="pallet"
              control={control}
              rules={{
                validate: (value, formValues) => {
                  return (
                    !!value ||
                    !!formValues.package ||
                    !!formValues.courier ||
                    !!formValues.envelop
                  );
                },
              }}
            />
          </div>

          <div
            className={`flex flex-1 p-4 justify-between ${
              switchErrors && "border-red-400 text-red-400"
            } border-base-teal border-1 rounded-lg`}
          >
            <div className="flex gap-4 items-center">
              <Image
                src={"/icons/package.svg"}
                width={30}
                height={30}
                alt="pallet"
              />
              <p>Package</p>
            </div>
            <BaseSwitch
              name="package"
              control={control}
              rules={{
                validate: (value, formValues) => {
                  console.log("packagee", formValues);
                  return (
                    !!value ||
                    !!formValues.pallet ||
                    !!formValues.courier ||
                    !!formValues.envelop
                  );
                },
              }}
            />
          </div>

          <div
            className={`flex flex-1 p-4 justify-between ${
              switchErrors && "border-red-400 text-red-400"
            } border-base-teal border-1 rounded-lg`}
          >
            <div className="flex gap-4 items-center">
              <Image
                src={"/icons/courier-pack.svg"}
                width={30}
                height={30}
                alt="pallet"
              />
              <p>Courier Pack</p>
            </div>
            <BaseSwitch
              name="courier"
              control={control}
              rules={{
                validate: (value, formValues) => {
                  return (
                    !!value ||
                    !!formValues.package ||
                    !!formValues.pallet ||
                    !!formValues.envelop
                  );
                },
              }}
            />
          </div>

          <div
            className={`flex flex-1 p-4 justify-between ${
              switchErrors && "border-red-400 text-red-400"
            } border-base-teal border-1 rounded-lg`}
          >
            <div className="flex gap-4 items-center">
              <Image
                src={"/icons/envelop-check.svg"}
                width={30}
                height={30}
                alt="pallet"
              />
              <p>Envelop</p>
            </div>
            <BaseSwitch
              name="envelop"
              control={control}
              rules={{
                validate: (value, formValues) => {
                  return (
                    !!value ||
                    !!formValues.package ||
                    !!formValues.courier ||
                    !!formValues.pallet
                  );
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <p className="text-base-purple font-semibold text-lg">Shipping From:</p>
        <div className="flex gap-4 w-full">
          <BaseInput
            name="shippingFrom.postalCode"
            maxLength={10}
            classNames={{
              inputWrapper:
                "bg-transparent border-1 border-base-teal p-7 rounded-xl",
              label: "pb-2",
              input: "!text-base-blue",
            }}
            control={control}
            onValueChange={(value) => {
              setValue(
                "shippingFrom.postalCode",
                value.trim().replaceAll(" ", "")
              );
            }}
            rules={{
              required: "Postal Code is required",
              minLength: {
                value: 5,
                message: "Min Length is 5",
              },
              validate: postalValidator("shippingFrom"),
            }}
            label="Postal / Zip Code *"
            labelPlacement="outside"
            placeholder="Enter Postal Code"
          />

          <BaseInput
            control={control}
            name="shippingFrom.country"
            classNames={{
              inputWrapper:
                "bg-transparent border-1 border-base-teal p-7 rounded-xl",
              label: "pb-2",
              input: "!text-base-blue",
            }}
            label="Country"
            isDisabled={true}
            labelPlacement="outside"
            placeholder="Select"
          />

          <BaseInput
            control={control}
            name="shippingFrom.state"
            classNames={{
              inputWrapper:
                "bg-transparent border-1 border-base-teal p-7 rounded-xl",
              label: "pb-2",
              input: "!text-base-blue",
            }}
            isDisabled={true}
            label="State"
            labelPlacement="outside"
            placeholder="Select"
          />

          <BaseInput
            control={control}
            name="shippingFrom.city"
            classNames={{
              inputWrapper:
                "bg-transparent border-1 border-base-teal p-7 rounded-xl",
              label: "pb-2",
              input: "!text-base-blue",
            }}
            isDisabled={true}
            label="City"
            labelPlacement="outside"
            placeholder="Select"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <p className="text-base-purple font-semibold text-lg">Shipping To:</p>
        <div className="flex gap-4 w-full">
          <BaseInput
            name="shippingTo.postalCode"
            maxLength={10}
            onValueChange={(value) => {
              setValue(
                "shippingTo.postalCode",
                value.trim().replaceAll(" ", "")
              );
            }}
            rules={{
              required: "Postal Code is required",
              minLength: {
                value: 5,
                message: "Min Length is 5",
              },
              validate: postalValidator("shippingTo"),
            }}
            classNames={{
              inputWrapper:
                "bg-transparent border-1 border-base-teal p-7 rounded-xl",
              label: "pb-2",
              input: "!text-base-blue",
            }}
            control={control}
            label="Postal / Zip Code *"
            labelPlacement="outside"
            placeholder="Enter Postal Code"
          />

          <BaseInput
            control={control}
            name="shippingTo.country"
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
            control={control}
            name="shippingTo.state"
            classNames={{
              inputWrapper:
                "bg-transparent border-1 border-base-teal p-7 rounded-xl",
              label: "pb-2",
              input: "!text-base-blue",
            }}
            isDisabled={true}
            label="State"
            labelPlacement="outside"
            placeholder="Select"
          />

          <BaseInput
            control={control}
            name="shippingTo.city"
            classNames={{
              inputWrapper:
                "bg-transparent border-1 border-base-teal p-7 rounded-xl",
              label: "pb-2",
              input: "!text-base-blue",
            }}
            isDisabled={true}
            label="City"
            labelPlacement="outside"
            placeholder="Select"
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 items-start">
        <p className="text-base-purple font-semibold text-lg">
          Dimensions & Weight:
        </p>
        <div className="flex gap-4 w-full ">
          {/* <BaseInput type="number" className="max-w-52" classNames={{ inputWrapper: "bg-transparent border-1 border-base-teal p-7 rounded-xl", label: "pb-2", input: "!text-base-blue" }} control={control} label="Quantity" labelPlacement="outside" placeholder="Enter " /> */}
          <div className="flex flex-col gap-4 items-start flex-1">
            <p>Class & Density Calculator</p>
            <RadioGroup
              {...radioFields}
              isInvalid={!!radioFieldState.error}
              errorMessage={radioFieldState.error?.message}
              classNames={{ wrapper: "!flex-row !flex-nowrap" }}
              className="w-full items-start"
            >
              <Radio value={"1"}>
                <div className="flex gap-2 items-center">
                  <p>Metric ( cm & kg ) </p>{" "}
                  <PiWarningCircleFill className="text-base-blue" />
                </div>
              </Radio>
              <Radio value={"2"}>Imperial ( in & lbs )</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            {fields.map((e: any, index, array) => (
              <div key={e.id} className="flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                  <Input
                    className="flex-1"
                    // control={control}
                    type="number"
                    // name={`items.${index}.length`}
                    {...register(`items.${index}.length`, {
                      required: "Length is required",
                    })}
                    min={1}
                    isInvalid={!!(errors.items as any)?.[index]?.length}
                    // errorMessage={
                    //   (errors.items as any)?.[index]?.length?.message
                    // }
                    classNames={{
                      inputWrapper:
                        "bg-transparent border-1 border-base-teal p-7 rounded-xl",
                      label: "pb-2",
                      input: "!text-base-blue",
                      helperWrapper: "text-start",
                    }}
                    label="Length (CM) *"
                    labelPlacement="outside"
                    placeholder="Enter "
                  />

                  <Input
                    className="flex-1"
                    // control={control}
                    // name={`items.${index}.width`}
                    type="number"
                    min={1}
                    {...register(`items.${index}.width`, {
                      required: "Width is required",
                    })}
                    isInvalid={!!(errors.items as any)?.[index]?.width}
                    // errorMessage={
                    //   (errors.items as any)?.[index]?.width?.message
                    // }
                    classNames={{
                      inputWrapper:
                        "bg-transparent border-1 border-base-teal p-7 rounded-xl",
                      label: "pb-2",
                      input: "!text-base-blue",
                      helperWrapper: "text-start",
                    }}
                    label="Width (CM) *"
                    labelPlacement="outside"
                    placeholder="Enter "
                  />

                  <Input
                    className="flex-1"
                    min={1}
                    // control={control}
                    // name={`items.${index}.height`}
                    type="number"
                    {...register(`items.${index}.height`, {
                      required: "Height is required",
                    })}
                    isInvalid={!!(errors.items as any)?.[index]?.height}
                    // errorMessage={
                    //   (errors.items as any)?.[index]?.height?.message
                    // }
                    classNames={{
                      inputWrapper:
                        "bg-transparent border-1 border-base-teal p-7 rounded-xl",
                      label: "pb-2",
                      input: "!text-base-blue",
                      helperWrapper: "text-start",
                    }}
                    label="Height (CM) *"
                    labelPlacement="outside"
                    placeholder="Enter "
                  />

                  <Input
                    className="flex-1"
                    // control={control}
                    min={1}
                    // name={`items.${index}.weight`}
                    type="number"
                    {...register(`items.${index}.weight`, {
                      required: "Weight is required",
                    })}
                    isInvalid={!!(errors.items as any)?.[index]?.weight}
                    // errorMessage={
                    //   (errors.items as any)?.[index]?.weight?.message
                    // }
                    classNames={{
                      inputWrapper:
                        "bg-transparent border-1 border-base-teal p-7 rounded-xl",
                      label: "pb-2",
                      input: "!text-base-blue",
                      helperWrapper: "text-start",
                    }}
                    label="Weight (KG) *"
                    labelPlacement="outside"
                    placeholder="Enter "
                  />

                  {/* <Controller control={control} render={(field, fi)} /> */}

                  <Controller
                    rules={{ required: "Freight Class is required" }}
                    render={({ field }) => (
                      <Select
                        className="flex-1"
                        selectedKeys={[field.value]}
                        {...field}
                        isInvalid={
                          !!(errors.items as any)?.[index]?.freightClass
                        }
                        label="Freight Class *"
                        labelPlacement="outside"
                        placeholder="Select "
                        classNames={{
                          base: "!m-0 ",

                          trigger: `${
                            !!(errors.items as any)?.[index]?.freightClass
                              ? ""
                              : "bg-transparent"
                          } border-1 border-base-teal p-7 rounded-xl`,
                          label: "",
                          value: "!text-base-blue",
                          helperWrapper: "text-start",
                        }}
                      >
                        {palletValues.map((pallet) => (
                          <SelectItem key={pallet.value}>
                            {pallet.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    control={control}
                    name={`items.${index}.palletFreightClass`}
                  />

                  <Controller
                    rules={{ required: "Type is required" }}
                    render={({ field }) => (
                      <Select
                        className="flex-1"
                        selectedKeys={[field.value]}
                        {...field}
                        isInvalid={!!(errors.items as any)?.[index]?.type}
                        label="Type *"
                        labelPlacement="outside"
                        placeholder="Select "
                        classNames={{
                          base: "!m-0 ",

                          trigger: `${
                            !!(errors.items as any)?.[index]?.type
                              ? ""
                              : "bg-transparent"
                          } border-1 border-base-teal p-7 rounded-xl`,
                          label: "",
                          value: "!text-base-blue",
                          helperWrapper: "text-start",
                        }}
                      >
                        {typeValues.map((pallet) => (
                          <SelectItem key={pallet.value}>
                            {pallet.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    control={control}
                    name={`items.${index}.palletType`}
                  />

                  <Input
                    type="number"
                    className="flex-1"
                    {...register(`items.${index}.pieces`, {
                      required: "Pieces is required",
                    })}
                    isInvalid={!!(errors.items as any)?.[index]?.pieces}
                    // errorMessage={
                    //   (errors.items as any)?.[index]?.pieces?.message
                    // }
                    classNames={{
                      inputWrapper:
                        "bg-transparent border-1 border-base-teal p-7 rounded-xl",
                      label: "pb-2",
                      input: "!text-base-blue",
                      helperWrapper: "text-start",
                    }}
                    label="Pieces *"
                    labelPlacement="outside"
                    placeholder="Enter "
                  />
                </div>
                <div className="flex justify-between gap-4 items-end">
                  <Input
                    // control={control}
                    // name={`items.${index}.description`}

                    {...register(`items.${index}.description`, {
                      required: "Description is required",
                    })}
                    isInvalid={!!(errors.items as any)?.[index]?.description}
                    errorMessage={
                      (errors.items as any)?.[index]?.description?.message
                    }
                    classNames={{
                      inputWrapper:
                        "bg-transparent border-1 border-base-teal p-7 rounded-xl",
                      label: "pb-2",
                      input: "!text-base-blue",
                      helperWrapper: "text-start",
                    }}
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Description"
                  />
                  {!!(array.length - 1) && (
                    <BaseButton onClick={() => remove(index)}>
                      Delete
                    </BaseButton>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <BaseButton
              onClick={() =>
                append({
                  length: "",
                  weight: "",
                  width: "",
                  height: "",
                  freightClass: "",
                  type: "",
                  pieces: "",
                  description: "",
                })
              }
            >
              Add More
            </BaseButton>
          </div>
        </div>

        {/* <div className="flex gap-4">
          <p className="text-base-purple font-semibold text-md">
            Extra services:
          </p>
          <Checkbox>Express Delivery</Checkbox>
          <Checkbox>Insurance</Checkbox>
          <Checkbox>Packaging</Checkbox>
          <Checkbox>Fragile</Checkbox>
        </div> */}
      </div>

      <div className="flex justify-end">
        <BaseButton type="submit" extraClass="!p-6">
          Next
        </BaseButton>
      </div>
    </form>
  );
}

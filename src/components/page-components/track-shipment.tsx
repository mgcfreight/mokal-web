"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BiCopy } from "react-icons/bi";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { use, useEffect } from "react";
import BaseButton from "../common/base-button";
import BaseInput from "../common/forms/base-input";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ShipmentStatus } from "@/utils/types";

const trackingItems = [
  { name: "Ready To Ship", value: ShipmentStatus.READYTOSHIP },
  { name: "In Transit", value: ShipmentStatus.IN_TRANSIT },
  { name: "Exception", value: ShipmentStatus.EXCEPTION },
  { name: "Delivered", value: ShipmentStatus.DELIVERED },
];

export default function TrackShipment({
  searchParams,
}: {
  searchParams?: Promise<{ id: string }>;
}) {
  const { id } = use(searchParams!);
  const { control, setValue, handleSubmit } = useForm();
  

  const { mutate, isPending: isLoading, data } = useMutation({
    mutationFn: (data: string) =>
      axiosInstance.get<any>(`/shipment/track?trackingId=${data}`),
    onSuccess,
  });

  function onSuccess(dataa: any) {
    const {
      data: { data },
    } = dataa;
    if (!data) {
    }
    console.log(data);
  }

  function submit(e: FieldValues) {
    mutate(e.trackingid);
  }

  useEffect(() => {
    if (id) {
      mutate(id);
      setValue("trackingid", id);
    }
  }, [id]);

  // console.log("dataaa", data);

  return (
    <div
      className={`flex items-start flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center sm:gap-16 gap-4`}
    >
      <form onSubmit={handleSubmit(submit)} className="flex w-full">
        <BaseInput
          name="trackingid"
          placeholder="Enter Tracking Number"
          control={control}
          extraClass="flex-1 !rounded-r-none"
          classNames={{ inputWrapper: "rounded-r-none" }}
        />
        <BaseButton
          isLoading={isLoading}
          isDisabled={isLoading}
          type="submit"
          extraClass="!rounded-l-none"
        >
          Check Status
        </BaseButton>
      </form>

      {data && data.data.data && (
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Shipment ID</TableColumn>
            <TableColumn>Created On</TableColumn>
            <TableColumn>Shipment Status</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="sm:!w-[40%] w-[20rem]">
                <div className="flex gap-4 items-center">
                  <Image
                    src={"/icons/shipment.svg"}
                    alt="shipment"
                    height={40}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="flex gap-2">
                      #{data.data.data.shipment.id}{" "}
                      <BiCopy
                        onClick={async () =>
                          await navigator.clipboard.writeText(
                            data.data.data.shipment.id
                          )
                        }
                        className="text-base-blue cursor-pointer text-lg"
                      />
                    </p>
                    {/* <p className="flex gap-2">
                      #TOR6347247 <BiCopy className="text-base-blue text-lg" />
                    </p>
                    <p>LTL</p> */}
                  </div>
                </div>
              </TableCell>
              <TableCell className="sm:!w-[10%] w-[10rem]">
                {new Date(
                  data.data.data.shipment.createdAt
                ).toLocaleDateString()}
              </TableCell>
              <TableCell className="sm:!w-[50%] w-[50rem]">
                <div className="p-4">
                  <div className="flex relative">
                    {/* 52 */}
                    {/* 15 */}
                    <hr
                      className={`flex-[0_0_${
                        data.data.data.tracking.trackingDetail.trackingStatus ==
                        4
                          ? 0
                          : data.data.data.tracking.trackingDetail
                              .trackingStatus == 5
                          ? 33
                          : data.data.data.tracking.trackingDetail
                              .trackingStatus == 8
                          ? 68
                          : data.data.data.tracking.trackingDetail
                              .trackingStatus == 6
                          ? 100
                          : 0
                      }%] border-solid border-[0.45rem] border-b-0 border-base-blue rounded-full`}
                    />
                    <hr className="flex-1 border-dotted bg-gray-100 border-b-0 border-[0.45rem] border-gray-200 rounded-full" />
                    {trackingItems.map((e) => (
                      <div
                        key={e.name}
                        className={`flex flex-col -top-2 ${
                          e.value == 4
                            ? "-left-2"
                            : e.value == 5
                            ? "left-1/3"
                            : e.value == 8
                            ? "left-[68%]"
                            : "right-0 items-end"
                        }  absolute`}
                      >
                        {e.value == data.data.data.tracking.trackingDetail && (
                          <FaCheck className="bg-green-500 text-white rounded-full p-2 text-[1.8rem]" />
                        )}

                        {e.value != data.data.data.tracking.trackingDetail && (
                          <div className="w-[1.7rem] bg-white  h-[1.7rem] border-2 border-base-blue rounded-full"></div>
                        )}

                        <p>{e.name}</p>
                      </div>
                    ))}
                    {/* <div className="flex flex-col -top-2 -left-2 absolute">
                      <FaCheck className="bg-green-500 text-white rounded-full p-2 text-[1.8rem]" />
                      <p>Ready To Ship</p>
                    </div>

                    <div className="flex flex-col -top-2 left-1/3  absolute">
                      <FaCheck className="bg-green-500 text-white rounded-full p-2 text-[1.8rem]" />
                      <p>Pick up</p>
                    </div>

                    <div className="flex flex-col -top-2 left-[68%]  absolute">
                      <FaCheck className="bg-green-500 text-white rounded-full p-2 text-[1.8rem]" />
                      <p>In Transit</p>
                    </div>

                    <div className="flex flex-col -top-2 right-0 items-end absolute">
                      <div className="w-[1.7rem] bg-white  h-[1.7rem] border-2 border-base-blue rounded-full"></div>
                      <p>Delivered</p>
                    </div> */}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      {data && !data.data.data && <div className="flex justify-center"></div>}
    </div>
  );
}

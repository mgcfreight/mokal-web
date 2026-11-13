"use client";

import BaseButton from "../common/base-button";
import BaseInput from "../common/forms/base-input";
import { Accordion, AccordionItem } from "@heroui/react";
import { FieldValues, useForm } from "react-hook-form";
import LinearGradientText from "../common/linear-gradient-text";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import CareerOppurtunity from "./career-oppurtunity";
import { useDebouncedValue } from "@/utils/use-debounced-value";

const MAX_LIMIT = 20;

export default function CareerOppurtunities() {
  // Defaults keep the first /api/jobs request from sending "undefined"
  // (limit=undefined made the route build an invalid query and return 500).
  const { control, watch } = useForm<FieldValues>({
    defaultValues: { search: "", limit: 4 },
  });
  const [page, setPage] = useState(1);

  const search = useDebouncedValue(((watch("search") as string) ?? "").trim());

  // /api/jobs accepts 1..MAX_LIMIT; keep whatever is typed inside that range.
  const typedLimit = Math.trunc(Number(watch("limit")));
  const limit = Number.isFinite(typedLimit)
    ? Math.min(Math.max(typedLimit, 1), MAX_LIMIT)
    : 1;
  const { data } = useQuery({
    queryKey: ["jobs", search, limit, page],
    queryFn: ({ queryKey }) =>
      axios.get("/api/jobs", {
        params: { job: queryKey[1], limit: queryKey[2], page: queryKey[3] },
      }),
  });

  useEffect(() => {
    setPage(1);
  }, [limit, search]);

  return (
    <div
      className={`  p-8 flex flex-col gap-16 sm:w-[80%] m-auto items-center `}
    >
      <div>
        <div className="sm:text-[2.3rem] text-[1.5rem] font-bold">
          Current <LinearGradientText text={{ en: "Career Opportunities", fr: "Possibilités de Carrière" }} />
        </div>
        <p className="text-text-darkGray">
          View available openings with MGC Freight across our many locations.
        </p>
      </div>
      <BaseInput
        name="search"
        classNames={{ inputWrapper: "p-6" }}
        extraClass="w-full"
        control={control}
        placeholder="Search Positions"
        endContent={<BiSearch size={20} />}
      />
      {data && data.data.data.length !== 0 && (
        <div className="flex flex-col gap-8 w-full">
          <Accordion variant="splitted" className="p-0">
            {data.data.data.map((e: any, index: number) => (
              <AccordionItem
                key={e.name + index}
                className="bg-transparent shadow-none border-1 border-gray-200"
                classNames={{
                  title: "font-semibold text-lg",
                  indicator: "!rotate-0",
                }}
                title={e.name}
                indicator={
                  <p
                    onClick={() => { }}
                    className="p-2 bg-transparent border-base-blue border-2 rounded-xl text-base-blue "
                  >
                    Apply Now
                  </p>
                }
              >
                <CareerOppurtunity content={e.content} position={e.name} />
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex justify-between">
            <p>
              Showing {page == 1 ? page : (page - 1) * limit}-
              {data.data.data.length} of {data.data.totalItems} Open Positions
            </p>

            <div className="flex gap-4 items-center">
              <div className="flex gap-4 items-center">
                Display
                <div className="max-w-20">
                  <BaseInput
                    variant="bordered"
                    name="limit"
                    className="w-full"
                    type="number"
                    min={1}
                    max={MAX_LIMIT}
                    control={control}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <BaseButton
                  isDisabled={page == 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="bg-gray-200 text-base-blue"
                >
                  <GrFormPrevious />
                </BaseButton>
                {Array.from(new Array(data.data.totalPages))
                  .map((e, index) => index + 1)
                  .filter((e: number) => {
                    const isLessThan = e >= page - 5 && e <= page;
                    const isGreaterThan = e == page || e <= page + 5;

                    return isLessThan || isGreaterThan;
                  })
                  .map((e: any) => (
                    <BaseButton
                      onClick={() => setPage(e)}
                      className={`${e == page && "!bg-base-blue !text-white"
                        } bg-transparent`}
                      key={e}
                    >
                      {e}
                    </BaseButton>
                  ))}
                <BaseButton
                  isDisabled={page >= data.data.totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="bg-gray-200 text-base-blue"
                >
                  <GrFormNext />
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

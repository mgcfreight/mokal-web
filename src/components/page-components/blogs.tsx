"use client";
import LinearGradientText from "@/components/common/linear-gradient-text";
import Image from "next/image";
import BaseBreadCrumb from "@/components/common/base-breadcrumb";
import BaseInput from "@/components/common/forms/base-input";
import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Blogs, IndvidualBlog } from "@/utils/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";

export default function BlogsClient({ data }: { data: Blogs }) {
  const { control, watch } = useForm();
  const router = useRouter();
  const search = watch("search");
  const blogQuery = useQuery({
    queryKey: ["blogs", search],
    queryFn: ({ queryKey }) =>
      axios.get(`/api/blog?searchQuery=${queryKey[1]}`),
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-8 min-h-64">
          <div
            className={`flex flex-col items-center m-auto sm:px-8 px-4 py-4 sm:w-1/2  text-center gap-4`}
          >
            <div className="flex flex-col ">
              <h1 className="sm:text-[3rem] text-[1.8rem] font-bold">
                <LinearGradientText text="Blogs" />{" "}
              </h1>
            </div>
            <BaseBreadCrumb items={["Resources", "Blogs"]} />
          </div>
        </div>

        <div className="bg-white w-full">
          <div
            className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-8`}
          >
            <BaseInput
              extraClass="w-full"
              name="search"
              control={control}
              placeholder="Search Blogs"
              endContent={
                search && blogQuery.isLoading ? (
                  <ImSpinner9 className="animate-spin" size={20} />
                ) : (
                  <BiSearch size={20} />
                )
              }
            />
            <div className={`flex flex-wrap  text-center gap-4`}>
              {(search ? blogQuery.data?.data : data)?.map(
                (e: IndvidualBlog) => (
                  <div
                    key={e.id}
                    onClick={() => router.push(`/blogs/${e.id}`)}
                    className="p-4 cursor-pointer text-base-blue items-start text-start shadow-xl bg-white rounded-xl flex flex-col gap-2 sm:flex-[1_0_25%] flex-[1_0_100%] sm:max-w-[32%]"
                  >
                    <Image
                      className="flex-1 w-full"
                      src={e.imageUrl}
                      alt="blog"
                      height={70}
                      width={70}
                    />
                    <p className="font-semibold text-xl">{e.title}</p>
                    <p className="text-xs text-text-gray">
                      Posted on {new Date(e.publishedAt).toDateString()}
                    </p>
                    <div className="flex gap-2 w-full items-center">
                      <Image
                        src={e.authorImg}
                        alt="person"
                        height={30}
                        width={30}
                      />
                      <p className="text-sm text-black">{e.authorName}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

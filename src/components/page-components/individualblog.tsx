'use client'

import Image from "next/image"
import BaseInput from "../common/forms/base-input"
import BaseBreadCrumb from "../common/base-breadcrumb"
import LinearGradientText from "../common/linear-gradient-text"
import { BiSearch } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { IndvidualBlog } from "@/utils/types"

export default function IndividualBlog({ data, locale }: { data: IndvidualBlog, locale: 'en' | 'fr' }) {
    const { control } = useForm()
    //  console.log(data)
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-8 min-h-64">
                    <div className={`flex flex-col items-center m-auto sm:px-8 px-4 py-4 sm:w-1/2  text-center gap-4`}>
                        <div className="flex flex-col ">
                            <div className="sm:text-[3rem] text-[1.8rem] font-bold"><LinearGradientText text={{ en: "Blogs", fr: "Blogues" }} /> </div>
                        </div>
                        <BaseBreadCrumb items={['Resources', 'Blogs']} />
                    </div>
                </div>

                <div className="bg-white w-full">
                    <div className={`grid sm:grid-cols-[1fr_0.4fr] grid-cols-1 m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-8`}>

                        <div className={`flex flex-col sm:order-1 order-2 flex-wrap items-start text-start gap-4`}>
                            <Image className="flex-1 w-full max-h-52 rounded-xl object-cover" src={data.imageUrl} alt="blog" height={70} width={70} />
                            <div className="text-text-blue text-2xl font-semibold">{data.title[locale]}</div>
                            <p className="text-text-gray font-semibold">Posted on {new Date(data.publishedAt).toDateString()}</p>

                            {data.content.map((e) => <p key={e[0].text} className="text-text-darkGray">{e[0].text}</p>)}

                        </div>
                        <div className="p-4 py-8 h-max sm:order-2 order-1 flex flex-col gap-4 shadow-xl rounded-xl">
                            <BaseInput name="search" classNames={{ inputWrapper: "p-6" }} extraClass="w-full" control={control} placeholder="Search Blogs" endContent={<BiSearch size={20} />} />
                            <div className=" flex flex-col gap-4 items-start text-start">
                                <p className="text-text-blue text-2xl font-semibold">Table of Content</p>
                                <p className="text-text-blue">Utilizing MGC Freight to Manage Your End of the Supply Chain</p>
                                <p className="text-text-blue">Building Strong Relationships with Suppliers and Partners</p>
                                <p className="text-text-blue">Optimizing Shipping Practices for Resilience</p>
                                <p className="text-text-blue">Strategic Stock Management: Balancing Inventory and Demand</p>
                                <p className="text-text-blue">Understanding the Root Causes of Supply Chain Disruptions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
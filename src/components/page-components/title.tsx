'use client';

import { BsBoxSeam } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";
import BaseBreadCrumb from "../common/base-breadcrumb";
import { useTranslate } from "@/providers/locale-provider";

interface TitleProps {
    title?: { en: string, fr: string }
    header: [{ Value: { en: string, fr: string }, Highlight: boolean }]
    buttons?: [{ withBackground: boolean, url: { current: string }, text: { en: string, fr: string } }]
    imageUrl?: string
    description?: { en: string, fr: string }
    identifier?: string
    breadCrumb?: string[]
}

export default function Title({ title, header, buttons, imageUrl, description, identifier, breadCrumb }: TitleProps) {
    const t = useTranslate();

    return (
        <div className="flex flex-col gap-8">
            <div className={`flex flex-col items-center m-auto sm:px-8 px-4 py-4 sm:w-1/2  text-center gap-4`}>
                {title && !identifier && <div className="px-16 py-2 border-2 rounded-lg flex gap-2 items-center w-max bg-white text-text-gray  ">
                    <p className="font-bold ">{t(title)}</p>
                    <BsBoxSeam className="text-base-purple" />
                </div>}


                <div className={`flex flex-col items-center m-auto    text-center gap-4`}>
                    {title && identifier && <p className="text-base-purple text-xl font-semibold">{t(title)}</p>}
                    <h1 className="sm:text-[3rem] text-[1.8rem] font-bold">
                        {
                            header.map((e) => {
                                const val = t(e.Value);
                                if (e.Highlight) {
                                    return <LinearGradientText extraClass="mr-2" key={val + " highlight"} text={e.Value} />
                                }
                                return <span className="mr-2" key={val + " not highlight"}>{val}</span>
                            })
                        }
                    </h1>
                    {identifier && <BaseBreadCrumb items={breadCrumb!} />}
                </div>
                {/* <h1 className="sm:text-[3rem] text-[1.8rem] font-bold">The Modern Freight <LinearGradientText text="Solution" /> for Your Business in One Place</h1> */}
                {description && <p className="text-gray-600 sm:text-lg text-md">{t(description)}</p>}
                {buttons && buttons?.length > 0 && <div className="flex gap-2">{buttons?.map((e) => {
                    const btnText = t(e.text);
                    if (e.withBackground) {
                        return <Link key={e.url.current + btnText} href={e.url.current} className="bg-base-purple min-w-[12rem] flex justify-between items-center rounded-xl px-3 text-white border-2 py-3 ">{btnText}<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                    }
                    return <Link key={e.url.current + btnText} href={e.url.current} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2">{btnText}<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                })}</div>}
                {/* <div className="flex gap-2">
                    <BaseButton>Get Started Today<MdKeyboardDoubleArrowRight className="text-lg" /></BaseButton>
                    <Link href={'/get-a-quote'} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple">Get A Quote<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                </div> */}
            </div>
            {imageUrl && <div className={`sm:px-8 px-4 py-4 flex justify-center  `}>
                <Image fetchPriority="high" src={imageUrl} alt="dashboard" width={1000} height={1000} className="" />
            </div>}

        </div>
    )
}
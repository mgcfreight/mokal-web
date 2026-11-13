import { BsBoxSeam } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import LinearGradientText from "./linear-gradient-text";
import { useTranslate } from "@/providers/locale-provider";

interface TitleProps {
    title?: string,
    header: [{ Value: { en: string, fr: string }, Highlight: boolean }]
    buttons?: [{ withBackground: boolean, url: { current: string }, text: string }]
    imageUrl?: string
    description?: { en: string, fr: string }
}

export default function Title({ title, header, buttons, imageUrl, description }: TitleProps) {
    const t = useTranslate();
    return (
        <div className="flex flex-col gap-8">
            <div className={`flex flex-col items-center m-auto sm:px-8 px-4 py-4   text-center gap-4`}>
                {title && <div className="px-16 py-2 border-2 rounded-lg flex gap-2 items-center w-max bg-white text-text-gray  ">
                    <p className="font-bold ">{title}</p>
                    <BsBoxSeam className="text-base-purple" />
                </div>}


                <div className="sm:text-[3rem]  text-[1.8rem] font-bold">
                    {
                        header.map((e) => {
                            if (e.Highlight) {
                                return <LinearGradientText extraClass="mr-2" key={t(e.Value)} text={e.Value} />
                            }
                            return <span className="mr-2" key={t(e.Value)}>{t(e.Value)}</span>
                        })
                    }
                </div>
                {/* <h1 className="sm:text-[3rem] text-[1.8rem] font-bold">The Modern Freight <LinearGradientText text="Solution" /> for Your Business in One Place</h1> */}
                {description && <p className="text-gray-600 sm:text-lg text-md">{t(description)}</p>}
                {buttons && buttons?.length > 0 && <div className="flex gap-2">{buttons?.map((e) => {
                    if (e.withBackground) {
                        return <Link key={e.url.current + e.text} href={e.url.current} className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2 py-2 ">{e.text}<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                    }
                    return <Link key={e.url.current + e.text} href={e.url.current} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2">{e.text}<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                })}</div>}
                {/* <div className="flex gap-2">
                    <BaseButton>Get Started Today<MdKeyboardDoubleArrowRight className="text-lg" /></BaseButton>
                    <Link href={'/get-a-quote'} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple">Get A Quote<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                </div> */}
            </div>
            {imageUrl && <div className={`sm:px-8 px-4 py-4 flex justify-center  `}>
                <Image src={imageUrl} alt="dashboard" width={1000} height={1000} className="" />
            </div>}

        </div>
    )
}
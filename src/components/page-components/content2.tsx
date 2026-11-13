'use client'
import Image from "next/image";
import BaseSlider from "../common/base-slider";
import LinearGradientText from "../common/linear-gradient-text";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BaseVideo from "../common/base-video";
import { useTranslate } from "@/providers/locale-provider";

interface Content2Props {
    video?: string
    header: [{ Value: { en: string, fr: string }, Highlight: boolean }]
    description?: { en: string, fr: string }
    images: [{ imageUrl: string, description?: { en: string, fr: string } }]
    buttons?: [{ withBackground: boolean, url: { current: string }, text: { en: string, fr: string } }]
}


const responsiveCouriers = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
        partialVisibilityGutter: 2000
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 2000
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 2000
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
        partialVisibilityGutter: 2000
    }
};

export default function Content2({ header, video, description, images, buttons }: Content2Props) {
    const t = useTranslate();
    return (
        <div className=" w-full">
            <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
                <div className="font-bold sm:text-[2.3rem] text-[1.5rem]">
                    {header.map((e) => {
                        if (e.Highlight) {
                            return <LinearGradientText extraClass="mr-2" key={t(e.Value)} text={t(e.Value)} />
                        }
                        return <span className="mr-2" key={t(e.Value)}>{t(e.Value)}</span>
                    })}
                </div>
                {description && <p className="text-text-gray">{t(description)}</p>}
                {video && <BaseVideo src={video} />}
                {images && images.length > 0 && !images[0].description && <>
                    <div className="w-full sm:flex hidden gap-2 flex-wrap justify-center">
                        {images.map((e) => <Image key={e.imageUrl} src={e.imageUrl} alt="dhl" width={150} height={150} />)}
                    </div>
                    <BaseSlider extraClass="sm:hidden" extraResponsive={responsiveCouriers}>
                        {images.map((e) => <Image key={e.imageUrl} src={e.imageUrl} alt="dhl" width={100} height={100} />)}
                    </BaseSlider>
                </>}
                {images && images.length > 0 && images[0].description && <div className={`grid sm:grid-cols-3 grid-cols-1 text-center gap-12`}>
                    {images.map((e) => <div key={e.imageUrl} className='flex flex-col sm:flex-[1_0_17%] flex-[1_0_100%]  sm:max-w-[17%] min-w-[20rem] gap-4 p-8 shadow-lg h-auto rounded-2xl text-center items-center'>
                        <Image src={e.imageUrl} alt='artboard' width={200} height={200} />
                        <p>{t(e.description)}</p>
                    </div>)}
                </div>}

                <div className="flex gap-4 justify-center w-full flex-wrap">
                    {buttons && buttons?.length > 0 && <>
                        {buttons?.map((e) => {
                            if (e.withBackground) {
                                return <Link key={e.url.current + e.text} href={e.url.current} className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 ">{t(e.text)}<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                            }
                            return <Link key={e.url.current + e.text} href={e.url.current} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2">{t(e.text)}<MdKeyboardDoubleArrowRight className="text-lg" /></Link>
                        })}
                    </>}
                    {/* <BaseButton extraClass="flex sm:w-max w-full !min-w-52 justify-between">Get Started Today<MdKeyboardDoubleArrowRight /></BaseButton>
                        <Link href={'/book-a-demo'} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple">Book a Demo<MdKeyboardDoubleArrowRight className="text-lg" /></Link> */}

                    {/* <BaseButton extraClass="flex sm:w-max w-full !min-w-36 justify-between border-2 text-base-purple border-base-purple bg-transparent">Book a Demo <MdKeyboardDoubleArrowRight /></BaseButton> */}
                </div>

            </div>
        </div>
    )
}
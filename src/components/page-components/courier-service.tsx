import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";
import BaseButton from "../common/base-button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CourierServiceProps, HeaderAndCards } from "@/utils/types";
import Link from "next/link";
import { client } from "@/utils/constants";
import { getLocale } from "@/utils/locale-server";

export default async function CourierService({ bgColor = 'bg-base-shadeBlue' }: CourierServiceProps) {
    const locale = await getLocale();
    const courierService: HeaderAndCards = await client.fetch({
        query: `*[_type=='cards' && name=='Courier Service'][0]{
  ...,
  "header":[...header[]{
    Highlight,
      Value
  }],
  "cards":[...cards[]{
    "imageUrl":icon.asset->url,
    heading,
    description
  }]
            }`,
        config: {
            cache: 'no-store',
        }
    });

    return (
        <div className={`${bgColor}  p-8 flex flex-col gap-16 items-center `}>
            <div className="sm:text-[2.3rem] text-[1.5rem] flex flex-wrap gap-2 font-bold">
                {
                    courierService.header.map((e) => {
                        if (e.Highlight) {
                            return <LinearGradientText key={e.Value[locale]} text={e.Value} />
                        }
                        return <span key={e.Value[locale]}>{e.Value[locale]}</span>
                    })
                }
            </div>
            <div className="flex flex-col gap-8 sm:w-[80%] flex-wrap">
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 ">

                    {courierService.cards.map((e) =>
                        <div key={e.imageUrl} className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <Image src={e.imageUrl} alt="flexible" width={40} height={40} />
                                <p className="text-base-blue text-xl font-semibold">{e.heading[locale]}</p>
                            </div>
                            <p className="text-text-gray">{e.description[locale]}</p>
                        </div>
                    )}


                </div>
                <div className="flex gap-4 justify-center w-full flex-wrap">
                    <BaseButton extraClass="flex sm:w-max w-full !min-w-52 justify-between">Get Started Today<MdKeyboardDoubleArrowRight /></BaseButton>
                    <Link href={'/book-a-demo'} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple">Book a Demo<MdKeyboardDoubleArrowRight className="text-lg" /></Link>

                    {/* <BaseButton extraClass="flex sm:w-max w-full !min-w-36 justify-between border-2 text-base-purple border-base-purple bg-transparent">Book a Demo <MdKeyboardDoubleArrowRight /></BaseButton> */}
                </div>
            </div>

        </div>
    )
}
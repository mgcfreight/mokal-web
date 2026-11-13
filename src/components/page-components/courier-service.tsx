import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";
import BaseButton from "../common/base-button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { CourierServiceProps, HeaderAndCards } from "@/utils/types";
import Link from "next/link";
import { fetchLocalized } from "@/utils/constants";

export default async function CourierService({ bgColor = 'bg-base-shadeBlue' }: CourierServiceProps) {

    const courierService: HeaderAndCards = await fetchLocalized({
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


    // console.log('service',courierService)

    


    return (
        <div className={`${bgColor}  p-8 flex flex-col gap-16 items-center `}>
            <h1 className="sm:text-[2.3rem] text-[1.5rem] flex flex-wrap gap-2 font-bold">
                {
                    courierService.header.map((e) => {
                        if (e.Highlight) {
                            return <LinearGradientText key={e.Value} text={e.Value} />
                        }
                        return <span key={e.Value}>{e.Value}</span>
                    })
                }
            </h1>
            <div className="flex flex-col gap-8 sm:w-[80%] flex-wrap">
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 ">

                    {courierService.cards.map((e) =>
                        <div key={e.imageUrl} className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <Image src={e.imageUrl} alt="flexible" width={40} height={40} />
                                <p className="text-base-blue text-xl font-semibold">{e.heading}</p>
                            </div>
                            <p className="text-text-gray">{e.description}</p>
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
import Image from "next/image";
import BaseSlider from "../common/base-slider";
import LinearGradientText from "../common/linear-gradient-text";
import BlogPost from "../common/blog-post";
import { HearFromUsAndBlogsProps } from "@/utils/types";
import { client } from "@/utils/constants";
import { getLocale } from "@/utils/locale-server";

export const responsiveWhoWeAre = {
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
        items: 1,
        partialVisibilityGutter: 2000
    }
};



export default async function HearFromUsAndBlogs({ hideBlogs, hideHearFromUs, bgHearFromUs = "bg-white", bgBlogs = "bg-white" }: HearFromUsAndBlogsProps) {
    const locale = await getLocale();
    const fetchData: any = await client.fetch({
        query: `*[_type=='blogComponent'][0]{
      ...  ,
      "blogs":[...blogs[]->{
      ...,
      "imageUrl":image.asset->url
      }]
    }
                `
    })

    const fetchData2: any = await client.fetch({
        query: `*[_type=='testimonialComponent'][0]{
      ...,
      "testimonials":[...testimonials[]->{
      ...,
      "imageUrl":image.asset->url
      }]  
    }
                `
    })
    const header: [{ Value: { en: string, fr: string }, Highlight: boolean }] = fetchData.header
    const blogs: [{ _id: string, title: { en: string, fr: string }, _createdAt: string, imageUrl: string }] = fetchData.blogs
    const description: { en: string, fr: string } = fetchData2.description
    const testimonials: [{ _id: string, name: { en: string, fr: string }, _createdAt: string, imageUrl: string, description: { en: string, fr: string }, rating: number }] = fetchData2.testimonials
    const header2: [{ Value: { en: string, fr: string }, Highlight: boolean }] = fetchData2.header
    return (
        <div>
            {!hideHearFromUs && <div className={`${bgHearFromUs} w-full`}>
                <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
                    <div className="font-bold sm:text-[2.3rem] text-[1.5rem]">
                        {header2.map((e) => {
                            if (e.Highlight) {
                                return <LinearGradientText extraClass="mr-2" key={e.Value[locale]} text={e.Value} />
                            }
                            return <span className="mr-2" key={e.Value[locale]}>{e.Value[locale]}</span>
                        })}
                    </div>
                    <p className="text-text-gray">{description[locale]}</p>
                    <div className="w-full">
                        <BaseSlider extraSliderClass="min-h-[20rem]" renderDotsOutside={false} showDots renderArrowsWhenDisabled={false} renderButtonGroupOutside={false} extraResponsive={responsiveWhoWeAre}>
                            {testimonials!.map((el, index) => <BlogPost rating={el.rating} description={el.description[locale]} name={el.name[locale]} imageUrl={el.imageUrl} createdAt={el._createdAt} key={index + Math.random()} index={index} />)}
                        </BaseSlider>
                    </div>
                </div>
            </div>}


            {!hideBlogs && <div className={`${bgBlogs} w-full`}>
                <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
                    <div className="font-bold sm:text-[2.3rem] text-[1.5rem]">
                        {
                            header.map((e) => {
                                if (e.Highlight) {
                                    return <LinearGradientText extraClass="mr-2" key={e.Value[locale]} text={e.Value} />
                                }
                                return <span className="mr-2" key={e.Value[locale]}>{e.Value[locale]}</span>
                            })
                        }
                    </div>
                    {/* <p className="text-text-gray">Discover how MGC Freight has transformed the logistics and shipping experience for businesses of all sizes. Real stories from our satisfied clients highlight the value of our efficient solutions and commitment to excellence.</p> */}
                    <div className="w-full">
                        <BaseSlider extraResponsive={responsiveWhoWeAre}>
                            {blogs?.map((e) => <div key={e.imageUrl} className="px-8">
                                <div className="p-4 text-base-blue items-start text-start shadow-xl bg-white rounded-xl flex flex-col gap-2">
                                    <Image className="flex-1 w-full" src={e.imageUrl} alt="blog" height={70} width={70} />
                                    <p className="font-semibold text-xl">{e.title[locale]}</p>
                                    <p className="text-xs text-text-gray">{new Date(e._createdAt).toDateString()}</p>
                                    {/* <div className="flex gap-2 w-full items-center">
                                               <Image src={'/people/person.svg'} alt="person" height={30} width={30} />
                                               <p className="text-sm text-black">Patrick</p>
                                           </div> */}
                                </div>
                            </div>)}

                        </BaseSlider>
                    </div>
                </div>
            </div>}

        </div>
    )
}
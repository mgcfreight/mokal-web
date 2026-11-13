import LinearGradientText from "../common/linear-gradient-text";
import { FAQS } from "@/utils/types";
import AccordionFaqs from "./accordion.faq";

export default async function FAQSs({header,description,questions}:FAQS) {
    return (

            <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
                <h1 className="font-bold sm:text-[2.3rem] justify-center flex gap-2 text-[1.5rem]">
                    {
                        header.map((e) => {
                            if (e.Highlight) {
                                return <LinearGradientText key={e.Value} text={e.Value} />
                            }
                            return <span key={e.Value}>{e.Value}</span>
                        })
                    }
                </h1>
                <p className="text-text-gray">{description}</p>
              <AccordionFaqs questions={questions}/>
            </div>

    )
}
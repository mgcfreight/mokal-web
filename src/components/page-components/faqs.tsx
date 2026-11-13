import LinearGradientText from "../common/linear-gradient-text";
import { FAQS } from "@/utils/types";
import AccordionFaqs from "./accordion.faq";
import { getLocale } from "@/utils/locale-server";
import { translate } from "@/utils/locale";

export default async function FAQSs({ header, description, questions }: FAQS) {
    const lang = await getLocale();

    const translatedQuestions = questions.map((q) => ({
        question: translate(q.question, lang),
        answer: translate(q.answer, lang),
    }));

    return (
        <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
            <h2 className="font-bold sm:text-[2.3rem] justify-center flex gap-2 text-[1.5rem]">
                {
                    header.map((e) => {
                        const val = translate(e.Value, lang);
                        if (e.Highlight) {
                            return <LinearGradientText key={val} text={e.Value} />
                        }
                        return <span key={val}>{val}</span>
                    })
                }
            </h2>
            <p className="text-text-gray">{translate(description, lang)}</p>
            <AccordionFaqs questions={translatedQuestions} />
        </div>
    )
}
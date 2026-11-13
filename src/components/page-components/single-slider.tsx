'use client'

import LinearGradientText from "../common/linear-gradient-text"
import TabWithSlider from "../common/tabs/tab-with-slider"
import { useTranslate } from "@/providers/locale-provider";

export default function SingleSlider({ header, buttons, description, cards }: {
    header?: [{ Value: { en: string, fr: string }, Highlight: boolean }],
    imageUrl?: string,
    buttons?: [{ withBackground: boolean, url: { current: string }, text: { en: string, fr: string } }],
    description?: { en: string, fr: string },
    cards: [{ imageUrl: string, description: { en: string, fr: string } }]
}) {
    const t = useTranslate();
    return (
        <>
            <div className="sm:w-[80%] m-auto">
                <TabWithSlider
                    buttons={buttons}
                    title={<div className="sm:!text-3xl text-xl font-bold" >
                        {
                            header!.map((e) => {
                                if (e.Highlight) {
                                    return <LinearGradientText extraClass="mr-2" key={t(e.Value)} text={t(e.Value)} />
                                }
                                return <span className="mr-2" key={t(e.Value)}>{t(e.Value)}</span>
                            })
                        }
                    </div>}
                    description={[description!]}
                    carousel={cards.map((e) => ({ imageSrc: e.imageUrl, description: e.description }))} />

            </div >
        </>
    )
}
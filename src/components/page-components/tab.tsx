import BaseTabs from "../common/base-tabs";
import LinearGradientText from "../common/linear-gradient-text";
import { getLocale } from "@/utils/locale-server";
import { TabItemProp } from "@/utils/types";

interface TabProps {
    // title?: string,
    header: [{ Value: { en: string, fr: string }, Highlight: boolean }]
    slider: TabItemProp,
    variation: number
}


export default async function TabPageComponent({ header, slider, variation }: TabProps) {
    const locale = await getLocale();
    // if (slider?.[1]?.name === "Courier") console.log(slider[1].slider[0])
    // if (slider?.[1]?.name === "Courier") console.log(variation)
    return (
        <div className={`flex flex-col items-center m-auto sm:px-8 px-4 sm:py-20 py-16  text-center gap-4`}>
            <h2 className="sm:text-[2.3rem] text-[1.5rem] font-bold">
                {
                    header?.map((e) => {
                        if (e.Highlight) {
                            return <LinearGradientText extraClass="mr-2" key={e.Value[locale as keyof typeof e.Value]} text={e.Value} />
                        }
                        return <span className="mr-2" key={e.Value[locale as keyof typeof e.Value]}>{e.Value[locale as keyof typeof e.Value]}</span>
                    })
                }
            </h2>
            <div className="flex flex-col sm:w-[80%] w-full gap-4">
                <BaseTabs variation={variation} keys={slider} />
            </div>
        </div>
    )
}
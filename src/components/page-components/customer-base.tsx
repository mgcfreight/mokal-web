import LinearGradientText from "../common/linear-gradient-text";
import Map from "./map/map";
import { getLocale } from "@/utils/locale-server";

interface CustomerProps {
    header: { Highlight: boolean, Value: { en: string, fr: string } }[]
}

export default async function CustomerBase({ header }: CustomerProps) {
    const lang = await getLocale();
    return (
        <>
            <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
                <h2 className="sm:text-[2.3rem] text-[1.5rem] font-bold">
                    {header.map((e) => {
                        if (e.Highlight) {
                            return <LinearGradientText extraClass="mr-2" key={e.Value[lang as keyof typeof e.Value]} text={e.Value} />
                        }
                        return <span className="mr-2" key={e.Value[lang as keyof typeof e.Value]}>{e.Value[lang as keyof typeof e.Value]}</span>
                    })}
                </h2>
            </div>
            <Map />
        </>
    )
}
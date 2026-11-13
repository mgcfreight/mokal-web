import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { getLocale } from "@/utils/locale-server";
import { translate } from "@/utils/locale";

interface ContentProps {
  content: [
    {
      imageUrl?: string;
      description?: [
        {
          imageUrl: string;
          description: { en: string; fr: string };
          name?: { en: string; fr: string };
          list?: { en: string; fr: string }[];
        }
      ];
      header?: [{ Value: { en: string; fr: string }; Highlight: boolean }];
      arrayContent?: [{ imageUrl: string; name: { en: string; fr: string }; description: { en: string; fr: string } }];
      buttons?: [
        { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
      ];
    }
  ];
  customerSpotlight?: boolean;
}

export default async function Content({ content }: ContentProps) {
  const lang = await getLocale();
  return (
    <>
      {
        <div
          className={`flex sm:flex-row flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-16`}
        >
          {content.map((e) => {
            if (e.imageUrl)
              return (
                <div key={e.imageUrl} >
                  <Image
                    key={e.imageUrl}
                    className={`flex-1 ${content.find((item) => item.header)?.header?.[0].Value &&
                      translate(content.find((item) => item.header)?.header?.[0].Value, lang) ==
                      "Track Your Shipments" && "sm:order-2 order-1"
                      } `}
                    src={e.imageUrl}
                    alt="metrics"
                    width={400}
                    height={400}
                  />
                </div>
              );

            const firstHeaderVal = e.header?.[0] ? translate(e.header[0].Value, lang) : '';
            return (
              <div
                key={firstHeaderVal}
                className={` ${firstHeaderVal == "Track Your Shipments" &&
                  "sm:order-1 order-2"
                  } flex flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4`}
              >
                <h2 className="sm:text-[3rem] text-[1.5rem] font-bold">
                  {e.header!.map((h) => {
                    const val = translate(h.Value, lang);
                    if (h.Highlight) {
                      return (
                        <LinearGradientText
                          extraClass="mr-2"
                          key={val}
                          text={h.Value}
                        />
                      );
                    }
                    return (
                      <span className="mr-2" key={val}>
                        {val}
                      </span>
                    );
                  })}
                </h2>

                {e.description?.map((d) => {
                  {
                    const descVal = translate(d.description, lang);
                    const nameVal = translate(d.name, lang);
                    if (d.imageUrl) {
                      return (
                        <div
                          key={descVal}
                          className="p-4 shadow-lg rounded-lg flex gap-4"
                        >
                          <Image
                            src={d.imageUrl}
                            alt="worldwide"
                            width={50}
                            height={50}
                          />
                          <div className="flex flex-col gap-4 text-start">
                            <p className="text-base-blue font-semibold">
                              {nameVal}
                            </p>
                            <p>{descVal}</p>
                          </div>
                        </div>
                      );
                    }
                    if (d.list)
                      return (
                        <div key={descVal + "list"} className="grid grid-cols-2 gap-4 w-full">
                          {d.list.map((item) => {
                            const itemVal = translate(item, lang);
                            return (
                              <div key={itemVal} className="flex gap-4 items-center">
                                <div className="p-[0.3rem] border-2 border-base-lightBlue  bg-base-blue rounded-full"></div>
                                <p>{itemVal}</p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    return (
                      <p key={descVal} className="text-text-gray text-md">
                        {descVal}
                      </p>
                    );
                  }
                })}
                <div className="flex ">
                  {e.arrayContent?.map((j) => {
                    const nameVal = translate(j.name, lang);
                    const descVal = translate(j.description, lang);
                    return (
                      <div
                        key={nameVal}
                        className="flex flex-col h-full flex-1 sm:items-start items-center sm:text-start text-center gap-2"
                      >
                        {j.imageUrl && (
                          <Image
                            src={j.imageUrl}
                            alt="hand"
                            width={40}
                            height={40}
                          />
                        )}

                        <h2
                          className={`font-bold text-xl ${firstHeaderVal == "Track Your Shipments" &&
                            "!text-3xl font-black"
                            }`}
                        >
                          {nameVal}
                        </h2>
                        <p className="text-text-gray">{descVal}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 flex-wrap">
                  {e.buttons?.map((b) => {
                    const btnText = translate(b.text, lang);
                    if (b.withBackground) {
                      return (
                        <Link
                          key={b.url.current + btnText}
                          href={b.url.current}
                          className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2 py-2 "
                        >
                          {btnText}
                          <MdKeyboardDoubleArrowRight className="text-lg" />
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={b.url.current + btnText}
                        href={b.url.current}
                        className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2"
                      >
                        {btnText}
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      }
    </>
  );
}

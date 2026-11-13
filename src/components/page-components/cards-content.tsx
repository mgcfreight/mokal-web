import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";
import BaseSlider from "../common/base-slider";
import LinearGradientCircle from "../common/linear-gradient-circle";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { getLocale } from "@/utils/locale-server";
import { translate } from "@/utils/locale";

interface CardsProps {
  variation: number;
  header: { Highlight: boolean; Value: { en: string; fr: string } }[];
  cards: [
    {
      imageUrl: string;
      description: { en: string; fr: string };
      heading: { en: string; fr: string };
      buttons?: [
        { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
      ];
    }
  ];
  description: { en: string; fr: string };
  buttons?: [
    { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
  ];
}

export default async function CardsContent({
  header,
  cards,
  variation,
  description,
  buttons,
}: CardsProps) {
  const lang = await getLocale();

  return (
    <>
      {variation == 1 && (
        <div className="  p-8 flex flex-col gap-4 items-center ">
          {header && (
            <h2 className="sm:text-[2.3rem] flex flex-wrap gap-2 text-[1.5rem] font-bold">
              {header.map((e) => {
                const val = translate(e.Value, lang);
                if (e.Highlight) {
                  return <LinearGradientText key={val} text={e.Value} />;
                }
                return <span key={val}>{val}</span>;
              })}
            </h2>
          )}

          <div className="sm:flex hidden gap-4 w-[80%] flex-wrap">
            {cards.map((e) => {
              const head = translate(e.heading, lang);
              return (
                <div
                  key={head}
                  className="flex flex-col gap-2 bg-white shadow-lg flex-[1_1_23rem] rounded-xl p-4"
                >
                  <Image
                    src={e.imageUrl}
                    alt={e.imageUrl}
                    width={50}
                    height={50}
                  />
                  <h3>
                    <LinearGradientText
                      extraClass="font-bold text-2xl"
                      text={e.heading}
                    />
                  </h3>

                  <p className="text-text-gray">{translate(e.description, lang)}</p>
                </div>
              );
            })}
          </div>
          <BaseSlider extraClass="sm:hidden block">
            {cards.map((e) => {
              const head = translate(e.heading, lang);
              return (
                <div key={head} className="h-full flex px-4">
                  <div
                    className="flex flex-col gap-2 bg-white shadow-lg flex-[1_1_23rem] rounded-xl p-4"
                  >
                    <Image
                      src={e.imageUrl}
                      alt={e.imageUrl}
                      width={50}
                      height={50}
                    />
                    <LinearGradientText
                      extraClass="font-bold text-2xl"
                      text={e.heading}
                    />
                    <p className="text-text-gray">{translate(e.description, lang)}</p>
                  </div>
                </div>
              );
            })}
          </BaseSlider>

          <div className="flex gap-4 justify-center w-full flex-wrap">
            {buttons && buttons?.length > 0 && (
              <>
                {buttons?.map((e) => {
                  const btnText = translate(e.text, lang);
                  if (e.withBackground) {
                    return (
                      <Link
                        key={e.url.current + btnText}
                        href={e.url.current}
                        className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
                      >
                        {btnText}
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={e.url.current + btnText}
                      href={e.url.current}
                      className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2"
                    >
                      {btnText}
                      <MdKeyboardDoubleArrowRight className="text-lg" />
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}

      {variation == 2 && (
        <div className=" p-8  w-full">
          <div className="sm:w-[80%] m-auto flex flex-col  gap-4 items-center">
            {header && (
              <div className="sm:text-[2.3rem] flex flex-wrap gap-2 text-[1.5rem] font-bold">
                {header.map((e) => {
                  const val = translate(e.Value, lang);
                  if (e.Highlight) {
                    return <LinearGradientText key={val} text={e.Value} />;
                  }
                  return <span key={val}>{val}</span>;
                })}
              </div>
            )}

            <p className="text-text-gray text-center">{translate(description, lang)}</p>
            <div className="flex gap-4 flex-wrap w-full">
              {cards.map((e, index) => {
                const head = translate(e.heading, lang);
                const desc = translate(e.description, lang);
                if (index == 0) {
                  return (
                    <div
                      key={head}
                      className={` bg-base-lightBlue  relative p-8 overflow-hidden  rounded-xl flex-[1_1_15rem]`}
                    >
                      <div className="flex flex-col gap-2 relative z-30">
                        <h3 className="font-bold text-base-blue sm:text-2xl text-lg">
                          {head}
                        </h3>
                        <p className="text-text-lighterDarkBlue">
                          {desc}
                        </p>
                        <Image
                          src={e.imageUrl}
                          alt="shipment"
                          width={500}
                          className="w-full sm:h-[15rem]"
                          height={500}
                        />
                      </div>
                      <LinearGradientCircle />
                    </div>
                  );
                }
                if (index == 1) {
                  return (
                    <div
                      key={head}
                      className=" bg-linearPurple  relative p-8 overflow-hidden  rounded-xl flex-[1_1_15rem]"
                    >
                      <div className="flex flex-col gap-2 relative z-30">
                        <h3 className="font-bold text-base-purple sm:text-2xl text-lg ">
                          {head}
                        </h3>
                        <p className="text-base-purple">{desc}</p>
                        <Image
                          src={e.imageUrl}
                          alt="shipment"
                          width={500}
                          className="w-full sm:h-[15rem]"
                          height={500}
                        />
                      </div>

                      <LinearGradientCircle />
                    </div>
                  );
                }

                if (index == 2) {
                  return (
                    <div
                      key={head}
                      className=" bg-linearBlue p-8 flex sm:flex-row flex-col sm:gap-8 gap-4 items-center rounded-xl w-full"
                    >
                      <div className="flex flex-1 text-white flex-col sm:gap-8 gap-4 relative z-30">
                        <h3 className="sm:text-2xl text-lg">
                          {head}
                        </h3>
                        <p className="">{desc}</p>
                        <div className="sm:flex hidden gap-8">
                          {e.buttons && e.buttons?.length > 0 && (
                            <>
                              {e.buttons?.map((b) => {
                                const btnText = translate(b.text, lang);
                                if (b.withBackground) {
                                  return (
                                    <Link
                                      key={b.url.current + btnText}
                                      href={b.url.current}
                                      className="bg-base-purple sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2 border-base-purple py-2 "
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
                                    className="bg-transparent sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2  border-white py-2"
                                  >
                                    {btnText}
                                    <MdKeyboardDoubleArrowRight className="text-lg" />
                                  </Link>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                      <div className=" flex-1 flex flex-col gap-2">
                        <Image
                          src={e.imageUrl}
                          alt="shipment"
                          width={100}
                          className="w-full h-full"
                          height={100}
                        />
                        <div className="flex sm:hidden gap-2 ">
                          {e.buttons && e.buttons?.length > 0 && (
                            <>
                              {e.buttons?.map((b) => {
                                const btnText = translate(b.text, lang);
                                if (b.withBackground) {
                                  return (
                                    <Link
                                      key={b.url.current + btnText}
                                      href={b.url.current}
                                      className="bg-base-purple sm:text-lg text-xs sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
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
                                    className="bg-transparent sm:text-lg text-xs sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2  border-white py-2"
                                  >
                                    {btnText}
                                    <MdKeyboardDoubleArrowRight className="text-lg" />
                                  </Link>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div className="flex gap-4 justify-center w-full flex-wrap">
              {buttons && buttons?.length > 0 && (
                <>
                  {buttons?.map((e) => {
                    const btnText = translate(e.text, lang);
                    if (e.withBackground) {
                      return (
                        <Link
                          key={e.url.current + btnText}
                          href={e.url.current}
                          className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
                        >
                          {btnText}
                          <MdKeyboardDoubleArrowRight className="text-lg" />
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={e.url.current + btnText}
                        href={e.url.current}
                        className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2 "
                      >
                        {btnText}
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {variation == 3 && (
        <div className={`w-full p-8 flex flex-col gap-16 items-center `}>
          <div className="sm:text-[2.3rem] text-[1.5rem] flex flex-wrap gap-2 font-bold justify-center">
            {header.map((e) => {
              const val = translate(e.Value, lang);
              if (e.Highlight) {
                return <LinearGradientText key={val} text={e.Value} />;
              }
              return <span key={val}>{val}</span>;
            })}
          </div>
          <div className="flex flex-col gap-8 sm:w-[80%] flex-wrap">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 ">
              {cards.map((e) => {
                const head = translate(e.heading, lang);
                return (
                  <div key={head} className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={e.imageUrl}
                        alt="flexible"
                        width={40}
                        height={40}
                      />
                      <p className="text-base-blue text-xl font-semibold">
                        {head}
                      </p>
                    </div>
                    <p className="text-text-gray">{translate(e.description, lang)}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 justify-center w-full flex-wrap">
              {buttons && buttons?.length > 0 && (
                <>
                  {buttons?.map((e) => {
                    const btnText = translate(e.text, lang);
                    if (e.withBackground) {
                      return (
                        <Link
                          key={e.url.current + btnText}
                          href={e.url.current}
                          className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
                        >
                          {btnText}
                          <MdKeyboardDoubleArrowRight className="text-lg" />
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={e.url.current + btnText}
                        href={e.url.current}
                        className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2"
                      >
                        {btnText}
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

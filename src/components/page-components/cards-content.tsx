import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";
import BaseSlider from "../common/base-slider";
import LinearGradientCircle from "../common/linear-gradient-circle";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface CardsProps {
  variation: number;
  header: { Highlight: boolean; Value: string }[];
  cards: [
    {
      imageUrl: string;
      description: string;
      heading: string;
      buttons?: [
        { withBackground: boolean; url: { current: string }; text: string }
      ];
    }
  ];
  description: string;
  buttons?: [
    { withBackground: boolean; url: { current: string }; text: string }
  ];
}

export default async function CardsContent({
  header,
  cards,
  variation,
  description,
  buttons,
}: CardsProps) {
  //     const reasonsToChooseUss: HeaderAndCards = reasonsToChooseUs?? await fetchLocalized({
  //         query: `*[_type=='cards' && name=='Reasons To Choose Us'][0]{
  //   ...,
  //   "header":[...header[]{
  //     Highlight,
  //       Value
  //   }],
  //   "cards":[...cards[]{
  //     "imageUrl":icon.asset->url,
  //     heading,
  //     description
  //   }]
  //             }`,
  //         config: {
  //             cache: 'no-store',
  //         }
  //     });

  // console.log(reasonsToChooseUss)
  console.log("butttons", buttons);

  return (
    <>
      {variation == 1 && (
        <div className="  p-8 flex flex-col gap-4 items-center ">
          {header && (
            <h1 className="sm:text-[2.3rem] flex flex-wrap gap-2 text-[1.5rem] font-bold">
              {header.map((e) => {
                if (e.Highlight) {
                  return <LinearGradientText key={e.Value} text={e.Value} />;
                }
                return <span key={e.Value}>{e.Value}</span>;
              })}
            </h1>
          )}

          <div className="sm:flex hidden gap-4 w-[80%] flex-wrap">
            {cards.map((e) => (
              <div
                key={e.heading}
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
                <p className="text-text-gray">{e.description}</p>
              </div>
            ))}
          </div>
          <BaseSlider extraClass="sm:hidden block">
            {cards.map((e) => (
              <div key={e.heading} className="h-full flex px-4">
                <div
                  key={e.heading}
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
                  <p className="text-text-gray">{e.description}</p>
                </div>
              </div>
            ))}
          </BaseSlider>

          <div className="flex gap-4 justify-center w-full flex-wrap">
            {buttons && buttons?.length > 0 && (
              <>
                {buttons?.map((e) => {
                  if (e.withBackground) {
                    return (
                      <Link
                        key={e.url.current + e.text}
                        href={e.url.current}
                        className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
                      >
                        {e.text}
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={e.url.current + e.text}
                      href={e.url.current}
                      className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2"
                    >
                      {e.text}
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
              <h1 className="sm:text-[2.3rem] flex flex-wrap gap-2 text-[1.5rem] font-bold">
                {header.map((e) => {
                  if (e.Highlight) {
                    return <LinearGradientText key={e.Value} text={e.Value} />;
                  }
                  return <span key={e.Value}>{e.Value}</span>;
                })}
              </h1>
            )}

            <p className="text-text-gray text-center">{description}</p>
            <div className="flex gap-4 flex-wrap w-full">
              {cards.map((e, index) => {
                if (index == 0) {
                  return (
                    <div
                      key={e.heading}
                      className={` bg-base-lightBlue  relative p-8 overflow-hidden  rounded-xl flex-[1_1_15rem]`}
                    >
                      <div className="flex flex-col gap-2 relative z-30">
                        <h1 className="font-bold text-base-blue sm:text-2xl text-lg">
                          {e.heading}
                        </h1>
                        <p className="text-text-lighterDarkBlue">
                          {e.description}
                        </p>
                        <Image
                          src={e.imageUrl}
                          alt="shipment1"
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
                      key={e.heading}
                      className=" bg-linearPurple  relative p-8 overflow-hidden  rounded-xl flex-[1_1_15rem]"
                    >
                      <div className="flex flex-col gap-2 relative z-30">
                        <h1 className="font-bold text-base-purple sm:text-2xl text-lg ">
                          {e.heading}
                        </h1>
                        <p className="text-base-purple">{e.description}</p>
                        <Image
                          src={e.imageUrl}
                          alt="shipment2"
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
                      key={e.heading}
                      className=" bg-linearBlue p-8 flex sm:flex-row flex-col sm:gap-8 gap-4 items-center rounded-xl w-full"
                    >
                      <div className="flex flex-1 text-white flex-col sm:gap-8 gap-4 relative z-30">
                        <h1 className="font-bold  sm:text-4xl text-lg">
                          {e.heading}
                        </h1>
                        <p className="">{e.description}</p>
                        <div className="sm:flex hidden gap-8">
                          {e.buttons && e.buttons?.length > 0 && (
                            <>
                              {e.buttons?.map((e) => {
                                if (e.withBackground) {
                                  return (
                                    <Link
                                      key={e.url.current + e.text}
                                      href={e.url.current}
                                      className="bg-base-purple sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2 border-base-purple py-2 "
                                    >
                                      {e.text}
                                      <MdKeyboardDoubleArrowRight className="text-lg" />
                                    </Link>
                                  );
                                }
                                return (
                                  <Link
                                    key={e.url.current + e.text}
                                    href={e.url.current}
                                    className="bg-transparent sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2  border-white py-2"
                                  >
                                    {e.text}
                                    <MdKeyboardDoubleArrowRight className="text-lg" />
                                  </Link>
                                );
                              })}
                            </>
                          )}
                          {/* <BaseButton className="flex min-w-[10rem] bg-base-purple text-white justify-between">Get Started Today <MdKeyboardDoubleArrowRight className="text-xl" /></BaseButton>
                                                <BaseButton className="flex min-w-[10rem] !bg-transparent border-white rounded-xl border-2 text-white justify-between">Get A Quote <MdKeyboardDoubleArrowRight className="text-xl" /></BaseButton> */}
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
                              {e.buttons?.map((e) => {
                                if (e.withBackground) {
                                  return (
                                    <Link
                                      key={e.url.current + e.text}
                                      href={e.url.current}
                                      className="bg-base-purple sm:text-lg text-xs sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
                                    >
                                      {e.text}
                                      <MdKeyboardDoubleArrowRight className="text-lg" />
                                    </Link>
                                  );
                                }
                                return (
                                  <Link
                                    key={e.url.current + e.text}
                                    href={e.url.current}
                                    className="bg-transparent sm:text-lg text-xs sm:flex-[0_0_30%] flex-1 min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2  border-white py-2"
                                  >
                                    {e.text}
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
                    if (e.withBackground) {
                      return (
                        <Link
                          key={e.url.current + e.text}
                          href={e.url.current}
                          className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
                        >
                          {e.text}
                          <MdKeyboardDoubleArrowRight className="text-lg" />
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={e.url.current + e.text}
                        href={e.url.current}
                        className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2 "
                      >
                        {e.text}
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </Link>
                    );
                  })}
                </>
              )}
              {/* <BaseButton extraClass="flex sm:w-max w-full !min-w-52 justify-between">Get Started Today<MdKeyboardDoubleArrowRight /></BaseButton>
                        <Link href={'/book-a-demo'} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple">Book a Demo<MdKeyboardDoubleArrowRight className="text-lg" /></Link> */}

              {/* <BaseButton extraClass="flex sm:w-max w-full !min-w-36 justify-between border-2 text-base-purple border-base-purple bg-transparent">Book a Demo <MdKeyboardDoubleArrowRight /></BaseButton> */}
            </div>
          </div>
        </div>
      )}

      {variation == 3 && (
        <div className={`w-full p-8 flex flex-col gap-16 items-center `}>
          <h1 className="sm:text-[2.3rem] text-[1.5rem] flex flex-wrap gap-2 font-bold">
            {header.map((e) => {
              if (e.Highlight) {
                return <LinearGradientText key={e.Value} text={e.Value} />;
              }
              return <span key={e.Value}>{e.Value}</span>;
            })}
          </h1>
          <div className="flex flex-col gap-8 sm:w-[80%] flex-wrap">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 ">
              {cards.map((e) => (
                <div key={e.imageUrl} className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={e.imageUrl}
                      alt="flexible"
                      width={40}
                      height={40}
                    />
                    <p className="text-base-blue text-xl font-semibold">
                      {e.heading}
                    </p>
                  </div>
                  <p className="text-text-gray">{e.description}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center w-full flex-wrap">
              {buttons && buttons?.length > 0 && (
                <>
                  {buttons?.map((e) => {
                    if (e.withBackground) {
                      return (
                        <Link
                          key={e.url.current + e.text}
                          href={e.url.current}
                          className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-base-purple border-2 py-2 "
                        >
                          {e.text}
                          <MdKeyboardDoubleArrowRight className="text-lg" />
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={e.url.current + e.text}
                        href={e.url.current}
                        className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2"
                      >
                        {e.text}
                        <MdKeyboardDoubleArrowRight className="text-lg" />
                      </Link>
                    );
                  })}
                </>
              )}
              {/* <BaseButton extraClass="flex sm:w-max w-full !min-w-52 justify-between">Get Started Today<MdKeyboardDoubleArrowRight /></BaseButton>
                        <Link href={'/book-a-demo'} className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple">Book a Demo<MdKeyboardDoubleArrowRight className="text-lg" /></Link> */}

              {/* <BaseButton extraClass="flex sm:w-max w-full !min-w-36 justify-between border-2 text-base-purple border-base-purple bg-transparent">Book a Demo <MdKeyboardDoubleArrowRight /></BaseButton> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import { TabsProps } from "@/utils/types";
import { Tab, Tabs } from "@heroui/tabs";
import { useState } from "react";
import TabWithSlider from "./tabs/tab-with-slider";
import LinearGradientText from "./linear-gradient-text";
import TabNoSlider from "./tabs/tab-no-slider";
import Image from "next/image";
import BaseButton from "./base-button";
import { useLocale, useTranslate } from "@/providers/locale-provider";

function Title(
  title: string,
  index: number,
  activeKey: number,
  lengthOfKeys: number,
  titleExtraClass?: string
) {
  if (activeKey == index) {
    if (index == 0)
      return (
        <div
          className="relative sm:w-full w-[13rem] h-[2rem]"
          style={{
            backgroundImage: "url('/button-covers/right-blue.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%,100%",
          }}
        >
          <div className=" h-full items-center flex justify-center">
            <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
          </div>
        </div>
      );

    if (index == lengthOfKeys)
      return (
        <div
          className="relative sm:w-full w-[13rem] h-[2rem]"
          style={{
            backgroundImage: "url('/button-covers/left-blue.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%,100%",
          }}
        >
          <div className=" h-full items-center flex justify-center">
            <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
          </div>
        </div>
      );

    if (index % 2 == 0)
      return (
        <div
          className="relative sm:w-full w-[13rem] h-[2rem]"
          style={{
            backgroundImage: "url('/button-covers/even.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%,100%",
          }}
        >
          <div className=" h-full items-center flex justify-center">
            <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
          </div>
        </div>
      );

    return (
      <div
        className="relative sm:w-full w-[13rem] h-[2rem]"
        style={{
          backgroundImage: "url('/button-covers/odd.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%,100%",
        }}
      >
        <div className=" h-full items-center flex justify-center">
          <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
        </div>
      </div>
    );
  }

  if (index - 1 == activeKey) {
    if (activeKey % 2 == 0)
      return (
        <div
          className="relative sm:w-full w-[13rem] h-[2rem]"
          style={{
            backgroundImage: "url('/button-covers/left-grey-up.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%,100%",
          }}
        >
          <div className=" h-full items-center flex justify-center">
            <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
          </div>
        </div>
      );

    return (
      <div
        className="relative sm:w-full w-[13rem] h-[2rem]"
        style={{
          backgroundImage: "url('/button-covers/left-grey-down.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%,100%",
        }}
      >
        <div className=" h-full items-center flex justify-center">
          <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
        </div>
      </div>
    );
  }

  if (index + 1 == activeKey) {
    if (activeKey == lengthOfKeys)
      return (
        <div
          className="relative sm:w-full w-[13rem] h-[2rem]"
          style={{
            backgroundImage: "url('/button-covers/right-grey-up.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%,100%",
          }}
        >
          <div className=" h-full items-center flex justify-center">
            <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
          </div>
        </div>
      );

    if (activeKey % 2 == 0)
      return (
        <div
          className="relative sm:w-full w-[13rem] h-[2rem]"
          style={{
            backgroundImage: "url('/button-covers/right-grey-up.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%,100%",
          }}
        >
          <div className=" h-full items-center flex justify-center">
            <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
          </div>
        </div>
      );

    return (
      <div
        className="relative sm:w-full w-[13rem] h-[2rem]"
        style={{
          backgroundImage: "url('/button-covers/right-grey-down.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%,100%",
        }}
      >
        <div className=" h-full items-center flex justify-center">
          <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative sm:w-full w-[13rem] h-[2rem] rounded-r-lg bg-[#FAFAFA]">
      <div className=" h-full items-center flex justify-center">
        <p className={titleExtraClass ? "text-text-blue" : ""}>{title}</p>
      </div>
    </div>
  );
}

export default function BaseTabs({ keys, variation }: TabsProps) {
  const [key, setKey] = useState<number>(0);
  const t = useTranslate();
  const locale = useLocale();
  return (
    <>
      <div className="flex sm:hidden flex-wrap gap-4">
        {keys?.map((e, index) => (
          <BaseButton
            onClick={() => setKey(index)}
            extraClass={`min-w-[13rem] flex-1 ${index == key
              ? "!bg-base-buttonTab text-base-blue"
              : "!bg-gray-200 text-base-gray"
              }`}
            key={t(e.name)}
          >
            {t(e.name)}
          </BaseButton>
        ))}
      </div>
      <div className="sm:hidden block">
        <div>
          {/* {e.component} */}
          {keys[key].slider[0].cards.length > 0 && variation == 1 && (
            <TabWithSlider
              buttons={keys[key].slider[0]?.buttons ?? []}
              title={
                <h3 className="sm:!text-3xl text-lg font-bold">
                  {keys[key].slider[0].header?.map((e) => {
                    if (e.Highlight) {
                      return (
                        <LinearGradientText
                          extraClass="mr-2"
                          key={t(e.Value)}
                          text={t(e.Value)}
                        />
                      );
                    }
                    return (
                      <span className="mr-2" key={t(e.Value)}>
                        {t(e.Value)}
                      </span>
                    );
                  })}
                </h3>
              }
              content={keys[key].slider[0]?.content?.[locale]}
              description={[t(keys[key].slider[0].description!)]}
              carousel={keys[key].slider[0].cards.map((e) => ({
                imageSrc: e.imageUrl,
                description: t(e.description!),
              }))}
            />
          )}
          {!keys[key].slider[0].imageUrl &&
            variation == 1 &&
            !keys[key].slider[0].cards.length && (
              <TabNoSlider
                buttons={keys[key].slider[0].buttons}
                title={
                  <h3 className="sm:!text-3xl text-lg font-bold">
                    {keys[key].slider[0].header?.map((e) => {
                      if (e.Highlight) {
                        return (
                          <LinearGradientText
                            extraClass="mr-2"
                            key={t(e.Value)}
                            text={t(e.Value)}
                          />
                        );
                      }
                      return (
                        <span className="mr-2" key={t(e.Value)}>
                          {t(e.Value)}
                        </span>
                      );
                    })}
                  </h3>
                }
                content={keys[key].slider[0].content?.[locale] ?? keys[key].slider[0].content}
                description={[t(keys[key].slider[0].description!)]}
              />
            )}

          {keys[key].slider[0].imageUrl && variation == 1 && (
            <div className="w-full ">
              <Image
                src={keys[key].slider[0].imageUrl}
                alt="platform"
                className="h-full w-full "
                width={1000}
                height={1000}
              />
            </div>
          )}

          {variation == 2 && (
            <div className="w-full flex relative">
              {keys
                .filter(
                  (j) => j.slider[0].imageUrl != keys[key].slider[0].imageUrl
                )
                .map((i, index, array) => (
                  <Image
                    key={i.slider[0].imageUrl}
                    src={i.slider[0].imageUrl!}
                    alt="platform"
                    className={`h-full w-[50%] ${index == 1 && "rotate-[4deg]"
                      }  ${index == 0 && "rotate-[-4deg]"
                      } flex-1 object-cover relative z-20 ${index == array.length - 1 && "!absolute left-[25%] z-0"
                      }  `}
                    width={500}
                    height={1000}
                  />
                ))}
              <Image
                src={keys[key].slider[0].imageUrl!}
                alt="platform"
                style={{ scale: 1.1 }}
                className="h-full flex-1 absolute object-cover left-[25%] z-50 w-[50%]"
                width={500}
                height={1000}
              />
            </div>
          )}
        </div>
      </div>

      <Tabs
        aria-label="Tabs sizes"
        onSelectionChange={(key) => {
          setKey(key as number);
        }}
        className="w-full sm:flex hidden"
        disableCursorAnimation
        classNames={{
          tabList: "!bg-transparent gap-0 w-full",
          tab: "p-0",
          tabContent:
            "group-data-[selected=true]:text-base-blue group-data-[selected=true]:font-bold w-full",
          panel: "w-full",
        }}
      >
        {keys.map((e, index) => (
          // <Tab key={index} title={Title(e.name, index, key, keys.length - 1,e.titleExtraClass)}>
          //     {e.component}
          // </Tab>
          <Tab
            className="sm:block hidden"
            key={index}
            title={Title(t(e.name), index, key, keys.length - 1)}
          >
            {/* {e.component} */}
            {e.slider[0].cards.length > 0 && variation == 1 && (
              <TabWithSlider
                buttons={e.slider[0].buttons}
                title={
                  e.slider[0].header && (
                    <h3 className="sm:!text-3xl text-lg font-bold">
                      {e.slider[0].header?.map((e) => {
                        if (e.Highlight) {
                          return (
                            <LinearGradientText
                              extraClass="mr-2"
                              key={t(e.Value)}
                              text={e.Value}
                            />
                          );
                        }
                        return (
                          <span className="mr-2" key={t(e.Value)}>
                            {t(e.Value)}
                          </span>
                        );
                      })}
                    </h3>
                  )
                }
                description={[t(e.slider[0].description!)]}
                content={e.slider[0].content?.[locale] ?? e.slider[0].content}
                carousel={e.slider[0].cards.map((e) => ({
                  imageSrc: e.imageUrl,
                  description: t(e.description!),
                }))}
              />
            )}
            {!e.slider[0].imageUrl &&
              variation == 1 &&
              !e.slider[0].cards.length && (
                <TabNoSlider
                  buttons={e.slider[0].buttons}
                  content={e.slider[0].content?.[locale] ?? e.slider[0].content}
                  title={
                    e.slider[0].header && (
                      <h3 className="sm:!text-3xl text-lg font-bold">
                        {e.slider[0].header?.map((e) => {
                          if (e.Highlight) {
                            return (
                              <LinearGradientText
                                extraClass="mr-2"
                                key={t(e.Value)}
                                text={e.Value}
                              />
                            );
                          }
                          return (
                            <span className="mr-2" key={t(e.Value)}>
                              {t(e.Value)}
                            </span>
                          );
                        })}
                      </h3>
                    )
                  }
                  description={[t(e.slider[0].description!)]}
                />
              )}

            {e.slider[0].imageUrl && variation == 1 && (
              <div className="w-full ">
                <Image
                  src={e.slider[0].imageUrl}
                  alt="platform"
                  className="h-full w-full "
                  width={1000}
                  height={1000}
                />
              </div>
            )}

            {variation == 2 && (
              <div className="w-full flex relative">
                {keys
                  .filter((j) => j.slider[0].imageUrl != e.slider[0].imageUrl)
                  .map((i, index, array) => (
                    <Image
                      key={i.slider[0].imageUrl}
                      src={i.slider[0].imageUrl!}
                      alt="platform"
                      className={`h-full w-[50%] ${index == 1 && "rotate-[4deg]"
                        }  ${index == 0 && "rotate-[-4deg]"
                        } flex-1 object-cover relative z-20 ${index == array.length - 1 && "!absolute left-[25%] z-0"
                        }  `}
                      width={500}
                      height={1000}
                    />
                  ))}
                <Image
                  src={e.slider[0].imageUrl!}
                  alt="platform"
                  style={{ scale: 1.1 }}
                  className="h-full flex-1 absolute object-cover left-[25%] z-50 w-[50%]"
                  width={500}
                  height={1000}
                />
              </div>
            )}
          </Tab>
        ))}
      </Tabs>
    </>
  );
}

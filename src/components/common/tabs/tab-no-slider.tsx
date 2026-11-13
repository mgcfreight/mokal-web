import { useTranslate } from "@/providers/locale-provider";
import { TabNoSliderProps } from "@/utils/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const components = {
  // types: {
  //     image: ({ value }:any) => <img src={value.imageUrl} />,
  // },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({ children }: any) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={(target === "_blank" && "noindex nofollow") as string}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => (
      <b className="text-black font-bold">{children}</b>
    ),
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }: any) => (
      <div className="text-2xl mt-5 font-semibold">{children}</div>
    ),
    normal: ({ children }: any) => <div className=" mt-2 ">{children}</div>,

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => <ul className="mt-xl mt-2">{children}</ul>,
    number: ({ children }: any) => <ol className="mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }: any) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <li className="list-disc leading-relaxed mt-2 ml-5">{children}</li>
    ),
    decimal: ({ children }: any) => (
      <li className="list-desc leading-relaxed mt-2 ml-5">{children}</li>
    ),
    // Ex. 2: rendering custom list items
    checkmarks: ({ children }: any) => <li>✅ {children}</li>,
  },
};

export default function TabNoSlider({
  title,
  description,
  buttons,
  content,
}: TabNoSliderProps) {
  const t = useTranslate();
  return (
    <div className="flex flex-col gap-4 items-center text-center p-4">
      {title}
      {description && description.length > 0 && (
        <div className="flex flex-col gap-1">
          {description.map((e) => (
            <p key={t(e)} className="text-text-gray">
              {t(e)}
            </p>
          ))}
        </div>
      )}

      {content && (
        <div className="self-start text-start">
          <PortableText value={content} components={components} />
        </div>
      )}

      {buttons && buttons?.length > 0 && (
        <div className="flex gap-2">
          {buttons?.map((e) => {
            if (e.withBackground) {
              return (
                <Link
                  key={e.url.current + t(e)}
                  href={e.url.current}
                  className="bg-base-purple min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-white border-2 py-2 "
                >
                  {t(e.text)}
                  <MdKeyboardDoubleArrowRight className="text-lg" />
                </Link>
              );
            }
            return (
              <Link
                key={e.url.current + t(e)}
                href={e.url.current}
                className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl px-2 text-base-purple border-2  border-base-purple py-2"
              >
                {t(e)}
                <MdKeyboardDoubleArrowRight className="text-lg" />
              </Link>
            );
          })}
        </div>
      )}
      {/* <BaseButton extraClass="!min-w-[10rem] flex justify-between">Learn More <MdKeyboardDoubleArrowRight className="text-lg" /></BaseButton> */}
    </div>
  );
}

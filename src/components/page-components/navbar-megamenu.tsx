"use client";
import { megaMenu } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useContext } from "react";
import { MegaMenuContext } from "@/providers/mega-menu";

export default function MegaMenu() {
  const router = useRouter();
  const { show, setShow } = useContext(MegaMenuContext);
  return (
    <div
      onClick={(j) => {
        j.stopPropagation();
      }}
      className={`${show != null ? "sm:block hidden" : "hidden"
        } relative w-full `}
    >
      <div className={`sm:px-8 px-4 py-4  absolute top-0 z-[99] w-full left-0`}>
        <div className="min-h-[10rem] shadow-[5px_10px_25px_grey] bg-white grid grid-cols-[2fr_1fr] rounded-lg p-8">
          {megaMenu[Number(show)] && (
            <div className="border-r-2 grid grid-cols-3 grid-rows-[0.3fr_0.3fr_0.3fr] p-4 gap-4 border-blue-200">
              {megaMenu[Number(show)].map((e, index) => (
                <div
                  key={e.title + index}
                  onClick={() => {
                    router.push(e.link);
                    setShow(null);
                  }}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <Image
                    key={e.icon}
                    src={e.icon}
                    alt={`${e.title} icon`}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-md">{e.title}</p>
                    <p className="text-sm">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-8 flex  justify-center">
            <div className="relative">
              <Image
                src={"/megamenu.svg"}
                alt="menu icon"
                className="min-h-[18rem] rounded-xl"
                width={400}
                height={200}
              />

              <div className="absolute bottom-10 left-4 flex flex-col gap-2">
                <Image
                  src={"/logo-white.svg"}
                  alt="MGC logo white"
                  width={200}
                  height={200}
                />
                <Link
                  href={"/book-a-demo"}
                  className="bg-transparent min-w-[9rem] flex justify-between items-center rounded-xl p-2 text-white border-2  border-white w-max"
                >
                  Book a Demo
                  <MdKeyboardDoubleArrowRight className="text-lg" />
                </Link>

                {/* <BaseButton className="bg-transparent border-2 rounded-3xl w-max border-white text-white">Book a Demo</BaseButton> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

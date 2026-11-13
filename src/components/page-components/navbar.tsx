import { client, links } from "@/utils/constants";
import { Navbar, NavbarContent } from "@heroui/navbar";
import { IoIosCall } from "react-icons/io";
import CheckStatusForm from "../forms/check-status";
import NavbarBottomHeader from "./navbar-bottom-header";
import Link from "next/link";
import { configData } from "@/utils/types";
import Marquee from "react-fast-marquee";
// import LanguageSelector from "../common/language-selector";
import { getLocale } from "@/utils/locale-server";
import { translate } from "@/utils/locale";

export default async function MainNavbar() {
  const lang = await getLocale();

  const configData: configData = await client.fetch({
    query: `*[_type == 'config'][0]{
        ...,
        "imageUrl": logo.asset->url,
        }`,
    config: {
      cache: "no-store",
    },
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="bg-nav">
          {!configData.prod && (
            <Marquee className="border-b-2 pb-2 border-gray-300">
              <p>
                All features of the website are inactive as the website is still
                under development for a full scale launch THIS IS JUST A PREVIEW
                of what to EXPECT in the FUTURE
              </p>
            </Marquee>
          )}

          <Navbar
            height={"auto"}
            position="static"
            className={`justify-start items-center bg-nav  text-base-blue sm:px-8 px-2 py-4 sm:py-0 !h-auto min-h-16`}
            classNames={{
              wrapper: "w-full max-w-full p-0 sm:flex-row flex-col",
            }}
            shouldHideOnScroll
          >
            <NavbarContent className=" flex w-full">
              <div className="flex w-full sm:gap-16 gap-8 sm:justify-start justify-between items-center">
                <div className="flex sm:gap-4 gap-2">
                  <p className="sm:block hidden">www.mgcfreight.com</p>
                  {configData.countries?.slice(0, 3).map((e, index) => (
                    <p
                      key={translate(e.name, lang)}
                      className={`${index != 0 ? "border-l-2" : "sm:border-l-2"
                        } text-xs sm:text-sm pl-2 border-base-blue`}
                    >
                      {translate(e.name, lang)}
                    </p>
                  ))}
                </div>
                <a
                  href={`tel:${configData.phoneNumber}`}
                  className="flex gap-2 sm:text-sm text-xs items-center"
                >
                  <IoIosCall />
                  <p>{configData.phoneNumber}</p>
                </a>
              </div>
            </NavbarContent>
            <NavbarContent className="sm:justify-end">
              <div className="flex  gap-4 w-full sm:justify-end items-center">
                <div className="flex gap-2 text-base-blue">
                  {configData.socialLinks &&
                    Object.entries(configData.socialLinks).map((e) => (
                      <Link key={e[1]} target="_blank" href={e[1] as string}>
                        {links[e[0] as keyof typeof links]}
                      </Link>
                    ))}
                </div>
                <CheckStatusForm />
                {/* <LanguageSelector /> */}
              </div>
            </NavbarContent>
          </Navbar>
        </div>
        <NavbarBottomHeader logo={configData.imageUrl} />
      </div>
    </>
  );
}

"use client";
import Image from "next/image";
import BaseButton from "../common/base-button";
import {
  dropdowns,
  megaMenu,
  mokalLink,
  navbarMenuSettings,
} from "@/utils/constants";
import { NavbarMenuSetting } from "@/utils/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { useContext } from "react";
import MegaMenu from "./navbar-megamenu";
import { HiMenu } from "react-icons/hi";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  AccordionItem,
} from "@heroui/react";
import BaseAccordion from "../common/base-accordion";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { MegaMenuContext } from "@/providers/mega-menu";

export default function NavbarBottomHeader({ logo }: { logo: string }) {
  const { show, setShow } = useContext(MegaMenuContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <>
      <nav
        className={`flex w-full gap-8 px-8 py-4 sm:py-0 items-center justify-between `}
      >
        <div className="flex sm:flex-row flex-col sm:w-max w-full sm:gap-8 gap-4">
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <Image src={logo} alt="logo" width={150} height={200} />
            </Link>
            <HiMenu className="sm:hidden" onClick={() => onOpen()} size={30} />
          </div>
          <div className="flex gap-4">
            <Link
              href={"/get-a-quote"}
              className="!bg-transparent text-base-purple w-max border-2 flex items-center p-2 rounded-xl border-base-purple font-semibold"
            >
              Quick Quote
            </Link>
            <Link
              href={"/book-a-demo"}
              className=" w-max sm:hidden bg-base-purple p-2 text-white rounded-xl font-semibold"
            >
              Book a Demo
            </Link>
          </div>
        </div>
        <div className="sm:flex hidden gap-8 items-center ">
          {navbarMenuSettings.map((e: NavbarMenuSetting) => {
            if (e.link)
              return (
                <Link key={e.name} href={e.link} className={e.extraClass}>
                  {e.name}
                </Link>
              );
            if (e.isButton)
              return (
                <BaseButton
                  key={e.name}
                  style={e.style}
                  extraClass={e.extraClass + " !text-sm"}
                >
                  {e.name}
                </BaseButton>
              );
            if (e.isDropDown)
              return (
                <div
                  key={e.name}
                  onClick={(j) => {
                    j.stopPropagation();

                    if (show == e.index) {
                      setShow(null);
                      return;
                    }
                    setShow(e.index!);
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <p className="text-sm">{e.name}</p>
                  {show != e.index && <IoIosArrowDown />}
                  {show == e.index && <IoIosArrowUp />}
                </div>
              );
            return (
              <Link className="text-sm" href={"/"} key={e.name}>
                {e.name}
              </Link>
            );
          })}
        </div>
      </nav>
      <MegaMenu />
      <Drawer
        isOpen={isOpen}
        className="sm:!hidden"
        size={"full"}
        placement="left"
        classNames={{
          closeButton:
            "border-2 p-2 text-black border-black rounded-full right-4 top-4",
          body: "py-16",
        }}
        onClose={onClose}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerBody>
                <Link
                  onClick={() => onClose()}
                  href="/"
                  className="hover:!bg-base-pink bg-transparent text-black justify-start text-md px-2 py-2 rounded-xl"
                >
                  Home
                </Link>
                <BaseAccordion
                  variant="light"
                  showDivider={false}
                  itemClasses={{ content: "bg-white" }}
                >
                  {dropdowns.map((e, index) => (
                    <AccordionItem
                      classNames={{
                        heading: `data-[open=true]:bg-base-pink data-[open=true]:rounded-2xl data-[open=true]:px-2 data-[open=true]:text-base-purple data-[open=true]:font-bold `,
                      }}
                      key={index}
                      aria-label={e}
                      title={e}
                    >
                      <div className="px-4">
                        <div className="flex flex-col gap-4 p-4">
                          {megaMenu[index].map((e, index) => (
                            <div
                              onClick={() => {
                                router.push(e.link);
                                onClose();
                              }}
                              key={e.title + index}
                              className="flex cursor-pointer items-center gap-4"
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
                      </div>
                    </AccordionItem>
                  ))}
                </BaseAccordion>

                <Link
                  onClick={() => onClose()}
                  href={mokalLink}
                  className="hover:!bg-base-pink bg-transparent text-black justify-start text-md px-2 py-2 rounded-xl"
                >
                  Login
                </Link>

                <div className="relative">
                  <Image
                    src={"/megamenu.svg"}
                    className="min-h-[18rem] rounded-xl"
                    alt="menu icon"
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
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

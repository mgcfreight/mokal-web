import Image from "next/image";
import { SiMinutemailer } from "react-icons/si";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import {
  aboutUsServices,
  client,
  links,
  partnershipLinks,
  quickLinksLinks,
  resourcesLinks,
  servicesLinks,
} from "@/utils/constants";
import Link from "next/link";
import axios from "axios";
import { configData } from "@/utils/types";

import { getLocale } from "@/utils/locale-server";
import { translate } from "@/utils/locale";

export default async function Footer() {
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

  const carriers: { imageUrl: string[] } = await client.fetch({
    query: `*[_type == 'carriers'][0]{
  "imageUrl": logos[].asset->url
}
`,
    config: {
      cache: "no-store",
    },
  });

  const addressText = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${configData.address.lat},${configData.address.lng}&key=${process.env.GOOGLE_APIKEY}`
  );

  return (
    <div className="w-full bg-white">
      <div className="w-full">
        <Marquee className=" ">
          {carriers.imageUrl.map((e) => (
            <div key={e} className="p-4">
              <Image src={e} alt="intelcom" width={100} height={100} />
            </div>
          ))}
        </Marquee>
        <div className="w-full h-[0.1rem] bg-linearPurple"></div>
      </div>
      <div className="sm:px-20 px-4 sm:py-20 py-8">
        <div className="grid sm:grid-cols-[1fr_1fr_1fr_1fr_1fr] grid-cols-2 gap-16 w-full">
          <div className="flex flex-col gap-8 sm:col-span-1 col-span-2">
            <Link href={"/"}>
              <Image
                src={configData.imageUrl}
                alt="logo"
                width={250}
                height={250}
              />
            </Link>
            <div className="flex flex-col gap-4">
              <p className="text-text-gray">Stay Connected With Us</p>
              <div className="flex gap-2 text-icon">
                {configData.socialLinks &&
                  Object.entries(configData.socialLinks).map((e) => (
                    <Link key={e[0]} target="_blank" href={e[1] as string}>
                      {links[e[0] as keyof typeof links]}
                    </Link>
                  ))}
              </div>
              <Link
                href={"/get-a-quote"}
                className="bg-transparent border-base-purple border-2 text-lg font-bold text-base-purple w-max p-2 rounded-xl"
              >
                Get Quick Quote
              </Link>
              <Link
                href={"/book-a-demo"}
                className="bg-transparent border-base-purple border-2 text-lg font-bold text-base-purple w-max p-2 rounded-xl"
              >
                Book a Demo
              </Link>
              {/* <p className="text-text-gray">info@mgcfreight.com</p>
                            <p className="text-text-gray">T: 1-235-456-5689</p>
                            <p className="text-text-gray">T: 1-235-456-5689</p> */}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-base-purple text-2xl font-medium">Services</p>
            {servicesLinks.map((e) => (
              <Link key={e.link} className="text-text-gray" href={e.link}>
                {e.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-base-purple text-2xl font-medium">About Us</p>
              {aboutUsServices.map((e) => (
                <Link key={e.link} className="text-text-gray" href={e.link}>
                  {e.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-base-purple text-2xl font-medium">
                Quick Links
              </p>
              {quickLinksLinks.map((e) => (
                <Link key={e.link} className="text-text-gray" href={e.link}>
                  {e.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="sm:flex grid grid-cols-2 sm:gap-4 gap-16 sm:flex-col  sm:col-span-1 col-span-2">
            <div className="flex flex-col gap-4 flex-1">
              <p className="text-base-purple text-2xl font-medium">
                Partnership
              </p>
              {partnershipLinks.map((e) => (
                <Link key={e.link} className="text-text-gray" href={e.link}>
                  {e.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <p className="text-base-purple text-2xl font-medium">Resources</p>
              {resourcesLinks.map((e) => (
                <Link key={e.link} className="text-text-gray" href={e.link}>
                  {e.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:col-span-1 col-span-2">
            <p className="text-base-purple text-2xl font-medium">Social</p>
            {addressText.data.results[0] && (
              <div className="flex gap-4">
                <FaLocationDot className="sm:text-4xl text-2xl" />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Address</p>
                  <p>{addressText.data.results[0].formatted_address}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <SiMinutemailer className="text-2xl" />
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Email</p>
                <p>{configData.email}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <BsFillTelephoneOutboundFill className="text-2xl" />
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Phone</p>
                <p>{configData.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-nav  sm:px-20 px-4 py-4 text-base-blue font-normal">
        <p>{translate(configData.copyright, lang)}</p>
      </div>
    </div>
  );
}

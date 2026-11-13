import { getServiceSchema, getFAQSchema } from "@/utils/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3PL Fulfillment Services Canada | Pick, Pack & Ship | MGC Freight",
  description: "MGC Freight's 3PL fulfillment services handle order processing, warehousing, pick-and-pack, and shipping for growing Canadian businesses.",
  keywords: ["fulfillment services", "order fulfillment", "e-commerce fulfillment", "MGC Freight", "warehousing", "inventory management", "logistics services", "shipping services", "3PL", "supply chain management"],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
  openGraph: {
    title: "3PL Fulfillment Services Canada | Pick, Pack & Ship | MGC Freight",
    description: "MGC Freight's 3PL fulfillment services handle order processing, warehousing, pick-and-pack, and shipping for growing Canadian businesses.",
    type: "website",
    locale: "en_US",
    siteName: "MGC Freight",
  },
  twitter: {
    card: "summary_large_image",
    title: "3PL Fulfillment Services Canada | Pick, Pack & Ship | MGC Freight",
    description: "MGC Freight's 3PL fulfillment services handle order processing, warehousing, pick-and-pack, and shipping for growing Canadian businesses.",
  },
};

// import BaseButton from "@/components/common/base-button";
// import LinearGradientText from "@/components/common/linear-gradient-text";
// import Image from "next/image";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import HearFromUsAndBlogs from "@/components/page-components/hearFromUs-blogPost";
import GrowYourBusiness from "@/components/page-components/grow-your-business";
// import BaseBreadCrumb from "@/components/common/base-breadcrumb";
// import Link from "next/link";
import { PagesContent } from "@/utils/types";
import { client } from "@/utils/constants";
import Title from "@/components/page-components/title";
import TabPageComponent from "@/components/page-components/tab";
import Content from "@/components/page-components/content";
import FAQSs from "@/components/page-components/faqs";
import CustomerBase from "@/components/page-components/customer-base";
import RefineTransportPage from "@/components/page-components/refine-transportPage";
import CardsContent from "@/components/page-components/cards-content";
import MainBlog from "@/components/page-components/main-blog";
import Testimonials from "@/components/page-components/testimonials";
// import Content2 from "@/components/page-components/content2";
import GuideToBook from "@/components/page-components/guide-to-book";
import SingleSlider from "@/components/page-components/single-slider";
import CareerOppurtunities from "@/components/page-components/career-oppurtunities";
import NoOpenForm from "@/components/forms/no-open-complete";
import BookADemoForm from "@/components/forms/book-a-demo";
import ReactOut from "@/components/forms/broker-partner-form";
import TrackShipment from "@/components/page-components/track-shipment";
import GetAQuoteForm from "@/components/page-components/get-a-quote";
import BrokerPartnerForm from "@/components/forms/broker-partner-form";
import CorporatePartnerForm from "@/components/forms/corporate-partner-form";
import { getLocale } from "@/utils/locale-server";

export default async function FulfillmentServices() {
  const lang = await getLocale();
  const homeData: { content: [PagesContent] } = await client.fetch({
    query: `*[_type=='fullfillment'][0]{
                                                          "content":[...contentBlocks[]->{

                                                            ...,
                                                            
                                                            "singleSlider":[...slider[]{...,"cards":[...cards[]{
                                          ...,
                                          "imageUrl":imageUrl.asset->url
                                        }]}],
                                                            "images":[...images[]{...,"imageUrl":imageUrl.asset->url}],
                                                            "video":video.asset->url,
                                                             "testimonials":[...testimonials[]->{
                                                               ...,
                                                               "imageUrl":image.asset->url
                                                              }],
                                                             "blogs":[...blogs[]->{
                                                               ...,
                                                               "Author":Author.authorName,
  "AuthorImage":Author.authorImage.asset->url,
                                                               "imageUrl":image.asset->url
                                                              }],
                                                            "imageUrl":imageUrl.asset->url,
                                                            "slider":[...slider[]->{
                                                              ...,
                                                              "imageUrl":imageUrl.asset->url,
                                                              "cards":[...cards[]->{
                                                                ...,
                                                                "imageUrl":imageUrl.asset->url
                                                              }],
                                                        
                                                              "slider":[...slider[]{
                                                                ...,
                                                                "imageUrl":imageUrl.asset->url,
                                                                "cards":[...cards[]{
                                                                  ...,
                                                                  "imageUrl":imageUrl.asset->url
                                                                  
                                                                }]}
                                                                       ]
                                                        
                                                              
                                                            }],
                                                            "cards":[...cards[]{
                                                              ...,
                                                              "imageUrl":icon.asset->url
                                                            }],
                                                            "content":[...content[]{
                                                              ...,
                                                              "description":[...description[]{
                                                                ...,
                                                                "imageUrl":imageUrl.asset->url
                                                              }],
                                                              "imageUrl":asset->url,
                                                              "arrayContent":[...arrayContent[]{
                                                                ...,
                                                                "imageUrl":imageUrl.asset->url
                                                              }]
                                                            }]
                                                            }
                                                            ],
                                                              "remaining":{...}
                                                            }`,
  });
  const { content } = homeData;
  const serviceSchema = getServiceSchema("Fulfillment Services", "Streamline your e-commerce and retail supply chain with our end-to-end order fulfillment, warehousing, and inventory management.", "https://www.mgcfreight.com/fulfillment-services", lang);
  const faqBlock = content.find((e) => e._type === "faqs");
  const faqSchema = faqBlock && faqBlock.questions ? getFAQSchema(faqBlock.questions, lang) : null;


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className={`flex flex-col gap-4`}>
        {content.map((e, index) => {
          return (
            <div
              key={e._type + index}
              className={`${index != 0
                ? index % 2 != 0
                  ? "bg-white w-full"
                  : "bg-base-shadeBlue w-full"
                : ""
                }`}
            >
              {e._type == "title" && (
                <Title
                  identifier="1"
                  breadCrumb={["Services", "Fulfillment Services"]}
                  header={e.header!}
                  title={e.title}
                  buttons={e.buttons}
                  imageUrl={e.imageUrl}
                  description={e.description}
                />
              )}
              {e._type == "tabs" && (
                <TabPageComponent
                  variation={e.variation!}
                  header={e.header!}
                  slider={e.slider as any}
                />
              )}
              {e._type == "content" && (
                <Content customerSpotlight content={e.content as any} />
              )}
              {e._type == "faqs" && (
                <FAQSs
                  header={e.header!}
                  questions={e.questions!}
                  description={e.description!}
                />
              )}
              {e._type == "mapComponent" && <CustomerBase header={e.header!} />}
              {e._type == "refineTransport" && <RefineTransportPage />}
              {e._type == "cards" && (
                <CardsContent
                  description={e.description!}
                  header={e.header!}
                  cards={e.cards as any}
                  variation={e.variation!}
                  buttons={e.buttons}
                />
              )}
              {e._type == "blogComponent" && (
                <MainBlog header={e.header!} blogs={e.blogs} />
              )}
              {e._type == "testimonialComponent" && (
                <Testimonials
                  header={e.header!}
                  description={e.description}
                  testimonials={e.testimonials}
                />
              )}
              {/* {e._type == "contentPageComponent" && (
                <Content2
                  images={e.images}
                  buttons={e.buttons}
                  description={e.description}
                  header={e.header!}
                  video={e.video}
                />
              )} */}
              {e._type == "guideComponent" && <GuideToBook />}
              {(e._type == "growYourBusiness" ||
                e._type == "spotQuoteForm") && <GrowYourBusiness />}
              {e._type == "sliderComponent" && (
                <SingleSlider
                  header={e.singleSlider[0].header}
                  description={e.singleSlider[0].description}
                  cards={e.singleSlider[0].cards}
                  buttons={e.singleSlider[0].buttons}
                  imageUrl={e.singleSlider[0].imageUrl}
                />
              )}
              {e._type == "career-oppurtuinities" && <CareerOppurtunities />}
              {e._type == "brokerPartner" && <BrokerPartnerForm />}
              {e._type == "corporatePartner" && <CorporatePartnerForm />}

              {e._type == "positionForm" && <NoOpenForm />}
              {e._type == "bookDemoForm" && <BookADemoForm />}
              {e._type == "reachOutForm" && <ReactOut />}
              {e._type == "trackShipment" && <TrackShipment />}
              {e._type == "getAQuoteForm" && <GetAQuoteForm />}
            </div>
          );
        })}
      </div>
    </>
  );
}

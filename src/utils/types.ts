import { responsive } from "@/components/common/base-slider";
import {
  AccordionProps,
  ButtonProps,
  CheckboxProps,
  InputProps,
  SelectProps,
  SwitchProps,
  TextAreaProps,
} from "@heroui/react";
import { CSSProperties, Dispatch, ReactNode, SetStateAction } from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { CarouselProps } from "react-multi-carousel";

export interface BaseInputProps extends InputProps {
  control: Control;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
  extraClass?: string;
}

export interface BaseButtonProps extends ButtonProps {
  extraClass?: string;
}

export interface NavbarMenuSetting {
  name: string;
  isDropDown?: boolean;
  isButton?: boolean;
  link?: string;
  extraClass?: string;
  index?: number;
  style?: CSSProperties;
}

export interface MegaMenuProps {
  show: null | number;
  setShow: Dispatch<SetStateAction<number | null>>;
}

export type TabItemProp = [
  {
    header?: [{ Value: { en: string; fr: string }; Highlight: boolean }];
    imageUrl?: string;
    buttons?: [
      { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
    ];
    name: { en: string; fr: string } | string;
    description?: { en: string; fr: string };
    cards: [{ imageUrl: string; description: { en: string; fr: string } }];
    slider: [
      {
        header: [{ Value: { en: string; fr: string }; Highlight: boolean }];
        imageUrl: string;
        buttons: [
          { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
        ];
        name: { en: string; fr: string };
        description: { en: string; fr: string };
        cards: [{ imageUrl: string; description: { en: string; fr: string } }];
        content: any;
      }
    ];
    component?: any;
  }
];

export interface TabsProps {
  keys: TabItemProp;
  variation: number;
}

export interface TabNoSliderProps {
  title: ReactNode;
  description?: { en: string; fr: string }[];
  buttons?: [
    { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
  ];
  content?: any;
}

type CarouselData = { imageSrc: string; description: { en: string; fr: string } }[];

export interface TabWithSliderProps {
  title: ReactNode;
  description: { en: string; fr: string }[];
  carousel: CarouselData;
  hideButton?: boolean;
  buttons?: [
    { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
  ];
  content?: any;
}

export interface BaseSliderProps extends Omit<CarouselProps, "responsive"> {
  children: ReactNode;
  extraClass?: string;
  extraResponsive?: typeof responsive;
  extraSliderClass?: string;
}

export interface BaseAccordionProps extends AccordionProps {
  anything?: string;
}

export interface BaseFileProps extends InputProps {
  labelClass?: string;
  bgColor?: string;
  control: Control;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
}

export type LinearGradientTextProp = { text: { en: string; fr: string }; extraClass?: string };

export interface BaseCheckboxProps extends CheckboxProps {
  anything?: string;
  control: Control;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
}

export interface CourierServiceProps {
  bgColor?: string;
}

export interface HearFromUsAndBlogsProps {
  hideBlogs?: boolean;
  hideHearFromUs?: boolean;
  bgHearFromUs?: string;
  bgBlogs?: string;
}

export type countriesType = {
  name: { en: string; fr: string };
  coords: number[];
  iconUrl: string;
}[];

export interface configData {
  socialLinks: { [x: string]: string };
  phoneNumber: string;
  countries?: countriesType;
  imageUrl: string;
  copyright: { en: string; fr: string };
  address: { lat: number; lng: number };
  email: string;
  prod: boolean;
}

export interface HeaderAndCards {
  header: { Highlight?: boolean; Value: { en: string; fr: string } }[];
  cards: {
    imageUrl: string;
    heading: { en: string; fr: string };
    description: { en: string; fr: string };
  }[];
}

export type IndvidualBlog = {
  id: string;
  imageUrl: string;
  authorName: string;
  authorImg: string;
  title: { en: string, fr: string };
  content: [{ text: string }][];
  publishedAt: string;
};

export type Blogs = IndvidualBlog[];

export interface FAQS {
  header: { Highlight: boolean; Value: { en: string; fr: string } }[];
  questions: { answer: { en: string; fr: string }; question: { en: string; fr: string } }[];
  description: { en: string; fr: string };
}

export interface PagesContent {
  _id: string;
  slider: [
    {
      header?: [{ Value: { en: string; fr: string }; Highlight: boolean }];
      imageUrl?: string;
      buttons?: [
        { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
      ];
      name: { en: string; fr: string };
      description?: { en: string; fr: string };
      slider: [
        {
          header?: [{ Value: { en: string; fr: string }; Highlight: boolean }];
          imageUrl?: string;
          buttons?: [
            { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
          ];
          name: { en: string; fr: string };
          description?: { en: string; fr: string };
          cards: [{ imageUrl: string; description: { en: string; fr: string } }];
        }
      ];
    }
  ];

  cards: [] | [any];
  imageUrl?: string;
  buttons?: [any];
  title?: { en: string; fr: string };
  _type: string;
  content?: [] | [any];
  _updatedAt: string;
  description?: { en: string; fr: string };
  _createdAt?: string;
  header?: [any];
  _rev: string;
  questions?: [{ answer: { en: string; fr: string }; question: { en: string; fr: string } }];
  variation?: number;
  blogs?: [
    { _id: string; title: { en: string; fr: string }; _createdAt: string; imageUrl: string }
  ];
  testimonials?: [
    {
      _id: string;
      name: string;
      _createdAt: string;
      imageUrl: string;
      description: { en: string; fr: string };
      rating: number;
    }
  ];
  video: string;
  images: [{ imageUrl: string }];
  singleSlider: [
    {
      header?: [{ Value: { en: string; fr: string }; Highlight: boolean }];
      imageUrl?: string;
      buttons?: [
        { withBackground: boolean; url: { current: string }; text: { en: string; fr: string } }
      ];
      description?: { en: string; fr: string };
      cards: [{ imageUrl: string; description: { en: string; fr: string } }];
    }
  ];
}

export interface BaseSelectProps extends Omit<SelectProps, "children"> {
  items: { name: string; value: string | number }[];
  control: Control;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
}

export interface BaseTextAreaProps extends TextAreaProps {
  control: Control;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
}

export interface BaseSwitchProps extends SwitchProps {
  name: string;
  control?: Control<FieldValues, any, FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
}

export enum PackageType {
  PALLET = 1,
  PACKAGE,
  COURIER_PACK,
  ENVELOP,
}

export enum PalletType {
  Drum = 1,
  Boxes,
  Rolls,
  Pipes,
  Bales,
  Bags,
  Pallet,
  Cylinder,
  Pails,
  Reels,
  Crate,
  Bucket,
  Bundle,
  Can,
  Carton,
  Case,
  Coil,
  Pieces,
  Skid,
}

export enum PalletFreightClass {
  _50 = 1,
  _55,
  _60,
  _65,
  _70,
  _77,
  _77Point5,
  _85,
  _92Point5,
  _100,
  _110,
  _125,
  _150,
  _175,
  _200,
  _250,
  _300,
  _400,
  _500,
}

export enum Country {
  US = "US",
  CA = "CA",
}

export enum FTLPackageType {
  FLATBED = 1,
  REEFER,
  VAN,
  CONTAINER,
}

export enum ShipmentStatus {
  DRAFT = 1, // Initial state, not finalized.
  PENDING, // shipment status when payment is credit or email transfer
  PUBLISHED, // Shipment is visible/confirmed but not yet processed.
  READYTOSHIP,
  IN_TRANSIT, // Shipment is currently being transported.
  DELIVERED, // Shipment has been delivered to the destination.
  CANCELLED, // Shipment was cancelled before delivery.
  // RETURNED, // Shipment was returned after delivery attempt.
  EXCEPTION,
}

import TabNoSlider from "@/components/common/tabs/tab-no-slider";
import { NavbarMenuSetting } from "./types";
import LinearGradientText from "@/components/common/linear-gradient-text";
import TabWithSlider from "@/components/common/tabs/tab-with-slider";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import SanityClient from "next-sanity-client";
import { localize } from "./localize";

export const countries = ["Canada", "USA", "Mexico"];

export const phoneNumber = "+1 (289) 295-1640";

export const mokalLink = "https://platform.mgcfreight.com/login";

export const navbarMenuSettings: NavbarMenuSetting[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Services",
    isDropDown: true,
    index: 0,
  },
  {
    name: "About Us",
    isDropDown: true,
    index: 1,
  },
  {
    name: "Partnerships",
    isDropDown: true,
    index: 2,
  },
  {
    name: "Resources",
    isDropDown: true,
    index: 3,
  },
  {
    name: "Get Started",
    link: mokalLink,
    isButton: true,
    extraClass:
      "bg-base-purple text-white rounded-xl p-2 font-semibold min-w-[10rem] flex justify-center",
  },
  {
    name: "Book a Demo",
    link: "/book-a-demo",
    isButton: true,
    extraClass:
      "border-base-purple border-2 text-base-purple rounded-xl p-2 font-semibold min-w-[10rem] flex justify-center",
  },
  {
    name: "Login",
    link: mokalLink,
    isButton: true,
    extraClass: "!bg-transparent text-gray-600 !p-0 ",
    style: { padding: 0, color: "grey" },
  },
  // {
  //     name: "Francais",
  //     link: '/',
  //     isButton: true,
  //     extraClass: "!bg-transparent text-gray-600 !p-0 ",
  //     style: { padding: 0, color: 'grey' }
  // }
];

export const megaMenuServices = [
  {
    icon: "/icons/loading.svg",
    title: "Less Than Truckload (LTL)",
    description: "Cost-effective shipping for smaller freight.",
    link: "/LTL",
  },
  {
    icon: "/icons/food-delivery.svg",
    title: "Courier Services",
    description: "Fast and reliable package delivery.",
    link: "/courier-services",
  },
  {
    icon: "/icons/premium-quality.svg",
    title: "Specialized Freight",
    description: "Expert handling for unique shipments.",
    link: "/specialized-freight",
  },
  {
    icon: "/icons/international.svg",
    title: "International Shipping",
    description: "Hassle-free international shipping.",
    link: "/international-shipping",
  },
  {
    icon: "/icons/world-humanitarian-day.svg",
    title: "White Glove Services",
    description: "Premium care for delicate and high-value items.",
    link: "/white-glove-services",
  },
  {
    icon: "/icons/pricing.svg",
    title: "Spot Quote",
    description: "Instant pricing for urgent shipments.",
    link: "/spot-quote",
  },
  {
    icon: "/icons/fulfillment.svg",
    title: "Fulfillment Services",
    description: "Streamlined inventory and order management.",
    link: "/fulfillment-services",
  },
  {
    icon: "/icons/delivery (1) (1).svg",
    title: "Freight Forwarding",
    description: "Global logistics for seamless freight movement.",
    link: "/freight-forwarding",
  },
  {
    icon: "/icons/delivery (1).svg",
    title: "Truckload",
    description: "Full-capacity shipping for large freight.",
    link: "/truckload",
  },
];

export const megaMenuAbout = [
  {
    icon: "/icons/about.svg",
    title: "Who We Are",
    description: "Your trusted partner in logistics.",
    link: "/who-we-are",
  },
  {
    icon: "/icons/chat.svg",
    title: "Contact Us",
    description: "Reach out for personalized support.",
    link: "/contact-us",
  },
  {
    icon: "/icons/career.svg",
    title: "Careers",
    description: "Join our team and grow with us.",
    link: "/careers",
  },
  {
    icon: "/icons/satisfaction.svg",
    title: "Customer Spotlight",
    description: "Showcasing success stories and partnerships.",
    link: "/customer-spotlight",
  },
];

export const megaMenuPartnerships = [
  {
    icon: "/icons/broker.svg",
    title: "Broker Partners",
    description: "Collaborate with us for mutual growth.",
    link: "/broker-partner",
  },
  {
    icon: "/icons/corporation.svg",
    title: "Corporate Partners",
    description: "Customized solutions for enterprise needs.",
    link: "/corporate-partner",
  },
  {
    icon: "/icons/delivery-truck (1).svg",
    title: "Carrier Partners",
    description: "Fastest and Most Reliable Carrier Partners",
    link: "/carrier-partners",
  },
];

export const megaMenuResources = [
  {
    icon: "/icons/info (1).svg",
    title: "Shipping Guides",
    description: "Step-by-step resources for seamless shipping.",
    link: "/shipping-guides",
  },
  {
    icon: "/icons/video.svg",
    title: "Video Library",
    description: "Learn with engaging and informative videos.",
    link: "/video-library",
  },
  {
    icon: "/icons/blogging 1.svg",
    title: "Blog",
    description: "Expert advice to streamline shipping.",
    link: "/blogs",
  },
];

export const HomePageTabs = [
  {
    title: "Fulfillment",
    component: (
      <TabNoSlider
        title={
          <h3 className="sm:!text-3xl text-lg font-bold">
            Comprehensive <LinearGradientText text={{ en: "Fulfillment Services", fr: "Services d'exécution" }} /> for
            Your Business
          </h3>
        }
        description={[
          { en: "Simplify your logistics with MGC Freight! We offer end-to-end fulfillment solutions, including efficient order processing, secure warehousing, and hassle-free shipping, ensuring a smooth experience for you and your customers.", fr: "Simplifiez votre logistique avec MGC Freight! Nous offrons des solutions d'exécution complètes, y compris le traitement efficace des commandes, l'entreposage sécurisé et l'expédition sans tracas, garantissant une expérience fluide pour vous et vos clients.", },
        ]}
      />
    ),
  },
  {
    title: "Courier",
    component: (
      <TabWithSlider
        title={
          <h3 className="sm:!text-3xl text-lg font-bold">
            Trusted Courier Partner Solutions for{" "}
            <LinearGradientText text={{ en: "Seamless Deliveries", fr: "Livraisons Impeccables" }} />
          </h3>
        }
        description={[
          { en: "Enhance your shipping capabilities with MGC Freight’s reliable courier partnerships. We ensure timely deliveries, secure handling, and exceptional service, providing your business with the flexibility and efficiency needed to satisfy your customers every step of the way.", fr: "Améliorez vos capacités d'expédition avec les partenariats de messagerie fiables de MGC Freight. Nous garantissons des livraisons rapides, une manutention sécurisée et un service exceptionnel, offrant à votre entreprise la flexibilité et l'efficacité nécessaires pour satisfaire vos clients à chaque étape du processus." },
        ]}
        carousel={[
          {
            imageSrc: "/couriers/Artboard.svg",
            description:
              { en: "Shipping, courier, and expedited transport services within the US, Canada.", fr: "Services d'expédition, de messagerie et de transport accéléré aux États-Unis et au Canada." },
          },
          {
            imageSrc: "/couriers/gardewine.svg",
            description:
              { en: "Leading trucking company providing logistics services across Canada for 70+ years.", fr: "Principale entreprise de transport routier fournissant des services logistiques à travers le Canada depuis plus de 70 ans." },
          },
          {
            imageSrc: "/couriers/DayandRoss.svg",
            description:
              { en: "Logistics company that operates in various sectors, including logistics solutions", fr: "Entreprise de logistique opérant dans divers secteurs, y compris les solutions logistiques" },
          },
          {
            description:
              { en: "Canada’s most trusted transport carrier for over 60 years.", fr: "Transporteur le plus fiable au Canada depuis plus de 60 ans." },
            imageSrc: "/couriers/M-O-2.svg",
          },
          {
            imageSrc: "/couriers/kindersley.svg",
            description:
              { en: "Providing truckload and LTL service throughout North America", fr: "Fourniture de services de transport complet et LTL à travers l'Amérique du Nord" },
          },
          {
            imageSrc: "/couriers/DHL.svg",
            description:
              { en: "American-founded German logistics company delivering over 1.8 billion parcels per year.", fr: "Entreprise de logistique allemande fondée en Amérique, livrant plus de 1,8 milliard de colis par an." },
          },
          {
            imageSrc: "/couriers/Canpar.svg",
            description:
              { en: "Helping small parcel delivery companies’ shipping processes on a day-to-day basis.", fr: "Aide les petites entreprises de livraison de colis dans leurs processus d'expédition au quotidien." },
          },
        ]}
      />
    ),
  },
  {
    title: "LTL",
    component: (
      <TabWithSlider
        title={
          <h3 className="sm:!text-3xl text-lg font-bold">
            Reliable <LinearGradientText text={{ en: "LTL (Less Than Truckload)", fr: "LTL (Moins qu'un chargement complet)" }} />{" "}
            Partner Solutions
          </h3>
        }
        description={[
          { en: "Optimize your freight shipping with MGC Freight’s LTL services. We provide cost-effective and flexible solutions, ensuring your smaller shipments are delivered safely and on time, no matter the destination.", fr: "Optimisez votre expédition de fret avec les services LTL de MGC Freight. Nous fournissons des solutions rentables et flexibles, garantissant que vos expéditions plus petites sont livrées en toute sécurité et à temps, quelle que soit la destination." },
        ]}
        carousel={[
          {
            imageSrc: "/couriers/Artboard.svg",
            description:
              { en: "Shipping, courier, and expedited transport services within the US, Canada.", fr: "Services d'expédition, de messagerie et de transport accéléré aux États-Unis et au Canada." },
          },
          {
            imageSrc: "/couriers/gardewine.svg",
            description:
              { en: "Leading trucking company providing logistics services across Canada for 70+ years.", fr: "Principale entreprise de transport routier fournissant des services logistiques à travers le Canada depuis plus de 70 ans." },
          },
          {
            imageSrc: "/couriers/DayandRoss.svg",
            description:
              { en: "Logistics company that operates in various sectors, including logistics solutions", fr: "Entreprise de logistique opérant dans divers secteurs, y compris les solutions logistiques" },
          },
          {
            description:
              { en: "Canada’s most trusted transport carrier for over 60 years.", fr: "Le transporteur le plus fiable au Canada depuis plus de 60 ans." },
            imageSrc: "/couriers/M-O-2.svg",
          },
          {
            imageSrc: "/couriers/kindersley.svg",
            description:
              { en: "Providing truckload and LTL service throughout North America", fr: "Fourniture de services de transport complet et LTL à travers l'Amérique du Nord" },
          },
          {
            imageSrc: "/couriers/DHL.svg",
            description:
              { en: "American-founded German logistics company delivering over 1.8 billion parcels per year.", fr: "Entreprise de logistique allemande fondée en Amérique, livrant plus de 1,8 milliard de colis par an." },
          },
          {
            imageSrc: "/couriers/Canpar.svg",
            description:
              { en: "Helping small parcel delivery companies’ shipping processes on a day-to-day basis.", fr: "Aide les petites entreprises de livraison de colis dans leurs processus d'expédition au quotidien." },
          },
        ]}
      />
    ),
  },
  {
    title: "Brokers",
    component: (
      <TabNoSlider
        title={
          <h3 className="sm:!text-3xl text-lg font-bold">
            The <LinearGradientText text={{ en: "Ultimate Platform", fr: "La plateforme ultime" }} /> for Freight
            Brokers
          </h3>
        }
        description={[
          { en: "Streamline your operations with MGC Freight’s broker-friendly solutions. We offer efficient tools and reliable support to help you manage shipments, connect with carriers, and ensure seamless deliveries for your clients.", fr: "Simplifiez vos opérations avec les solutions conviviales de MGC Freight pour les courtiers. Nous offrons des outils efficaces et un soutien fiable pour vous aider à gérer les expéditions, à vous connecter avec les transporteurs et à assurer des livraisons fluides pour vos clients." },
        ]}
      />
    ),
  },
  {
    title: "Spot Quote",
    component: (
      <TabNoSlider
        title={
          <h3 className="sm:!text-3xl text-lg font-bold">
            Fast, Reliable Spot Quotes to{" "}
            <LinearGradientText text={{ en: "Simplify Your Freight Booking", fr: "Simplifiez votre réservation de fret" }} />
          </h3>
        }
        description={[
          { en: "MGC Freight eliminates the hassle of spot quoting, reducing your workload and boosting efficiency.", fr: "MGC Freight élimine les tracas liés aux cotations ponctuelles, réduisant ainsi votre charge de travail et augmentant votre efficacité." },
          { en: "Looking for PTL or FTL services? Let us connect you with the best options and pricing through our trusted carrier network!", fr: "Vous recherchez des services PTL ou FTL? Laissez-nous vous mettre en relation avec les meilleures options et tarifs grâce à notre réseau de transporteurs de confiance!" },
        ]}
      />
    ),
  },
  {
    title: "Claims",
    component: (
      <TabNoSlider
        title={
          <h3 className="sm:!text-3xl text-lg font-bold">
            Simplified and Swift <LinearGradientText text={{ en: "Claims Resolution", fr: "Résolution rapide et simplifiée des réclamations" }} />
          </h3>
        }
        description={[
          { en: "Say goodbye to the hassle of filing claims with MGC Freight! Our intuitive claims system ensures quick and easy resolutions.", fr: "Dites adieu aux tracas liés au dépôt de réclamations avec MGC Freight! Notre système de réclamation intuitif garantit des résolutions rapides et faciles." },
          { en: "Need assistance? Our dedicated and friendly claims experts are here to guide you every step of the way.", fr: "Besoin d'aide? Nos experts en réclamations dévoués et amicaux sont là pour vous guider à chaque étape du processus." },
        ]}
      />
    ),
  },
];

export const dropdowns = ["Services", "About Us", "Partnerships", "Resources"];

export const megaMenu = [
  megaMenuServices,
  megaMenuAbout,
  megaMenuPartnerships,
  megaMenuResources,
];

export const reasonsToChooseUs = [
  {
    imageSrc: "/icons/success.svg",
    title: "Success Together",
    description:
      "We do big things when we are inclusive and work together. To perform with excellence, we learn from one another, value diverse perspectives, operate safely, and build strong relationships. We welcome everyone regardless of background, identity or ability.",
  },
  {
    imageSrc: "/icons/leading.svg",
    title: "Leading Results",
    description:
      "Customers, carriers, stakeholders and colleagues demand best-in-class performance, so we never stop listening, understanding needs, and executing with integrity. We make transportation simpler and more effective for everyone.",
  },
  {
    imageSrc: "/icons/spirit.svg",
    title: "Pioneering Spirit",
    description:
      "We’re passionate about creating cutting-edge technologies and solutions that connect customers and carriers with the right capacity. We always look boldly ahead to what’s next.",
  },
  {
    imageSrc: "/icons/mindset.svg",
    title: "ENTREPRENEURIAL Mindset",
    description:
      "We know the success of our customers, carriers and company is in our hands. We take it upon ourselves to solve problems and out perform.",
  },
  {
    imageSrc: "/icons/agile.svg",
    title: "Agile Approach",
    description:
      "We move quickly and adapt easily. We leverage technology, data and expertise to anticipate and create the right capacity where it’s needed.",
  },
];

// export const managementPlatformTabs: TabItemProp = [
//     {
//         title: 'Dashboard',
//         component: <div className="w-full "><Image src={'/images/platform.svg'} alt="platform" className="h-full w-full " width={1000} height={1000} /></div>,
//         titleExtraClass: "blue"
//     },
//     {
//         title: "Real-Time Quotes",
//         component: <TabWithSlider title={<h1 className="sm:!text-3xl text-lg font-bold" >Trusted Courier Partner Solutions for <LinearGradientText text="Seamless Deliveries" /></h1>} description={['Enhance your shipping capabilities with MGC Freight’s reliable courier partnerships. We ensure timely deliveries, secure handling, and exceptional service, providing your business with the flexibility and efficiency needed to satisfy your customers every step of the way.']} carousel={[{ imageSrc: "/couriers/Artboard.svg", description: "Shipping, courier, and expedited transport services within the US, Canada." }, { imageSrc: "/couriers/gardewine.svg", description: "Leading trucking company providing logistics services across Canada for 70+ years." }, { imageSrc: "/couriers/DayandRoss.svg", description: "Logistics company that operates in various sectors, including logistics solutions" }, { description: "Canada’s most trusted transport carrier for over 60 years.", imageSrc: "/couriers/M-O-2.svg" }, { imageSrc: "/couriers/kindersley.svg", description: "Providing truckload and LTL service throughout North America" }, { imageSrc: "/couriers/DHL.svg", description: "American-founded German logistics company delivering over 1.8 billion parcels per year." }, { imageSrc: "/couriers/Canpar.svg", description: "Helping small parcel delivery companies’ shipping processes on a day-to-day basis." }]} />,
//         titleExtraClass: "blue"
//     },
//     {
//         title: "Tracking",
//         component: <TabWithSlider title={<h1 className="sm:!text-3xl text-lg font-bold" >Reliable <LinearGradientText text="LTL (Less Than Truckload)" /> Partner Solutions</h1>} description={['Optimize your freight shipping with MGC Freight’s LTL services. We provide cost-effective and flexible solutions, ensuring your smaller shipments are delivered safely and on time, no matter the destination.']} carousel={[{ imageSrc: "/couriers/Artboard.svg", description: "Shipping, courier, and expedited transport services within the US, Canada." }, { imageSrc: "/couriers/gardewine.svg", description: "Leading trucking company providing logistics services across Canada for 70+ years." }, { imageSrc: "/couriers/DayandRoss.svg", description: "Logistics company that operates in various sectors, including logistics solutions" }, { description: "Canada’s most trusted transport carrier for over 60 years.", imageSrc: "/couriers/M-O-2.svg" }, { imageSrc: "/couriers/kindersley.svg", description: "Providing truckload and LTL service throughout North America" }, { imageSrc: "/couriers/DHL.svg", description: "American-founded German logistics company delivering over 1.8 billion parcels per year." }, { imageSrc: "/couriers/Canpar.svg", description: "Helping small parcel delivery companies’ shipping processes on a day-to-day basis." }]} />,
//         titleExtraClass: "blue"
//     },
//     {
//         title: "Pickup",
//         component: <TabNoSlider title={<h1 className="sm:!text-3xl text-lg font-bold" >The <LinearGradientText text="Ultimate Platform" /> for Freight Brokers</h1>} description={['Streamline your operations with MGC Freight’s broker-friendly solutions. We offer efficient tools and reliable support to help you manage shipments, connect with carriers, and ensure seamless deliveries for your clients.']} />,
//         titleExtraClass: "blue"
//     }
// ]

export const faqs = [
  {
    title: "How do I create a new shipment order through MGC Freight?",
    content:
      'To create a new shipment, log into your account and click on the "Create New Shipment" button. Fill in the necessary details, such as destination and shipment type, and submit the order.',
  },
  {
    title:
      "What types of freight services are available through MGC Freight for my business needs?",
    content:
      "We offer air, sea, and ground shipping services, each designed to optimize cost, time, and reliability for your specific logistics requirements.",
  },
  {
    title:
      "How can I track the status of my shipment in real-time using your platform?",
    content:
      'To create a new shipment, log into your account and click on the "Create New Shipment" button. Fill in the necessary details, such as destination and shipment type, and submit the order.',
  },
  {
    title:
      "What payment methods are accepted when using MGC Freight services for shipping orders?",
    content:
      'To create a new shipment, log into your account and click on the "Create New Shipment" button. Fill in the necessary details, such as destination and shipment type, and submit the order.',
  },
];

export const termsandcondtions = [
  {
    header: "Acceptance of the Website Terms of Use",
    content: [
      '(A) These terms and conditions of use for https://www.mgcfreight.com/ constitute a legal agreement between you and MGC Freight Inc. ("Company," "we," "us," "our"). The terms, along with any documents they incorporate by reference, govern your access and use of https://www.mgcfreight.com, https://app.mgcfreight.com/, and its subdomains (the "Website").',
      'By using the Website or clicking "accept," you agree to these Terms of Use and our Privacy Policy, incorporated by reference. If you do not agree, you must not access or use the Website.',
      "(B) By using the Website, you represent that you meet the legal age of majority to form a binding contract and comply with all eligibility requirements. If you do not meet these requirements, you must not access or use the Website.",
    ],
  },
  {
    header: "Modifications to the Terms of Use and to the Website",
    content: [
      "(A) We reserve the right to revise and update these Terms of Use at any time. Such modifications take effect immediately upon posting and apply to all use of the Website. You agree to review these terms periodically and your continued use constitutes acceptance of any modifications.",
      "(B) The Website's content, material, and Terms of Use may change or be terminated at any time without notice at our discretion.",
    ],
  },

  {
    header: "Interactions with Third Parties",
    content: [
      "(A) The Website may contain links to third-party websites or services not owned by us. Our display of third-party delivery options does not imply endorsement or sponsorship by us.",
      "(B) We do not recommend third-party services displayed on the Website.",
      "(C) We are not responsible for the accuracy, timeliness, or completeness of information from third parties.",
      "(D) Any interaction with third parties, including payment and service delivery, is solely at your own risk.",
      "(E) We have no liability for any actions, errors, representations, or breaches by third parties, nor for any resulting damages.",
    ],
  },

  {
    header: "No Reliance",
    content: [
      "(A) The content on our Website is for general information purposes only and should not be relied upon as professional advice. You must seek more specific advice before taking any action based on the Website's content.",
      "(B) We make reasonable efforts to update the information, but we do not guarantee its accuracy or completeness. Use of the Website is at your own risk, and we disclaim all liability related to its use.",
      "(C) Any content provided by third parties does not necessarily reflect our views, and we have no responsibility or liability for its accuracy.",
    ],
  },

  {
    header: "Intellectual Property Rights and Ownership",
    content: [
      "(A) The Website and all its content, including text, graphics, software, images, trademarks, and other proprietary material, are owned by us or our licensors and protected by intellectual property laws.",
      "(B) The Company name, logo, and related marks are trademarks of MGC Freight Inc. You may not use these marks without our written permission.",
      "(C) You may only use the Website's content for personal, non-commercial use. Any other use constitutes infringement and may violate intellectual property laws.",
      "(D) Unauthorized access or use of the Website is a violation of these terms and may infringe on intellectual property rights.",
    ],
  },

  {
    header: "Conditions of Use and User Submissions",
    content: [
      "(A) You may use the Website only for lawful purposes and in accordance with these Terms of Use.",
      "(B) User Submissions must comply with all applicable laws and regulations. Submissions must not:",
      [
        "Violate intellectual property or other legal rights.",
        "Contain inappropriate, offensive, or harmful content.",
        "Misrepresent or impersonate others.",
        "Be used for commercial purposes without our prior consent.",
      ],
      "(C) We reserve the right to remove or refuse User Submissions that violate these standards.",
    ],
  },

  {
    header: "Conditions of Use and User Submissions",
    content: [
      "(A) You may use the Website only for lawful purposes and in accordance with these Terms of Use.",
      "(B) User Submissions must comply with all applicable laws and regulations. Submissions must not:",
      [
        "Violate intellectual property or other legal rights.",
        "Contain inappropriate, offensive, or harmful content.",
        "Misrepresent or impersonate others.",
        "Be used for commercial purposes without our prior consent.",
      ],
      "(C) We reserve the right to remove or refuse User Submissions that violate these standards.",
    ],
  },

  {
    header: "User Submissions: Grant of License",
    content: [
      "(A) By submitting User Submissions, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, display, distribute, and disclose such material.",
      "(B) You warrant that you own or have rights to the User Submissions and that they comply with these Terms of Use.",
      "(C) You are fully responsible for your User Submissions, and we are not liable for their accuracy or content.",
    ],
  },

  {
    header: "Site Monitoring and Enforcement, Suspension, and Termination",
    content: [
      "(A) We have the right to:",
      [
        "Remove or refuse to post User Submissions.",
        "Take action to enforce these terms.",
        "Cooperate with law enforcement regarding violations.",
      ],
      "(B) You waive any claims arising from our enforcement of these terms.",
      "(C) We have no obligation to monitor User Submissions or their content.",
    ],
  },

  {
    header: "Errors and Omissions",
    content: [
      "(A) The Website may contain errors or inaccuracies. We reserve the right to correct them at any time without notice, including after orders have been placed.",
    ],
  },

  {
    header: "Other Third Parties",
    content: [
      "(A) The Website may contain links to third-party websites. We have no control over these sites and assume no responsibility for their content, accuracy, or privacy practices.",
      "(B) You access third-party sites at your own risk and should review their terms and policies.",
      "(C) We are not responsible for any loss or damage caused by your use of third-party sites.",
    ],
  },

  {
    header: "Geographic Restrictions",
    content: [
      "(A) The owner of the Website is based in Ontario, Canada. This Website is not intended for use in any jurisdiction where its use is not permitted. If you access the Website from outside Canada, you do so at your own risk and you are responsible for compliance with local laws of your jurisdiction.",
    ],
  },

  {
    header: "Disclaimer of Warranties",
    content: [
      `(A) You understand and agree that your use of the Website, its content, and any services or items found or attained through the Website is at your own risk. The Website, its content, and any services or items found or attained through the Website are provided on an "as is" and "as available" basis, without any warranties or conditions of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. The foregoing does not affect any warranties that cannot be excluded or limited under applicable law.`,
      `(B) Neither the Company nor its parent, subsidiaries, affiliates, or their respective directors, officers, employees, agents, service providers, contractors, licensors, licensees, suppliers, or successors make any warranty, representation, or endorsement with respect to the completeness, security, reliability, suitability, accuracy, currency, or availability of the Website or its contents. Without limiting the foregoing, neither the Company nor its parent, subsidiaries, affiliates, or their respective directors, officers, employees, agents, service providers, contractors, licensors, licensees, suppliers, or successors represent or warrant that the Website, its content, or any services or items found or attained through the Website will be accurate, reliable, error-free, or uninterrupted, that defects will be corrected, that our Website or the server that makes it available are free of viruses or other harmful components.`,
      `(C) We cannot and do not guarantee or warrant that files or data available for downloading from the internet or the Website will be free of viruses or other destructive code. You are solely and entirely responsible for your use of the Website and your computer, internet, and data security. To the fullest extent provided by law, we will not be liable for any loss or damage caused by denial-of-service attack, distributed denial-of-service attack, overloading, flooding, mail bombing, or crashing, viruses, trojan horses, worms, logic bombs, or other technologically harmful material that may infect your computer equipment, computer programs, data, or other proprietary material due to your use of the Website or any services or items found or attained through the Website or to your downloading of any material posted on it, or on any Website linked to it.`,
    ],
  },

  {
    header: "Limitations of Liability",
    content: [
      `(A) Except where such exclusions are prohibited by law, under no circumstance will the Company nor its parent, subsidiaries, affiliates, or their respective directors, officers, employees, agents, service providers, contractors, licensors, licensees, suppliers, or successors be liable for negligence, gross negligence, negligent misrepresentation, fundamental breach, damages of any kind, under any legal theory, including any direct, indirect, special, incidental, consequential, or punitive damages, including, but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, breach of privacy, or otherwise, even if the party was allegedly advised or had reason to know, arising out of or in connection with your use, or inability to use, or reliance on, the Website, any linked websites or such other third-party websites, nor any Website content, materials, posting, or information thereon, even if the party was allegedly advised or had reason to know.`,
    ],
  },

  {
    header: "Indemnification",
    content: [
      `(A) To the maximum extent permitted by applicable law, you agree to defend, indemnify, and hold harmless the Company, its parent, subsidiaries, affiliates, and their respective directors, officers, employees, agents, service providers, contractors, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your breach of these Terms of Use or your use of the Website, including, but not limited to, your User Submissions, third-party sites, any use of the Website’s content, services, and products other than as expressly authorized in these Terms of Use.`,
      `(B) We will not be liable if, for any reason, all or any part of the Website is restricted to users or unavailable at any time or for any period.`,
    ],
  },

  {
    header: "Force Majeure",
    content: [
      `(A) The Company shall not be liable or responsible to you, nor deemed to have defaulted under, or breached, these Terms of Use or our Privacy Policy, when and to the extent such failure or delay is caused by or results from acts beyond the Company’s reasonable control, including, without limitation: (A) acts of God (B) flood, fire, or explosion; (C) epidemics, pandemics, including the 2019 novel coronavirus disease (COVID-19) pandemic; (D) war, invasion, riot, or other civil unrest; (E) actions, embargoes, or blockades; (f) national or regional emergency; (g) strikes or labour stoppages, or other industrial disturbances; (h) passage of law, or any action taken by a governmental or public authority, including but not limited to imposing an embargo, export or import restriction, quota or other restriction or prohibition, or failing to grant a necessary licence or consent; (i) shortage of adequate power or telecommunications or transportation facilities; or (j) any other event which is beyond the reasonable control of the Company.`,
    ],
  },

  {
    header: "Governing Law and Choice of Forum",
    content: [
      `(A) The Website and these Terms of Use will be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without giving effect to any choice or conflict of law provision, principle, or rule (whether of the laws of the Province of Ontario or any other jurisdiction) and notwithstanding your domicile, residence, or physical location.`,
      `(B) Any action or proceeding arising out of or relating to this Website and under these Terms of Use will be instituted in the courts of the Province of Ontario and/or the Federal Court of Canada, and each party irrevocably submits to the exclusive jurisdiction of such courts in any such action or proceeding. You waive any and all objections to the exercise of jurisdiction over you by such courts and to the venue of such courts.`,
    ],
  },

  {
    header: "Waiver",
    content: [
      `(A) No failure to exercise, or delay in exercising, any right, remedy, power, or privilege arising from these Terms of Use operates, or may be construed, as a waiver thereof. No single or partial exercise of any right, remedy, power, or privilege hereunder precludes any other or further exercise thereof or the exercise of any other right, remedy, power, or privilege.`,
    ],
  },

  {
    header: "Severability",
    content: [
      `(A) If any term or provision of these Terms of Use is invalid, illegal, or unenforceable in any jurisdiction, such invalidity, illegality, or unenforceability shall not affect any other term or provision of these Terms of Use or invalidate or render unenforceable such term or provision in any other jurisdiction.`,
    ],
  },

  {
    header: "Entire Agreement",
    content: [
      `(A) The Terms of Use, our Privacy Policy, the Payment Terms, and the Insurance Policy constitute the sole and entire agreement between you and the Company regarding your use of the Website and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding such subject matter.`,
    ],
  },

  {
    header: "Reporting and Contact",
    content: [
      `(A) This Website is operated by MGC Freight Inc., located at 1-77 Pillsworth Rd, Bolton, ON L7E 4G4.`,
      `(B) Should you become aware of misuse of the Website, including libelous or defamatory conduct, you must report it to the Company at legal "at" mgcfreight.com.`,
      `(C) All other feedback, comments, requests for technical support, and other communications relating to the Website should be directed to techsupport "at" mgcfreight.com.`,
    ],
  },

  {
    header: "Paramountcy",
    content: [
      `In the event of any inconsistency between the English version of these Terms of Use and the terms of the French version of these Terms of Use, the English version of these Terms of Use shall govern.`,
    ],
  },
];

export const optimalModes = [
  "Dry Van",
  "Expedited",
  "Temperature controlled",
  "Multi-stop",
  "Flatbeds",
  "Hazmat",
  "Drop trailer",
  "Auto hauling",
  "Cross-border",
  "Customized solutions",
  "High value",
];

export const benefitsForMgc = [
  "Scheduled payments",
  "Established contracts",
  "Flexible delivery duties",
  "High revenue growth potential",
  "Routes and hours that match an independent lifestyle",
  "The dedicated support of RXO’s best-in-class last mile team",
];

export const servicesLinks = [
  {
    name: "Less Than Truckload (LTL)",
    link: "/LTL",
  },
  {
    name: "Courier Services",
    link: "/courier-services",
  },
  {
    name: "Specialized Freight",
    link: "/specialized-freight",
  },
  {
    name: "International Shipping",
    link: "/international-shipping",
  },
  {
    name: "White Glove Services",
    link: "/white-glove-services",
  },
  {
    name: "Spot Quote",
    link: "/spot-quote",
  },
  {
    name: "Fulfillment Services",
    link: "/fulfillment-services",
  },
  {
    name: "Freight Forwarding",
    link: "/freight-forwarding",
  },
  {
    name: "Truckload",
    link: "/truckload",
  },
];

export const aboutUsServices = [
  {
    name: "Who We Are",
    link: "/who-we-are",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "Careers",
    link: "/careers",
  },
  {
    name: "Customer Spotlight",
    link: "/customer-spotlight",
  },
];

export const quickLinksLinks = [
  {
    name: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Claims",
    link: "/claims",
  },
];

export const partnershipLinks = [
  {
    name: "Broker Partners",
    link: "/broker-partner",
  },
  {
    name: "Corporate Partners",
    link: "/corporate-partner",
  },
  {
    name: "Carrier Partners",
    link: "/carrier-partners",
  },
];

export const resourcesLinks = [
  {
    name: "Video Library",
    link: "/video-library",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "Shipping Guides",
    link: "/shipping-guides",
  },
];

export const links = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  linkedIn: <FaLinkedinIn />,
  youtube: <FaYoutube />,
  twitter: <FaTwitter />,
};

export const client = new SanityClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  // Deployed builds read from Sanity's CDN; local dev hits the live API so
  // edits in the studio show up immediately.
  useCdn: process.env.NODE_ENV === "production",
});

/**
 * `client.fetch` that unwraps localized Sanity fields (`{ en: "..." }`) in the
 * result. Use this for every content query.
 *
 * It only touches the result: a query that filters on or traverses a localized
 * field must address the locale itself, e.g. `title.en match ...` or
 * `contents.en[]` (see DEFAULT_LOCALE in ./localize).
 */
export async function fetchLocalized<T = any>(
  ...args: Parameters<typeof client.fetch>
): Promise<T> {
  return localize<T>(await client.fetch(...args));
}

import "./globals.css";
import Script from "next/script";
import HeroProvider from "@/providers/hero-provider";
import { Lato } from "next/font/google";
import MainNavbar from "@/components/page-components/navbar";
import Footer from "@/components/page-components/footer";
import QueryProvider from "@/providers/query-provider";
import MegaMenuProvider from "@/providers/mega-menu";
import { ToastContainer } from 'react-toastify';

import { getLocale } from "@/utils/locale-server";
import { LocaleProvider } from "@/providers/locale-provider";
import { Metadata } from "next";
import { isProduction } from "@/utils/environment";
import { getLocalBusinessSchema, getLogisticsBusinessSchema, getWebSiteSchema } from "@/utils/schema";

export const metadata: Metadata = {
  robots: {
    index: isProduction,
    follow: isProduction,
    nocache: !isProduction,
  },
};

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLocale();

  return (
    <html lang={lang}>
      <body className={`${lato.className} antialiased bg-grid bg-base-gridBg`}>
        <HeroProvider>
          <QueryProvider>
            <MegaMenuProvider>
              <LocaleProvider lang={lang}>
                <MainNavbar />
                <div className={` mt-8`}>{children}</div>
                <Footer />
                <ToastContainer />
              </LocaleProvider>
            </MegaMenuProvider>
          </QueryProvider>
        </HeroProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLogisticsBusinessSchema()) }}
        />
        {isProduction && <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H7Y1TXGZ4R"
          strategy="afterInteractive"
        />}
        {isProduction && <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-H7Y1TXGZ4R');
          `}
        </Script>}
      </body>
    </html>
  );
}

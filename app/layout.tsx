import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Menu from "./menu";

export const metadata: Metadata = {
  title: {
    default: "HK-League 2024 香港麻雀協會 立直麻雀隊際競技聯賽2024",
    template: "%s | HK-League 2024 香港麻雀協會 立直麻雀隊際競技聯賽2024",
  },
  description:
    "《HK-League 2024 香港麻雀協會立直麻雀隊際競技聯賽2024》是由香港麻雀協會在2024年籌備的，在香港內賽程最長的日麻隊際競技聯賽，預計將進行近250場半莊戰，從12隊隊伍中決定最佳隊伍。",
  keywords: [
    "HK-League",
    "2024",
    "香港麻雀協會",
    "立直麻雀",
    "日麻",
    "mahjong",
    "riichi",
    "riichi mahjong",
    "立直麻雀",
    "牌藝攻防",
  ],
};

export const viewport: Viewport = {
  themeColor: "#1e223b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@600&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <div className="h-[100vh] flex flex-col">
          <div className="flex-1 max-w-[1920px] mx-auto relative flex items-center justify-center">
            <section className="w-full text-center relative overflow-hidden">
              <div className="pt-8 md:pt-20 pb-20 relative z-10 text-center">
                <div className="container px-2 mx-auto flex flex-col sm:flex-row justify-center items-stretch gap-4">
                  <div className="shrink-0">
                    <img
                      src="/images/logo.png"
                      className="block mx-auto w-36 h-36 xl:w-40 xl:h-40"
                      alt="HK-League"
                    />
                  </div>
                  <div className="text-center sm:text-left flex flex-col justify-between pb-[4px]">
                    <h1
                      className="text-[48px] sm:text-[56px] md:text-[72px] lg:text-[96px] leading-[1] sm:leading-[1.1] md:leading-[0.8] font-serif font-semibold"
                      style={{
                        textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
                      }}
                    >
                      HK-League 2024
                    </h1>
                    <h2
                      className="text-[24px] whitespace-pre-wrap sm:whitespace-nowrap sm:text-[32px] leading-[1.2] sm:leading-[1]"
                      style={{
                        textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
                      }}
                    >
                      香港麻雀協會
                      <br />
                      立直麻雀隊際競技聯賽2024
                    </h2>
                  </div>
                </div>
                <div className="flex justify-center gap-x-2 mx-auto mt-8">
                  <a href="https://www.hkmahjong.org/" target="_blank">
                    <img
                      className="h-16"
                      src="/images/logo-hkma.webp"
                      alt="香港麻雀協會 Hong Kong Mahjong Association"
                    />
                  </a>
                </div>
              </div>
              <p className="text-6xl">即將公佈</p>
            </section>
          </div>

          <footer className="shrink-0 text-neutral-300 hover:[&_a]:text-neutral-100 text-sm pt-16 pb-12">
            <div className="container px-2 mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
              <div className="space-y-4 text-left">
                <div className="space-x-4">
                  <span>主辦機構</span>
                  <span>
                    <a href="https://www.hkmahjong.org/" target="_blank">
                      <img
                        className="h-12 sm:h-16 inline-block"
                        src="/images/logo-hkma.webp"
                        alt="香港麻雀協會 Hong Kong Mahjong Association"
                      />
                    </a>
                  </span>
                </div>
                <div className="space-x-4">
                  <span>場地提供</span>
                  <span>
                    <img
                      className="h-12 sm:h-16 inline-block"
                      src="/images/logo-hkmjbs.webp"
                      alt="牌藝攻防 Mahjong Battle Stadium"
                    />
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-x-4 text-center md:text-right pr-1 text-2xl">
                  <a
                    href="https://www.facebook.com/hkmjassn/"
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/hkmjassn/"
                    target="_blank"
                    aria-label="Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
                <div className="space-x-6 text-center md:text-right pr-1">
                  <a href="#">聯賽章程</a>
                  <a href="mailto:info@hkmahjong.org">聯絡我們</a>
                </div>
                <p className="text-center md:text-right">
                  ©2024 by 香港麻雀協會 Hong Kong Mahjong Association.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}

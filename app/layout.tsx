import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { Providers } from "./provider";

const myFont = localFont({
  src: "./fonts/Iansui-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sakura2025.hkmahjong.org"),
  title: {
    default: "Sakura League 2025 香港麻雀協會 香港女子立直麻雀聯賽2025",
    template: "%s | Sakura League 2025 香港麻雀協會 香港女子立直麻雀聯賽2025",
  },
  description:
    "《Sakura League 2025 香港女子立直麻雀聯賽2025》是由香港麻雀協會及麻雀理工共同籌備的日麻聯賽，共有16名女子參賽。",
  keywords: [
    "Sakura League",
    "sakuraleague",
    "sakuraleague2025",
    "2025",
    "麻雀",
    "mj",
    "mahjong",
    "mahjong sakuraleague",
    "日本麻雀",
    "日麻",
    "japan mahjong",
    "riichi",
    "riichimahjong",
    "riichi mahjong",
    "立直",
    "立直麻雀",
    "牌藝攻防",
    "牌藝",
    "hkmj",
    "香港麻雀協會",
    "hkma",
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
    <html lang="zh-TW" className={myFont.className}>
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
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

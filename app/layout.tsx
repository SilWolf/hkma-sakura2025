import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "香港麻雀協會 日本麻將隊際競技聯賽2024",
  description: "香港麻雀協會 日本麻將隊際競技聯賽2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <div className="max-w-[1920px] mx-auto relative">
          <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-transparent">
            <div className="py-6 text-center space-x-6">
              <a href="#">主頁</a>
              <a href="#">隊伍</a>
              <a href="#">聯賽賽制及規則</a>
              <a href="#">賽程</a>
              <a href="#">排名</a>
              <a href="#">過往對局</a>
              <a href="#">新手專區</a>
            </div>
          </div>

          {children}

          <section className="bg-[url('/images/bg-2.jpg')] bg-cover bg-center py-12">
            <div className="container mx-auto flex items-end">
              <div className="flex-1">
                <p className="text-left text-xl">
                  想搵人打日麻，或者想學日麻，但唔知可以去邊？
                </p>
                <p className="text-left text-3xl mt-3 mb-8">
                  嚟<strong>牌藝攻防</strong>啦！
                </p>
                <div className="space-x-2 [&_img]:inline-block [&_img]:w-48 [&_img]:h-48">
                  <a
                    href="https://www.instagram.com/mahjongbattlestadium/"
                    target="_blank"
                  >
                    <img src="/images/promo-1.jpg" alt="" />
                  </a>
                  <a
                    href="https://www.instagram.com/mahjongbattlestadium/"
                    target="_blank"
                  >
                    <img src="/images/promo-2.jpg" alt="" />
                  </a>
                  <a
                    href="https://www.instagram.com/mahjongbattlestadium/"
                    target="_blank"
                  >
                    <img src="/images/promo-3.jpg" alt="" />
                  </a>
                </div>
              </div>
              <div className="shrink-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14763.550415442012!2d114.15603226226305!3d22.32009013410011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401011be9d243%3A0x9875915e5dfb951c!2z6aaZ5riv6bq76ZuA5Y2U5pyD!5e0!3m2!1szh-TW!2shk!4v1703232237260!5m2!1szh-TW!2shk"
                  height="300"
                  className="aspect-video"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section>
        </div>
        <footer className="bg-neutral-900 text-neutral-400 hover:[&_a]:text-neutral-200 text-sm pt-16 pb-12">
          <div className="container mx-auto flex justify-between items-end">
            <div className="space-y-4 text-left">
              <div className="space-x-4">
                <span>主辦機構</span>
                <span>
                  <a href="https://www.hkmahjong.org/" target="_blank">
                    <img
                      className="h-16 inline-block"
                      src="/images/logo-hkma.webp"
                      alt="香港麻雀協會 Hong Kong Mahjong Association"
                    />
                  </a>
                </span>
              </div>
              <div className="space-x-4">
                <span>協辦機構</span>
                <span>
                  <img
                    className="h-16 inline-block"
                    src="/images/logo-hkmjbs.webp"
                    alt="牌藝攻防 Mahjong Battle Stadium"
                  />
                </span>
              </div>
            </div>
            <div className="text-right pb-6 space-y-4">
              <div className="space-x-2 text-right pr-1 text-2xl">
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
              <div className="space-x-6 text-right pr-1">
                <a href="#">聯賽章程</a>
                <a href="#">聯絡我們</a>
              </div>
              <p>©2024 by 香港麻雀協會 Hong Kong Mahjong Association.</p>
            </div>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}

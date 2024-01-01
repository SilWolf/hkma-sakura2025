import type { Metadata, Viewport } from "next";
import Menu from "./menu";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-[1920px] mx-auto relative">
        <Menu />

        {children}

        <section
          className="bg-[url('/images/bg-2.jpg')] text-neutral-900 bg-cover bg-center py-6"
          style={{ backgroundColor: "#3ae0a1" }}
        >
          <div className="container px-2 mx-auto flex flex-col lg:flex-row items-center sm:items-stretch gap-y-4">
            <div className="flex-1">
              <p className="text-center sm:text-left text-xl mb-2">
                想搵人打日麻，或者想學日麻，但唔知可以去邊？
              </p>
              <p className="text-center sm:text-left text-3xl mb-6">
                嚟<strong>牌藝攻防</strong>啦！
              </p>
              <div className="flex flex-col sm:flex-row gap-x-8 mb-4">
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/DYqaSQvAYiaBddft8"
                  className="text-lg underline"
                >
                  <i className="bi bi-geo-alt"></i>{" "}
                  香港九龍旺角道11號藝旺商業大廈13樓
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-8 mb-4">
                <a
                  target="_blank"
                  href="https://wa.me/85251818161"
                  className="text-lg underline"
                >
                  <i className="bi bi-whatsapp"></i> +852 5181 8161
                </a>
                <a
                  href="mailto:info@mahjongbs.com"
                  className="text-lg underline"
                >
                  <i className="bi bi-envelope-at"></i> info@mahjongbs.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-8 mb-8">
                <a
                  target="_blank"
                  href="https://www.instagram.com/mahjongbattlestadium/"
                  className="text-lg underline"
                >
                  <i className="bi bi-instagram"></i> @mahjongbattlestadium
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com/mahjongbs/"
                  className="text-lg underline"
                >
                  <i className="bi bi-facebook"></i> mahjongbs
                </a>
              </div>
              <div className="text-center sm:text-left space-x-2 [&_img]:inline-block [&_img]:w-28 [&_img]:h-28 sm:[&_img]:w-48 sm:[&_img]:h-48 lg:[&_img]:w-36 lg:[&_img]:h-36 xl:[&_img]:w-48 xl:[&_img]:h-48">
                <a
                  href="https://www.instagram.com/mahjongbattlestadium/"
                  target="_blank"
                  aria-label="週一至四日本麻雀聚會"
                >
                  <img src="/images/promo-1.jpg" alt="" />
                </a>
                <a
                  href="https://www.instagram.com/mahjongbattlestadium/"
                  target="_blank"
                  aria-label="週二四日麻新人教學"
                >
                  <img src="/images/promo-2.jpg" alt="" />
                </a>
                <a
                  href="https://www.instagram.com/mahjongbattlestadium/"
                  target="_blank"
                  aria-label="週五日本麻雀聚會"
                >
                  <img src="/images/promo-3.jpg" alt="" />
                </a>
              </div>
            </div>
            <div className="flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14763.550415442012!2d114.15603226226305!3d22.32009013410011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401011be9d243%3A0x9875915e5dfb951c!2z6aaZ5riv6bq76ZuA5Y2U5pyD!5e0!3m2!1szh-TW!2shk!4v1703232237260!5m2!1szh-TW!2shk"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="牌藝攻防地圖"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
      <footer className="text-neutral-300 hover:[&_a]:text-neutral-100 text-sm pt-16 pb-12">
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
    </>
  );
}

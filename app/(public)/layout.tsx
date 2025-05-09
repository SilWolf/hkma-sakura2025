import type { Metadata, Viewport } from "next";
import Menu from "./menu";
import "./public-layout.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="mx-auto relative bg-repeat-x"
        style={{
          backgroundImage: 'url("./images/bg-sakura.png")',
          minHeight: "calc(100vh - 160px)",
        }}
      >
        <div className="bg-white sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <img
                src="/images/logo-sakura-long.png"
                className="block mx-auto h-12 xl:h-16"
                alt="Sakura League"
              />
            </div>
            <div>
              <Menu />
            </div>
          </div>
        </div>

        {children}
      </div>

      <footer className="text-neutral-800 [&_a]:hover:text-neutral-700 text-sm pt-16 pb-12">
        <div className="container px-2 mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
          <div className="space-y-4 text-left">
            <div className="space-x-4">
              <span>主辦機構</span>
              <span>
                <a
                  href="https://mahjong-poly.mystrikingly.com/"
                  target="_blank"
                >
                  <img
                    className="h-10 sm:h-12 inline-block"
                    src="/images/logo-poly.webp"
                    alt="香港麻雀理工"
                  />
                </a>
              </span>
              <span>
                <a href="https://www.hkmahjong.org/" target="_blank">
                  <img
                    className="h-12 sm:h-16 inline-block"
                    src="/images/logo-hkma-black.png"
                    alt="香港麻雀協會 Hong Kong Mahjong Association"
                  />
                </a>
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {/* <div className="space-x-4 text-center md:text-right pr-1 text-2xl">
              <a
                href="https://www.youtube.com/@HKMAHJONG/streams"
                target="_blank"
                aria-label="Youtube"
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href="https://twitter.com/HK_League_MJ"
                target="_blank"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
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
            </div> */}
            {/* <div className="space-x-6 text-center md:text-right pr-1">
              <a href="mailto:Mahjongpoly@gmail.com">聯絡我們</a>
            </div> */}
            {/* <p className="text-center md:text-right">
              ©2025 by 香港麻雀協會 Hong Kong Mahjong Association.
            </p> */}
          </div>
        </div>
      </footer>
    </>
  );
}

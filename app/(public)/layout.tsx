import Menu from "./menu";
import "./public-layout.css";
import TeamScoreConflictBar from "./_widgets/TeamScoreConflictBar";
import { apiGetTournament } from "@/services/tournament.service";
import Link from "next/link";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { teams } = await apiGetTournament();

  return (
    <>
      <div
        className="mx-auto relative bg-repeat-x"
        style={{
          backgroundImage: 'url("./images/bg-sakura.png")',
          minHeight: "calc(100vh - 160px)",
        }}
      >
        <div className="sticky top-0 z-50">
          <div className="bg-white">
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <Link href="/">
                  <img
                    src="/images/logo-sakura-long.png"
                    className="block mx-auto h-12 laptop:h-16 relative z-50 pl-2 laptop:-pl-0"
                    alt="Sakura League"
                  />
                </Link>
              </div>
              <div>
                <Menu />
              </div>
            </div>
            <div>
              <TeamScoreConflictBar teamLeft={teams[0]} teamRight={teams[1]} />
            </div>
          </div>
        </div>

        {children}
      </div>

      <footer className="text-neutral-800 [&_a]:hover:text-neutral-700 text-sm pb-12">
        <div className="container mx-auto">
          <div className="space-y-4 text-left">
            <section className="w-full">
              <div className="container mx-auto px-4 flex flex-col laptop:flex-row gap-x-8 gap-y-4">
                <div>主辦機構</div>
                <div>
                  <span>
                    <a
                      href="https://mahjong-poly.mystrikingly.com/"
                      target="_blank"
                    >
                      <img
                        className="h-12 laptop:h-16 inline-block"
                        src="/images/logo-poly.webp"
                        alt="香港麻雀理工"
                      />
                    </a>
                  </span>
                  <p className="mt-[1em]">
                    <i className="bi bi-phone"></i> 電話：+852 5114 3454
                  </p>
                  <p>
                    <i className="bi bi-envelope"></i> 電郵：
                    <a
                      href="mailto:Mahjongpoly@gmail.com"
                      className="underline"
                    >
                      Mahjongpoly@gmail.com
                    </a>
                  </p>
                  <p>
                    <i className="bi bi-instagram"></i> Instagram：Mahjong.poly
                  </p>
                  <p>
                    <i className="bi bi-globe"></i> Website：
                    <a
                      href="https://mahjong-poly.mystrikingly.com"
                      className="underline"
                      target="_blank"
                    >
                      https://mahjong-poly.mystrikingly.com
                    </a>
                  </p>
                </div>
                <div>
                  <span>
                    <a href="https://www.hkmahjong.org/" target="_blank">
                      <img
                        className="h-12 laptop:h-16 inline-block"
                        src="/images/logo-hkma-black.png"
                        alt="香港麻雀協會 Hong Kong Mahjong Association"
                      />
                    </a>
                  </span>
                  <p className="mt-[1em]">
                    <i className="bi bi-phone"></i> 電話：+852 9410 1012
                  </p>
                  <p>
                    <i className="bi bi-envelope"></i> 電郵：
                    <a href="mailto:info@hkmahjong.org" className="underline">
                      info@hkmahjong.org
                    </a>
                  </p>
                  <p>
                    <i className="bi bi-instagram"></i> Instagram：hkmjassn
                  </p>
                  <p>
                    <i className="bi bi-globe"></i> Website：
                    <a
                      href="https://hkmahjong.org"
                      className="underline"
                      target="_blank"
                    >
                      https://hkmahjong.org
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}

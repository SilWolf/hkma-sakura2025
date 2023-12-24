import { getOldMatches, getTeams } from "@/helpers/sanity.helper";

export const revalidate = 900;

export default async function Home() {
  const teams = await getTeams();
  const oldMatches = await getOldMatches();

  return (
    <main>
      <section className="w-full text-center relative overflow-hidden">
        <div className="w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          {/* <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/Kp_UppkAiCk?si=Va0LX5hMdsdeQXzO&controls=0&start=1878&autoplay=1&mute=1&playsinline=1"
          ></iframe> */}
          <div className="grid grid-cols-4 lg:grid-cols-6 items-center justify-center text-center max-w-screen-xl mx-auto">
            {teams.map((team) => (
              <div key={team.slug}>
                <img
                  src={
                    (team.squareLogoImage ?? "/images/empty.png") + "?width=512"
                  }
                  className="w-48"
                  alt={team.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-40 pb-32 relative z-10">
          <h1 className="text-[96px] leading-[1.1em]">HK League 2024</h1>
          <h2 className="text-[32px]">香港麻雀協會 日本麻將隊際競技聯賽2024</h2>
          <div className="flex justify-center gap-x-2 mx-auto mt-8">
            <img
              className="h-20 py-2 px-4 bg-[#12141C]"
              src="/images/logo-hkma.webp"
              alt="香港麻雀協會 Hong Kong Mahjong Association"
            />
            <img
              className="h-20 py-2 px-4 bg-[#12141C]"
              src="/images/logo-hkmjbs.webp"
              alt="牌藝攻防 Mahjong Battle Stadium"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[url('/images/bg-3.jpg')] bg-cover bg-center">
        <div className="container mx-auto">
          <div className="flex justify-between items-center gap-x-2 mb-4">
            <h1 className="font-bold text-4xl shrink-0">常規賽 #01</h1>
            <div className="shrink-0 font-bold pl-2 pr-3 rounded-full bg-red-500">
              <i className="bi bi-record-fill"></i> LIVE
            </div>
            <div className="flex-1 text-right space-x-4">
              <img
                src="/images/logo-team1.webp"
                className="inline w-16 h-16"
                alt=""
              />
              <img
                src="/images/logo-team2.webp"
                className="inline w-16 h-16"
                alt=""
              />
              <img
                src="/images/logo-team3.webp"
                className="inline w-16 h-16"
                alt=""
              />
              <img
                src="/images/logo-team4.webp"
                className="inline w-16 h-16"
                alt=""
              />
            </div>
          </div>
          <div>
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/Kp_UppkAiCk?si=eXOxZCGAvv5TwRFY&mute=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto text-center grid grid-cols-2 gap-8">
          <div>
            <h2 className="font-bold text-[36px] mb-8">賽程</h2>
            <table className="w-full [&_img]:w-24 [&_img]:h-24 odd:[&_tr]:bg-[rgba(255,255,255,0.1)] [&_td]:py-2">
              <tbody>
                <tr>
                  <td>
                    <h3 className="font-bold text-lg">2023.12.32</h3>
                    <p>常規賽 #01</p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team1.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team2.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team3.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team4.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 className="font-bold text-lg">2023.12.33</h3>
                    <p>常規賽 #02</p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team5.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team6.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team7.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team8.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 className="font-bold text-lg">2023.12.34</h3>
                    <p>常規賽 #03</p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team9.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team10.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team11.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                  <td>
                    <img
                      src="/images/logo-team12.webp"
                      className="inline"
                      alt=""
                    />
                    <p>
                      1 <span className="text-xs">/60</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="font-bold text-[36px] mb-8">排名</h2>
            <table className="w-full [&_img]:w-12 [&_img]:h-12 odd:[&_tr]:bg-[rgba(255,255,255,0.1)] [&_td]:py-2">
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team1.webp" alt="" />
                  </td>
                  <td>Bad Beat</td>
                  <td>999.9</td>
                  <td>-</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team2.webp" alt="" />
                  </td>
                  <td>茶道研究院</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>3rd</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team3.webp" alt="" />
                  </td>
                  <td>皇家勇士 Royal Warriors</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>4th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team4.webp" alt="" />
                  </td>
                  <td>團結Forwards</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>5th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team5.webp" alt="" />
                  </td>
                  <td>桌遊旅人 BoardGameTraveller</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>6th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team6.webp" alt="" />
                  </td>
                  <td>一發放銃</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>7th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team7.webp" alt="" />
                  </td>
                  <td>阿嚕阿嚕</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>8th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team8.webp" alt="" />
                  </td>
                  <td>友聯</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>9th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team9.webp" alt="" />
                  </td>
                  <td>晉天晴朗</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>10th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team10.webp" alt="" />
                  </td>
                  <td>麻瓜</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>11th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team11.webp" alt="" />
                  </td>
                  <td>茶道研究院</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
                <tr>
                  <td>12th</td>
                  <td>
                    {" "}
                    <img src="/images/logo-team12.webp" alt="" />
                  </td>
                  <td>天地人和</td>
                  <td>999.9</td>
                  <td>0.0</td>
                  <td>
                    1 <span className="text-xs">/60</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[url('/images/bg-1.jpg')] bg-cover bg-center">
        <div className="container mx-auto flex justify-center items-center">
          <div className="shrink-0">
            <div className="grid grid-cols-5 gap-x-8 gap-y-12">
              <div></div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[0].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[1].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[2].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[3].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div></div>
              <div></div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[4].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[5].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center text-neutral-300 space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                至今為止最長賽程的香港日麻比賽
              </h3>
              <p>
                2024年1月-11月，共有十二隊隊伍角逐由
                <br />
                香港麻雀協會首次舉辦的日本麻將隊際聯賽冠軍
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">12支隊伍、48名選手</h3>
              <p>
                選手們喜愛日本麻將，更視之為一種專業
                <br />
                大家組成隊伍，藉此在聯賽中證明自己的努力
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">長達八個月的常規賽</h3>
              <p>
                八個月裡，每隊將進行多達60場半莊
                <br />
                被降低的運氣性及多元的對局組合，將使排名更有意義
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">最終只為決定一支勝隊</h3>
              <p>
                六支隊伍進入合計18場半莊的準決賽
                <br />
                四支隊伍進入合計8場半莊的總決賽
                <br />
                最終勝出者將實至名歸
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="grid grid-cols-5 gap-x-8 gap-y-12">
              <div className="col-span-2">
                <img
                  src={
                    (teams[6].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[7].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div></div>
              <div></div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[8].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[9].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[10].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <img
                  src={
                    (teams[11].squareLogoImage ?? "/images/empty.png") +
                    "?width=320"
                  }
                  className="w-40 h-40"
                  alt=""
                />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="mb-4">
              <i className="bi bi-calendar2-week text-[64px]"></i>
            </div>
            <h2 className="font-bold text-[28px] mb-2">116場半莊的大型聯賽</h2>
            <p>
              所有隊伍在經過總計90場半莊的常規賽後，
              <br />
              排名最高的六隊及四隊，依序進入
              <br />
              共有26場半莊的準決賽和總決賽。
            </p>
          </div>
          <div>
            <div className="mb-4">
              <i className="bi bi-camera-reels text-[64px]"></i>
            </div>
            <h2 className="font-bold text-[28px] mb-2">全程直播所有賽事</h2>
            <p>
              廣東話旁述、清晰的分數變化及顯示，
              <br />在 Youtube 及 Bilibili 上播放。
            </p>
          </div>
          <div>
            <div className="mb-4">
              <i className="bi bi-person-up text-[64px]"></i>
            </div>
            <h2 className="font-bold text-[28px] mb-2">選手賽後訪問</h2>
            <p>
              觀摩強者打法、學習更豐富的日麻思路，
              <br />
              無論新手或老手都能在日本麻雀競技上取得進步。
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-bold text-[36px]">過往對局</h2>
            <p className="pr-2">
              <a href="#">觀看全部對局 &gt;</a>
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {oldMatches.map((match) => (
              <a
                className="block"
                href={match.youtubeUrl ?? "#"}
                target="_blank"
                key={match._id}
              >
                <div className="bg-neutral-800 rounded aspect-video">
                  {match.youtubeThumbnailUrl && (
                    <img
                      src={match.youtubeThumbnailUrl}
                      className="w-full rounded aspect-video"
                      alt=""
                    />
                  )}
                </div>
                <div className="flex justify-between items-center pr-1 mt-1">
                  <div>
                    <p>{match.name}</p>
                    <p className="text-sm text-neutral-300">
                      {match.startAt?.substring(0, 10)}
                    </p>
                  </div>
                  <div>
                    <img
                      src={
                        match.playerEast.team.squareLogoImage ??
                        "/images/empty.png"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                    <img
                      src={
                        match.playerSouth.team.squareLogoImage ??
                        "/images/empty.png"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                    <img
                      src={
                        match.playerWest.team.squareLogoImage ??
                        "/images/empty.png"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                    <img
                      src={
                        match.playerNorth.team.squareLogoImage ??
                        "/images/empty.png"
                      }
                      className="inline w-10 h-10"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto">
          <h2 className="font-bold text-[36px] mb-8">新手專區</h2>
          <p>（Dicky: 想放新手教學既文章、友站連結、Youtube片之類，求提供）</p>
        </div>
      </section>
    </main>
  );
}

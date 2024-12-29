import { MatchDTO, getMatch } from "@/helpers/sanity.helper";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";

export const dynamic = "force-dynamic";

const render = (match: MatchDTO) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background:
        "linear-gradient(to bottom, rgb(30, 34, 59), rgb(16, 18, 33))",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      fontFamily: "Noto Sans",
      fontWeight: 400,
      color: "#FFFFFF",
      fontSize: "16px",
      padding: "2em",
    }}
  >
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="https://hkleague2025.hkmahjong.org/images/logo.png"
          width={128}
          height={128}
          alt=""
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Noto Serif",
              fontSize: "4em",
              lineHeight: ".8em",
              marginLeft: "0.125em",
            }}
          >
            HK-League 2025
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "1.5em",
              marginLeft: ".3em",
              textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
            }}
          >
            香港麻雀協會
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "1.5em",
              marginLeft: ".3em",
              textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
            }}
          >
            香港立直麻雀團體聯賽2025
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <div style={{ display: "flex" }}>主辦機構</div>
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              src="https://hkleague2025.hkmahjong.org/images/logo-hkma.png"
              width={212}
              height={64}
              alt=""
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <div style={{ display: "flex" }}>場地提供</div>
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              src="https://hkleague2025.hkmahjong.org/images/logo-hkmjbs.png"
              width={155}
              height={64}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        fontSize: "3em",
        fontWeight: 600,
      }}
    >
      <div style={{ display: "flex", marginTop: "0.5em" }}>
        {match.startAt.substring(0, 10)} 出戰隊伍
      </div>
    </div>

    {(
      [
        [match._order[0], match._order[1]],
        [match._order[2], match._order[3]],
      ] as const
    ).map((group, groupI) => (
      <div
        key={groupI}
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          fontSize: "2em",
          lineHeight: "1em",
          fontWeight: 600,
          textAlign: "center",
          marginLeft: "4em",
          marginRight: "4em",
        }}
      >
        {group.map((key) => (
          <div
            key={key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              flex: 1,
              padding: "0.75em 2em 0.75em 2em",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "absolute",
                background: `linear-gradient(to bottom, transparent, ${match[key].color})`,
                opacity: 0.5,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            ></div>

            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <img
                style={{
                  width: "100%",
                }}
                src={`${match[key].teamLogoImageUrl + "?w=800&h=800&fm=png"}`}
                alt=""
              />
            </div>
            <div style={{ display: "flex" }}>{match[key].teamName}</div>
            <div
              style={{
                display: "flex",
                fontSize: "0.75em",
                height: "1.75em",
              }}
            >
              {match[key].teamSecondaryName || " "}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "0.5em",
                marginTop: "0.5em",
              }}
            >
              {match[key].playerFullname}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) => {
  const [
    NotoSansRegular,
    NotoSansSemiBold,
    NotoSerifSemiBold,
    KdamThmorProRegular,
    match,
  ] = await Promise.all([
    fetch(
      "https://hkleague2025.hkmahjong.org/fonts/NotoSansTC-Regular.ttf"
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2025.hkmahjong.org/fonts/NotoSansTC-SemiBold.ttf`
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2025.hkmahjong.org/fonts/NotoSerif-SemiBold.ttf`
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2025.hkmahjong.org/fonts/KdamThmorPro-Regular.ttf`
    ).then((res) => res.arrayBuffer()),
    getMatch((await params).matchId),
  ]);

  return new ImageResponse(render(match), {
    width: 1080,
    height: 1080,
    fonts: [
      {
        name: "Noto Sans",
        data: NotoSansRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Noto Sans",
        data: NotoSansSemiBold,
        weight: 600,
        style: "normal",
      },
      {
        name: "Noto Serif",
        data: NotoSerifSemiBold,
        weight: 600,
        style: "normal",
      },
      {
        name: "Kdam Thmor Pro",
        data: KdamThmorProRegular,
        weight: 400,
        style: "normal",
      },
    ],
    debug: false,
    status: 200,
  });
};

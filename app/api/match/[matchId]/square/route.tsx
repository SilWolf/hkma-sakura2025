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
      lineHeight: "1em",
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
          src="https://hkleague2024.hkmahjong.org/images/logo.png"
          width={128}
          height={128}
          alt=""
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontFamily: "Noto Serif",
              fontSize: "4em",
              lineHeight: ".5em",
              marginLeft: "0.125em",
            }}
          >
            HK-League 2024
          </p>
          <p
            style={{
              fontSize: "1.5em",
              lineHeight: "1px",
              marginLeft: ".3em",
              textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
            }}
          >
            香港麻雀協會
          </p>
          <p
            style={{
              fontSize: "1.5em",
              lineHeight: "1px",
              marginLeft: ".3em",
              textShadow: "#00000080 0 0 1em, #00000080 0 0 0.5em",
            }}
          >
            香港立直麻雀團體聯賽2024
          </p>
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
          <p>主辦機構</p>
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              src="https://hkleague2024.hkmahjong.org/images/logo-hkma.png"
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
          <p>場地提供</p>
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              src="https://hkleague2024.hkmahjong.org/images/logo-hkmjbs.png"
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
        fontSize: "4em",
        lineHeight: ".1em",
        fontWeight: 600,
      }}
    >
      <p>{match.startAt.substring(0, 10)} 出戰隊伍</p>
    </div>

    <div
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
      {(["playerEast", "playerSouth"] as const).map((key) => (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "relative",
            flex: 1,
            paddingLeft: "2em",
            paddingRight: "2em",
            paddingBottom: "1em",
            gap: "-1em",
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
          <p
            style={{
              height: "2em",
            }}
          >
            {match[key].teamName}
          </p>
        </div>
      ))}
    </div>

    <div
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
      {(["playerWest", "playerNorth"] as const).map((key) => (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "relative",
            flex: 1,
            paddingLeft: "2em",
            paddingRight: "2em",
            paddingBottom: "1em",
            gap: "-1em",
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
          <p
            style={{
              height: "2em",
            }}
          >
            {match[key].teamName}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const GET = async (
  request: NextRequest,
  { params }: { params: { matchId: string } }
) => {
  const [
    NotoSansRegular,
    NotoSansSemiBold,
    NotoSerifSemiBold,
    KdamThmorProRegular,
    match,
  ] = await Promise.all([
    fetch(
      "https://hkleague2024.hkmahjong.org/fonts/NotoSansTC-Regular.ttf"
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2024.hkmahjong.org/fonts/NotoSansTC-SemiBold.ttf`
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2024.hkmahjong.org/fonts/NotoSerif-SemiBold.ttf`
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2024.hkmahjong.org/fonts/KdamThmorPro-Regular.ttf`
    ).then((res) => res.arrayBuffer()),
    getMatch(params.matchId),
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

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";
import { getMatchByDateAndIndex } from "../../..";
import { Match } from "@/types/index.type";

export const dynamic = "force-dynamic";

const render = (match: Match) => (
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
      padding: "2em 4em 0 4em",
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
          <div
            style={{
              display: "flex",
            }}
          >
            主辦機構
          </div>
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
          <div
            style={{
              display: "flex",
            }}
          >
            場地提供
          </div>
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
      <div
        style={{ display: "flex", marginTop: "0.85em", marginBottom: "0.35em" }}
      >
        {match.name} 出戰隊伍
      </div>
    </div>

    <div
      style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        fontSize: "2em",
        fontWeight: 600,
        textAlign: "center",
      }}
    >
      {(
        [
          {
            team: match.playerEastTeam!,
            player: match.playerEast!,
          },
          {
            team: match.playerSouthTeam!,
            player: match.playerSouth!,
          },
          {
            team: match.playerWestTeam!,
            player: match.playerWest!,
          },
          {
            team: match.playerNorthTeam!,
            player: match.playerNorth!,
          },
        ] as const
      ).map(({ team, player }) => (
        <div
          key={team._id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              background: `linear-gradient(to bottom, transparent, ${team.color})`,
              justifyContent: "flex-start",
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
              src={`${team.squareLogoImage + "?w=800&h=800&fm=png"}`}
              alt=""
            />
          </div>
          <div style={{ display: "flex" }}>{team.name}</div>
          <div
            style={{
              display: "flex",
              fontSize: "0.75em",
              height: "1.25em",
            }}
          >
            {team.secondaryName || " "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "0.5em",
              height: "4.5em",
            }}
          >
            <div style={{ display: "flex" }}>
              {player.player.name}
              {player.player.nickname && ` (${player.player.nickname})`}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ date: string; index: string }> }
) => {
  try {
    const { date, index } = await params;
    const match = await getMatchByDateAndIndex(date, parseInt(index));

    const [
      NotoSansRegular,
      NotoSansSemiBold,
      NotoSerifSemiBold,
      KdamThmorProRegular,
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
    ]);

    return new ImageResponse(render(match), {
      width: 1280,
      height: 720,
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
  } catch (e) {
    return Response.json({
      success: false,
      error: e,
    });
  }
};

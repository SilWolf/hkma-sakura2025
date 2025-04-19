import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";
import { getMatchByWeek } from "../..";
import { renderWeekday } from "@/helpers/string.helper";
import { getRegularTeams } from "@/helpers/sanity.helper";
import { Team } from "@/types/index.type";

export const dynamic = "force-dynamic";

const render = (
  matchGroups: Awaited<ReturnType<typeof getMatchByWeek>>,
  teamSorter: (a: Team, b: Team) => number
) => (
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
            Sakura League 2025
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
            香港女子立直麻雀聯賽2025
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
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        fontSize: "2em",
        fontWeight: 600,
        textAlign: "center",
        gap: ".5em",
      }}
    >
      {matchGroups.map(({ date, weekday, matches }) => (
        <div
          key={date}
          style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: ".5em",
            gap: ".5em",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexShrink: 0,
              whiteSpace: "nowrap",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: ".5em",
              minWidth: "4.5em",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "1.5em",
                fontWeight: 600,
              }}
            >
              {date.substring(8, 10)}/{date.substring(5, 7)}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "1em",
                fontWeight: 600,
              }}
            >
              ({renderWeekday(weekday)})
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            {[
              matches[0].playerEastTeam!,
              matches[0].playerSouthTeam!,
              matches[0].playerWestTeam!,
              matches[0].playerNorthTeam!,
            ]
              .sort(teamSorter)
              .map((team) => (
                <div
                  key={team._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    alignItems: "center",
                    background: `linear-gradient(to bottom, transparent, ${team.color}80)`,
                  }}
                >
                  <img
                    width={150}
                    height={150}
                    src={team.squareLogoImage + "?w=512&auto=format"}
                    alt={team.name}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ week: string }> }
) => {
  try {
    const { week } = await params;
    const matchGroups = await getMatchByWeek(parseInt(week));

    const teamSorter = await getRegularTeams().then(
      (teams) => (a: Team, b: Team) => {
        const indexOfA = teams.findIndex((item) => item.team._id === a._id);
        const indexOfB = teams.findIndex((item) => item.team._id === b._id);

        return indexOfB - indexOfA;
      }
    );

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

    return new ImageResponse(render(matchGroups, teamSorter), {
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
      error: (e as Error).message,
    });
  }
};

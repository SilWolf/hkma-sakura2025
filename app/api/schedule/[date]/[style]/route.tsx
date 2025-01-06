import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";
import { getMatchesByDate } from "../..";
import { Match, Player, Team } from "@/types/index.type";
import { getRegularTeams } from "@/helpers/sanity.helper";

export const dynamic = "force-dynamic";

const thumbnailRender = (
  match: Match,
  teamAndPlayers: { team: Team; players: Player[] }[]
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
        {match.name.substring(0, match.name.lastIndexOf("-"))} 出戰隊伍
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
      {teamAndPlayers.map(({ team, players }) => (
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
            {players.map((player) => (
              <div key={player._id} style={{ display: "flex" }}>
                {player.name}
                {player.nickname && ` (${player.nickname})`}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const squareRender = (
  match: Match,
  teamAndPlayers: { team: Team; players: Player[] }[]
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
        {match.name.substring(0, match.name.lastIndexOf("-"))} 出戰隊伍
      </div>
    </div>

    {(
      [
        [teamAndPlayers[0], teamAndPlayers[1]],
        [teamAndPlayers[2], teamAndPlayers[3]],
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
        {group.map(({ team, players }) => (
          <div
            key={team._id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              flex: 1,
              padding: "0.75em 2em 0 2em",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "absolute",
                background: `linear-gradient(to bottom, transparent, ${team.color})`,
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
                height: "1em",
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
              {players.map((player) => (
                <div key={player._id} style={{ display: "flex" }}>
                  {player.name}
                  {player.nickname && ` (${player.nickname})`}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      date: string;
      style: "square" | "thumbnail";
    }>;
  }
) => {
  try {
    const { date, style } = await params;
    if (style !== "square" && style !== "thumbnail") {
      throw new Error(
        'style must be "square" or "thumbnail", e.g. 2025-01-01/square'
      );
    }

    const regularTeamIds = await getRegularTeams().then((rts) =>
      rts.map((rt) => rt._key)
    );

    const matches = await getMatchesByDate(date);
    const sortedTeamIds = [
      matches[0].playerEastTeam!._id,
      matches[0].playerSouthTeam!._id,
      matches[0].playerWestTeam!._id,
      matches[0].playerNorthTeam!._id,
    ].sort((a, b) => regularTeamIds.indexOf(b) - regularTeamIds.indexOf(a));

    const teamAndPlayersGroupedByTeamId: Record<
      string,
      { team: Team; players: Player[] }
    > = {
      [matches[0].playerEastTeam!._id]: {
        team: matches[0].playerEastTeam!,
        players: [],
      },
      [matches[0].playerSouthTeam!._id]: {
        team: matches[0].playerSouthTeam!,
        players: [],
      },
      [matches[0].playerWestTeam!._id]: {
        team: matches[0].playerWestTeam!,
        players: [],
      },
      [matches[0].playerNorthTeam!._id]: {
        team: matches[0].playerNorthTeam!,
        players: [],
      },
    };

    for (let i = 0; i < matches.length; i++) {
      if (
        matches[i].playerEast &&
        teamAndPlayersGroupedByTeamId[
          matches[i].playerEastTeam!._id
        ].players.findIndex(
          (item) => item._id === matches[i].playerEast?._id
        ) === -1
      ) {
        teamAndPlayersGroupedByTeamId[
          matches[i].playerEastTeam!._id
        ].players.push(matches[i].playerEast!);
      }

      if (
        matches[i].playerSouth &&
        teamAndPlayersGroupedByTeamId[
          matches[i].playerSouthTeam!._id
        ].players.findIndex(
          (item) => item._id === matches[i].playerSouth?._id
        ) === -1
      ) {
        teamAndPlayersGroupedByTeamId[
          matches[i].playerSouthTeam!._id
        ].players.push(matches[i].playerSouth!);
      }

      if (
        matches[i].playerWest &&
        teamAndPlayersGroupedByTeamId[
          matches[i].playerWestTeam!._id
        ].players.findIndex(
          (item) => item._id === matches[i].playerWest?._id
        ) === -1
      ) {
        teamAndPlayersGroupedByTeamId[
          matches[i].playerWestTeam!._id
        ].players.push(matches[i].playerWest!);
      }

      if (
        matches[i].playerNorth &&
        teamAndPlayersGroupedByTeamId[
          matches[i].playerNorthTeam!._id
        ].players.findIndex(
          (item) => item._id === matches[i].playerNorth?._id
        ) === -1
      ) {
        teamAndPlayersGroupedByTeamId[
          matches[i].playerNorthTeam!._id
        ].players.push(matches[i].playerNorth!);
      }
    }

    const payload = [
      matches[0].playerEastTeam!._id,
      matches[0].playerSouthTeam!._id,
      matches[0].playerWestTeam!._id,
      matches[0].playerNorthTeam!._id,
    ]
      .sort((a, b) => regularTeamIds.indexOf(b) - regularTeamIds.indexOf(a))
      .map((teamId) => teamAndPlayersGroupedByTeamId[teamId]);

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

    const renderFn = style === "thumbnail" ? thumbnailRender : squareRender;
    const parameters =
      style === "thumbnail"
        ? {
            width: 1280,
            height: 720,
          }
        : {
            width: 1080,
            height: 1080,
          };

    return new ImageResponse(renderFn(matches[0], payload), {
      ...parameters,
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

import { MatchDTO, getMatch } from "@/helpers/sanity.helper";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";
import { MatchDTOForSocial, getMatchByDateAndIndex } from "../..";

export const dynamic = "force-dynamic";

const render = (match: MatchDTOForSocial, index: string) => (
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
        gap: "2em",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <img
          src="https://hkleague2024.hkmahjong.org/images/logo.png"
          style={{
            width: "100%",
          }}
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            fontSize: "3em",
            fontWeight: 600,
            alignSelf: "center",
          }}
        >
          {match.name} 第{index}回戰
        </div>

        {(
          [
            ["playerEast", "playerSouth"],
            ["playerWest", "playerNorth"],
          ] as const
        ).map((group, groupI) => (
          <div
            key={groupI}
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {group.map((key) => (
              <img
                key={key}
                style={{
                  flex: 1,
                }}
                src={`${match[key].teamLogoImageUrl + "?w=800&h=800&fm=png"}`}
                alt=""
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const GET = async (
  request: NextRequest,
  { params }: { params: { date: string; index: string } }
) => {
  try {
    const match = await getMatchByDateAndIndex(params.date, "1");

    const [
      NotoSansRegular,
      NotoSansSemiBold,
      NotoSerifSemiBold,
      KdamThmorProRegular,
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
    ]);

    return new ImageResponse(render(match, params.index), {
      width: 1200,
      height: 900,
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

import { ImageResponse } from "next/og";
import React from "react";

const ImageElement = (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: "#F00",
    }}
  ></div>
);

export const GET = async () => {
  const [
    NotoSansRegular,
    NotoSansSemiBold,
    NotoSerifSemiBold,
    KdamThmorProRegular,
  ] = await Promise.all([
    fetch(
      "https://hkleague2024.hkmahjong.org/public/fonts/NotoSansTC-Regular.ttf"
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2024.hkmahjong.org/public/fonts/NotoSansTC-SemiBold.ttf`
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2024.hkmahjong.org/public/fonts/NotoSerif-SemiBold.ttf`
    ).then((res) => res.arrayBuffer()),
    fetch(
      `https://hkleague2024.hkmahjong.org/public/fonts/KdamThmorPro-Regular.ttf`
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(ImageElement, {
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

    status: 200,
  });
};

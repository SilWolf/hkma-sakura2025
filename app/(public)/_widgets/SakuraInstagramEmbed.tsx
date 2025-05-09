"use client";

import { InstagramEmbed } from "react-social-media-embed";

export default function SakuraInstagramEmbed() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed
        url="https://www.instagram.com/hk_sakura_league/"
        width="100%"
      />
    </div>
  );
}

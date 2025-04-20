const PLAYERS = [
  {
    name: {
      display: "校花",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/4.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/4.png",
      },
    },
  },
  {
    name: {
      display: "校園神犬",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/6.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/6.png",
      },
    },
  },
  {
    name: {
      display: "Louis",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/5.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/5.png",
      },
    },
  },
  {
    name: {
      display: "Kelly",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/10.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/10.png",
      },
    },
  },
  {
    name: {
      display: "Cry桃",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/1.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/1.png",
      },
    },
  },
  {
    name: {
      display: "Krystal",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/2.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/2.png",
      },
    },
  },
  {
    name: {
      display: "Eris",
    },
    playerType: "hklplayer" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/8.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/8.png",
      },
    },
  },
  {
    name: {
      display: "Evelyn",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/3.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/3.png",
      },
    },
  },
  {
    name: {
      display: "Momo",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/9.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/9.png",
      },
    },
  },
  {
    name: {
      display: "大炮喵喵",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/11.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/11.png",
      },
    },
  },
  {
    name: {
      display: "Hazel",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/13.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/13.png",
      },
    },
  },
  {
    name: {
      display: "芙蓮",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/12.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/12.png",
      },
    },
  },
  {
    name: {
      display: "Cabo",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/14.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/14.png",
      },
    },
  },
  {
    name: {
      display: "Hennessy",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/15.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/15.png",
      },
    },
    infos: [{ label: "", content: "" }],
  },
  {
    name: {
      display: "Ser-Ser",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/16.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/16.png",
      },
    },
  },
  {
    name: {
      display: "YOKI",
    },
    playerType: "challenger" as const,
    portrait: {
      default: {
        url: "/images/players/portraits/7.png",
      },
    },
    fullbody: {
      default: {
        url: "/images/players/fullbodys/7.png",
      },
    },
  },
];

export default PLAYERS;

export type SakuraPlayer = (typeof PLAYERS)[number];

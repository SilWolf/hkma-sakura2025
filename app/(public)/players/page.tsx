import {
  getPlayersGroupByTeams,
  getRegularTeams,
  getRegularTeamsWithPlayers,
  getTeams,
} from "@/helpers/sanity.helper";
import { Metadata } from "next";
import Link from "next/link";

const PLAYERS = [
  {
    name: {
      display: "Cry桃",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/1.png",
      },
    },
  },
  {
    name: {
      display: "Krystal",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/2.png",
      },
    },
  },
  {
    name: {
      display: "Evelyn",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/3.png",
      },
    },
  },
  {
    name: {
      display: "校花",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/4.png",
      },
    },
  },
  {
    name: {
      display: "Louis",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/5.png",
      },
    },
  },
  {
    name: {
      display: "校園神犬",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/6.png",
      },
    },
  },
  {
    name: {
      display: "YOKI",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/7.png",
      },
    },
  },
  {
    name: {
      display: "Eris",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/8.png",
      },
    },
  },
  {
    name: {
      display: "Momo",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/9.png",
      },
    },
  },
  {
    name: {
      display: "Sammi",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/10.png",
      },
    },
  },
  {
    name: {
      display: "大炮喵喵",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/11.png",
      },
    },
  },
  {
    name: {
      display: "芙蓮",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/12.png",
      },
    },
  },
  {
    name: {
      display: "Hazel",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/13.png",
      },
    },
  },
  {
    name: {
      display: "Cabo",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/14.png",
      },
    },
  },
  {
    name: {
      display: "Hennessy",
    },
    portrait: {
      default: {
        url: "/images/players/portraits/15.png",
      },
    },
  },
];

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "參賽選手",
};

export default async function Teams() {
  const tournamentTeams = await getRegularTeamsWithPlayers();

  return (
    <main className="relative">
      <section className="pt-10 pb-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          參賽選手
        </h2>
      </section>

      <section className="container mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {PLAYERS.map((player) => (
            <div key={player.name.display} className="relative">
              <img
                src="/images/logo-sakura-notext.png"
                className="absolute opacity-50 -z-10"
              />
              <img
                className="rounded-full"
                src={player.portrait.default.url}
                alt={player.name.display}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white rounded-full ml-2 px-12 py-0.5 text-[28px] text-center">
                <img
                  src="/images/sakura-icon-64x64.png"
                  className="absolute -left-2 top-0 w-12 h-12"
                  alt="*"
                />
                <span>{player.name.display}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

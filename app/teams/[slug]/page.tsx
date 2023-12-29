import { getTeamDetailBySlug, getTeamSlugs } from "@/helpers/sanity.helper";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 900;

export async function generateStaticParams() {
  return getTeamSlugs();
}

export default async function TeamDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const team = await getTeamDetailBySlug(slug);

  if (!team) {
    return notFound();
  }

  return (
    <main className="relative">
      <section className="pt-16 md:pt-8 pb-4">
        <div className="container max-w-screen-md mx-auto px-2 space-x-2 text-sm">
          <Link className="opacity-80" href="/teams">
            聯賽隊伍
          </Link>
          <span>&gt;</span>
          <span>{team.name}</span>
        </div>
      </section>

      <section
        className="py-12 w-full text-center"
        style={{
          background: `linear-gradient(to bottom, ${team.color}2D, transparent)`,
        }}
      >
        <div className="container mx-auto max-w-screen-md px-2">
          <img
            src={team.squareLogoImage ?? "/images/empty.png"}
            className="w-64 h-64 mx-auto"
            alt=""
          />
          <h2
            className="mt-12 text-[48px] font-bold border-y py-1"
            style={{
              borderColor: team.color,
              backgroundColor: `${team.color}2D`,
            }}
          >
            {team.name}
          </h2>
          <p className="text-center text-[16px] leading-[28px] mt-12 md:px-8 whitespace-pre-wrap">
            {team.description}
          </p>
        </div>
      </section>

      {team.players.map((player) => (
        <section key={player._id} className="py-12">
          <div className="container mx-auto max-w-screen-md px-2">
            <div className="flex gap-2 md:gap-12 items-center">
              <div className="flex-1">
                <h3 className="font-bold text-xl">
                  {player.name} ({player.nickname})
                </h3>
                <p className="mt-2">天鳳X段 | 麻齡 10年</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-4 mt-4">
              <div className="col-span-2">
                <table className="w-full text-center">
                  <thead>
                    <tr className="bg-neutral-800 text-white">
                      <th>對戰成續</th>
                      <th>得分</th>
                      <th>順位</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div>
                <table className="w-full text-center">
                  <thead>
                    <tr className="bg-neutral-800 text-white">
                      <th>平均打點</th>
                      <th>平均順位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

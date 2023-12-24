import { getTeamDetailBySlug, getTeamSlugs } from "@/helpers/sanity.helper";

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
    return <></>;
  }

  return (
    <main className="py-20 relative">
      <section
        className="py-12 w-full text-center"
        style={{
          background: `linear-gradient(to bottom, ${team.color}2D, transparent)`,
        }}
      >
        <div className="container mx-auto max-w-screen-md">
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
          <p className="text-center text-[16px] leading-[28px] mt-12 px-8 whitespace-pre-wrap">
            {team.description}
          </p>
        </div>
      </section>

      {team.players.map((player) => (
        <section key={player._id} className="py-12">
          <div className="container mx-auto max-w-screen-md">
            <div className="flex gap-12 items-center">
              <div className="shrink-0">
                <img
                  className="aspect-square w-36 rounded-full border"
                  style={{
                    borderColor: team.color,
                    backgroundColor: `${team.color}2D`,
                  }}
                  src={
                    player.portraitImage +
                    "?w=360&h=360&fit=crop&crop=top&auto=format"
                  }
                  alt={player.name}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl">{player.name}</h3>
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

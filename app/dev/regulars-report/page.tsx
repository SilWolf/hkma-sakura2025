import {
  getAllPlayersWithStat,
  getMatch,
  getMatchesGroupedByStageAndDate,
  getPlayersGroupByTeams,
  getRegularTeams,
  MatchDTO,
} from "@/helpers/sanity.helper";
import {
  renderDate,
  renderMatchCode,
  renderPercentage,
  renderPoint,
  renderRanking,
  renderScore,
} from "@/helpers/string.helper";
import { PropsWithChildren } from "react";

const VIOLATIONS = [
  // {
  //   date: "9 Jan",
  //   matchCode: "Pre01-02",
  //   violator: "阿嚕阿嚕 - Leo",
  //   category: "違規曝露",
  //   result: "黃牌",
  //   description: "違規曝露兩張手牌（不包括捨牌）。",
  // },
  // {
  //   date: "9 Jan",
  //   matchCode: "Pre01-02",
  //   violator: "阿嚕阿嚕 - Leo",
  //   category: "違規曝露",
  //   result: "黃牌；兩黃一紅，扣30分",
  //   description: "違規曝露兩張手牌（不包括捨牌）。",
  // },
  {
    date: "10 Jan",
    matchCode: "Pre02-02",
    violator: "Theory - Henry",
    category: "擾亂牌局 - 強打（舊）",
    result: "黃牌",
    description: "6次被觀察到的強打。",
  },
  {
    date: "11 Jan",
    matchCode: "Pre03-01",
    violator: "茶道研究院 - Sammi",
    category: "遮擋鏡頭",
    result: "黃牌",
    description: "數次被觀察到的遮擋鏡頭。",
  },
  {
    date: "11 Jan",
    matchCode: "Pre03-02",
    violator: "桌遊旅人 - 流星",
    category: " 小相公",
    result: "和了禁止",
    description: "先切牌：未摸頭牌，按「小相公」處理。",
  },
  {
    date: "11 Jan",
    matchCode: "Pre03-02",
    violator: "桌遊旅人 - 流星",
    category: "擾亂牌局",
    result: "黃牌",
    description: "違規自行修正「小相公」錯誤。",
  },
  {
    date: "16 Jan",
    matchCode: "Pre04-02",
    violator: "麻瓜 - Marcus",
    category: "小相公",
    result: "和了禁止",
    description: "先切牌：未摸頭牌，按「小相公」處理。",
  },
  {
    date: "17 Jan",
    matchCode: "Pre05-02",
    violator: "天地人和 - Justin",
    category: "擾亂牌局 - 強打（舊）",
    result: "黃牌",
    description: "6次被觀察到的強打。",
  },
  {
    date: "18 Jan",
    matchCode: "Pre06-02",
    violator: "Theory - Henry",
    category: "擾亂牌局 - 強打（舊）",
    result: "黃牌",
    description: "6次被觀察到的強打。",
  },
  {
    date: "24 Jan",
    matchCode: "Pre08-01",
    violator: "天地人和 - Justin",
    category: "違規曝露",
    result: "黃牌",
    description: "違規曝露兩張牌山牌。",
  },
  {
    date: "24 Jan",
    matchCode: "Pre08-01",
    violator: "天地人和 - Justin",
    category: "擾亂牌局 - 強打（舊）",
    result: "黃牌；兩黃一紅，扣30分",
    description: "6次被觀察到的強打。",
  },
  {
    date: "24 Jan",
    matchCode: "Pre08-01",
    violator: "阿嚕阿嚕 - Rex",
    category: "擾亂牌局 - 強打（舊）",
    result: "黃牌",
    description: "6次被觀察到的強打。",
  },
  {
    date: "25 Jan",
    matchCode: "Pre09-01",
    violator: "桌遊旅人 - 流星",
    category: "小相公",
    result: "和了禁止",
    description: "先切牌：未摸頭牌，按「小相公」處理。",
  },
  {
    date: "27 Jan",
    matchCode: "Voided",
    violator: "一發放銃 - Bear",
    category: "不正當競技行為",
    result: "隊伍取消資格",
    description:
      "未經授權下，私自翻開機檯牌槽，將配牌槽及牌山的牌更換成預先安排的組合。蓄意欺瞞裁判組。",
  },
  {
    date: "1 Feb",
    matchCode: "Pre09N-02",
    violator: "Bad Beat - PC",
    category: "違規曝露／摸錯牌",
    result: "無判罰",
    description:
      "摸錯王牌；該牌實際不可被摸取的王牌棟的牌，按「違規曝露」處理，一張免罰。",
  },
  {
    date: "6 Feb",
    matchCode: "Pre13-02",
    violator: "Theory - 亨利",
    category: "摸錯牌",
    result: "黃牌",
    description: "摸錯牌；該牌實際為牌山上靠後順序的牌。",
  },
  {
    date: "7 Feb",
    matchCode: "Pre14-01",
    violator: "晉天晴朗 - Ching",
    category: "小相公",
    result: "和了禁止",
    description: "先切牌：未摸頭牌，按「小相公」處理。",
  },
  {
    date: "7 Feb",
    matchCode: "Pre14-01",
    violator: "桌遊旅人 - 查理",
    category: "行為不恰當",
    result: "警告",
    description: "判決挑戰成功，有可疑冒犯行為，原裁判無判罰，追判警告。",
  },
  {
    date: "8 Feb",
    matchCode: "Pre15-01",
    violator: "Bad Beat - Zia",
    category: "摸錯牌",
    result: "無判罰",
    description: "摸錯牌；該牌實際為牌山上靠後順序的牌，選手未揭看，免罰更正。",
  },
  {
    date: "13 Feb",
    matchCode: "Pre16-01",
    violator: "Fukurou Reds - Benny",
    category: "摸錯牌",
    result: "黃牌",
    description: "摸錯頭牌；該牌實際為牌山上靠後順序的牌。",
  },
  {
    date: "13 Feb",
    matchCode: "Pre16-02",
    violator: "阿嚕阿嚕 - 馬la丁",
    category: "摸牌不恰當",
    result: "警告",
    description: "觸及牌山後鳴牌。",
  },
  {
    date: "14 Feb",
    matchCode: "Pre17-02",
    violator: "友聯 - Marker's Mark",
    category: "違規曝露",
    result: "黃牌",
    description: "違規曝露兩張牌山牌。",
  },
  {
    date: "21 Feb",
    matchCode: "Pre20-02",
    violator: "友聯 - 浦部",
    category: "摸牌不恰當",
    result: "警告",
    description: "摸牌時過份用力，有被觀察到的「鋤檯」行為。",
  },
  {
    date: "3 Mar",
    matchCode: "Pre25-01",
    violator: "Fukurou Reds - Benny",
    category: "電子器材",
    result: "黃牌",
    description:
      "判決挑戰成功，未按規定處理電子器材，對局中響起，原裁判判罰警告，改判黃牌。",
  },
  {
    date: "6 Mar",
    matchCode: "Pre26-01",
    violator: "天地人和 - Justin",
    category: "擾亂牌局 - 強打",
    result: "黃牌",
    description: "有被觀察到的強打，警告後再犯。",
  },
  {
    date: "8 Mar",
    matchCode: "Pre28-01",
    violator: "團結Gang - Loan",
    category: "遲到",
    result: "扣5分",
    description: "遲到（5分鐘內）。",
  },
  {
    date: "13 Mar",
    matchCode: "Pre29-01",
    violator: "阿嚕阿嚕 - 鴨",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "13 Mar",
    matchCode: "Pre29-02",
    violator: "Theory - 亨利",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "19 Mar",
    matchCode: "Pre30-02",
    violator: "友聯 -  浦部",
    category: "未發聲行為",
    result: "無判罰",
    description:
      "判決挑戰不成功，裁判組認為缺乏關鍵證據證實未發聲行為，原裁判無判罰，維持原判。",
  },
  {
    date: "20 Mar",
    matchCode: "Pre32-01",
    violator: "Fukurou Reds - 紅毛",
    category: "擾亂牌局 - 不恰當立直",
    result: "黃牌",
    description: "判決挑戰成功，證實立直時行為不恰當，原裁判無判罰，追判黃牌。",
  },
  {
    date: "20 Mar",
    matchCode: "Pre32-01",
    violator: "晉天晴朗 - Ching",
    category: "電子器材",
    result: "黃牌",
    description: "未按規定處理電子器材。",
  },
  {
    date: "21 Mar",
    matchCode: "Pre33-01",
    violator: "皇家勇士 - Gary",
    category: "場地內進食",
    result: "警告",
    description: "判決挑戰成功，原裁判無判罰，追判警告。",
  },
  {
    date: "21 Mar",
    matchCode: "Pre33-01",
    violator: "皇家勇士 - Gary",
    category: "摸錯牌",
    result: "黃牌",
    description: "摸錯牌；該牌實際為牌山上靠後順序的牌。",
  },
  {
    date: "21 Mar",
    matchCode: "Pre33-02",
    violator: "團結Gang - Ernest",
    category: "摸錯牌 及 擾亂牌局",
    result: "警告 加 黃牌",
    description:
      "判決挑戰成功，證實違規自行修正錯誤，原裁判判警告，改判警告加黃牌一次。",
  },
  {
    date: "26 Mar",
    matchCode: "Pre34-01",
    violator: "阿嚕阿嚕 - Rex",
    category: "摸牌不恰當",
    result: "警告",
    description: "摸牌時過份用力，有被觀察到的「鋤檯」行為。",
  },
  {
    date: "26 Mar",
    matchCode: "Pre34-01",
    violator: "Theory - Kirk",
    category: "摸牌不恰當",
    result: "警告",
    description: "摸牌時過份用力，有被觀察到的「鋤檯」行為。",
  },
  {
    date: "26 Mar",
    matchCode: "Pre34-01",
    violator: "Theory - Kirk",
    category: " 小相公 及 擾亂牌局",
    result: "無判罰",
    description:
      "判決挑戰不成功，裁判組認為選手未捨牌，不足以構成小相公，修正行為合法，原裁判無判罰，維持原判。",
  },
  {
    date: "4 Apr",
    matchCode: "Pre39-02",
    violator: "友聯 - 浦部",
    category: "遮擋鏡頭",
    result: "黃牌",
    description: "有被觀察到的遮擋鏡頭，警告後再犯。",
  },
  {
    date: "4 Apr",
    matchCode: "Pre39-02",
    violator: "團結Gang - Alan",
    category: "摸牌不恰當",
    result: "黃牌",
    description: "立直後，摸牌不恰當，包括未向鏡頭展示和過慢等，警告後再犯。",
  },
  {
    date: "9 Apr",
    matchCode: "Pre40-02",
    violator: "Theory - Eris、友聯 - 爆鷹",
    category: "擾亂牌局",
    result: "行為提醒",
    description:
      "判決挑戰成功，裁判組認為多次點棒交收錯誤有構成擾亂牌局的可能，原裁判無判罰，追判行為提醒。",
  },
  {
    date: "17 Apr",
    matchCode: "Pre42-02",
    violator: "友聯 - Marker's Mark",
    category: "未發聲行為",
    result: "黃牌",
    description: "有被觀察到的未發聲行為。",
  },
  {
    date: "18 Apr",
    matchCode: "Pre45-02",
    violator: "茶道研究院 - Hyun",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "18 Apr",
    matchCode: "Pre45-02",
    violator: "Theory - Henry",
    category: "擾亂牌局 - 強打",
    result: "黃牌",
    description: "有被觀察到的強打，警告後再犯。",
  },
  {
    date: "18 Apr",
    matchCode: "Pre45-02",
    violator: "Theory - Henry",
    category: "擾亂牌局 - 不恰當立直",
    result: "黃牌；兩黃一紅，扣30分",
    description:
      "判決挑戰成功，裁判組認為立直時行為不恰當，原裁判判警告，改判黃牌。",
  },
  {
    date: "23 Apr",
    matchCode: "Pre46-02",
    violator: "Theory - Kirk",
    category: "小相公",
    result: "和了禁止",
    description: "先切牌：未摸頭牌，按「小相公」處理。",
  },
  {
    date: "30 Apr",
    matchCode: "Pre49-02",
    violator: "友聯 - 爆鷹",
    category: "遲到",
    result: "扣5分",
    description: "遲到（5分鐘內）。",
  },
  {
    date: "14 May",
    matchCode: "Pre55-01",
    violator: "Bad Beat - Angus",
    category: "遲到",
    result: "扣10分",
    description: "遲到（10分鐘內）。",
  },
  {
    date: "15 May",
    matchCode: "Pre56-01",
    violator: "友聯 - 浦部",
    category: "遲到",
    result: "扣10分",
    description: "遲到（10分鐘內）。",
  },
  {
    date: "16 May",
    matchCode: "Pre57-02",
    violator: "麻瓜 - Hugo",
    category: "違規曝露",
    result: "黃牌",
    description: "違規曝露兩張牌山牌。",
  },
  {
    date: "21 May",
    matchCode: "Pre58-01",
    violator: "團結Gang - Ernest",
    category: "未整理手牌",
    result: "行為提醒",
    description: "未整理手牌",
  },
  {
    date: "21 May",
    matchCode: "Pre58-02",
    violator: "桌遊旅人 - Seiya",
    category: "違規曝露",
    result: "黃牌",
    description: "違規曝露兩張牌山牌。",
  },
  {
    date: "23 May",
    matchCode: "Pre60-01",
    violator: "Fukurou Reds - Benny",
    category: "遮擋鏡頭",
    result: "警告",
    description: "有被觀察到的遮擋鏡頭。",
  },
  {
    date: "23 May",
    matchCode: "Pre60-01",
    violator: "皇家勇士 - Kelvin",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "23 May",
    matchCode: "Pre60-01",
    violator: "阿嚕阿嚕 - 鴨",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "29 May",
    matchCode: "Pre 62-02",
    violator: "Bad Beat - Angus",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "29 May",
    matchCode: "Pre 62-02",
    violator: "茶道研究院 - Oskar",
    category: "違規曝露",
    result: "無判罰",
    description: "裁判組認為未有違規曝露，無判罰",
  },
  {
    date: "30 May",
    matchCode: "Pre 63-02",
    violator: "晉天晴朗 - Sunny",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "30 May",
    matchCode: "Pre 63-02",
    violator: "友聯 - Marker's Mark",
    category: "遮擋鏡頭",
    result: "警告",
    description: "有被觀察到的遮擋鏡頭。",
  },
  {
    date: "30 May",
    matchCode: "Pre62-02",
    violator: "團結Gang - Ernest",
    category: "行為不恰當",
    result: "警告",
    description: "局內有過多眼神接觸及表情，行為不恰當。",
  },
  {
    date: "5 Jun",
    matchCode: "Pre65-01",
    violator: "晉天晴朗 - GY",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "5 Jun",
    matchCode: "Pre65-01",
    violator: "天地人和 - Justin",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "5 Jun",
    matchCode: "Pre65-01",
    violator: "Theory - 亨利",
    category: "擾亂牌局 - 強打",
    result: "警告",
    description: "有被觀察到的強打。",
  },
  {
    date: "6 Jun",
    matchCode: "Pre66-01",
    violator: "阿嚕阿嚕 - Rex",
    category: "違規曝露",
    result: "黃牌",
    description: "違規曝露兩張手牌（不包括捨牌）。",
  },
  {
    date: "12 Jun",
    matchCode: "Pre68-01",
    violator: "友聯 - 爆鷹",
    category: "擾亂牌局 - 撞跌牌山",
    result: "黃牌",
    description: "開牌撞跌牌山。",
  },
  {
    date: "20 Jun",
    matchCode: "Pre72-01",
    violator: "All",
    category: "擾亂牌局 - 行牌過快",
    result: "行為提醒",
    description: "有被觀察到的行牌過快。",
  },
  {
    date: "26 Jun",
    matchCode: "Pre74-02",
    violator: "阿嚕阿嚕 - 馬la丁",
    category: "違規曝露",
    result: "黃牌",
    description: "違規曝露兩張牌山牌。",
  },
  {
    date: "30 Jul",
    matchCode: "Pre88-01",
    violator: "晉天晴朗 - Ryan",
    category: "行為不恰當",
    result: "黃牌",
    description: "多局內有過多眼神接觸及表情，行為不恰當。",
  },
  {
    date: "30 Jul",
    matchCode: "Pre88-02",
    violator: "友聯 - Marker's Mark",
    category: "小相公",
    result: "和了禁止",
    description: "先切牌：未摸頭牌，按「小相公」處理。",
  },
  {
    date: "15 Aug",
    matchCode: "Pre24-02",
    violator: "Fukurou Reds - Benny",
    category: "擾亂牌局 - 撞跌牌山",
    result: "黃牌",
    description: "違規曝露兩張牌山牌。",
  },
];

const A4Page = ({
  children,
  hideHeaderAndFooter,
  page = 1,
}: PropsWithChildren<{ hideHeaderAndFooter?: boolean; page?: number }>) => {
  return (
    <section className="text-black odd:bg-yellow-100 even:bg-red-100 py-16 print:w-[210mm] print:h-[297mm] odd:print:bg-transparent even:print:bg-transparent print:py-0">
      <div className="relative w-[210mm] h-[297mm] px-[10mm] py-[15mm] overflow-hidden bg-white ring-1 ring-black mx-auto print:ring-0">
        {children}
        {/* <div className="absolute bottom-[20mm] inset-0 flex items-center justify-center z-50 text-center text-[3rem] text-red-500">
          草稿
        </div> */}
        {!hideHeaderAndFooter && (
          <>
            <div className="absolute top-[8mm] left-[10mm] origin-top-left scale-75">
              HK-League 2024 香港麻雀協會香港立直麻雀團體聯賽2024 常規賽報告書
            </div>
            <div className="absolute bottom-[8mm] right-[10mm] origin-bottom-right scale-75">
              頁 {page - 1}/207
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default async function DevRegularsReport() {
  const [tournamentTeams, playersInTeamIds] = await Promise.all([
    getRegularTeams(),
    getPlayersGroupByTeams(),
  ]);

  const players = await getAllPlayersWithStat().then((teamPlayers) =>
    teamPlayers.sort((a, b) => b.statistic.point - a.statistic.point)
  );

  const matchesPerDate = await (
    await getMatchesGroupedByStageAndDate(
      "regulars",
      "2024-01-01",
      "2024-08-31"
    )
  ).map((item) => ({
    ...item,
    matches: item.matches.map((match) => ({
      ...match,
      name: match.name.substring(match.name.indexOf("#")),
      resultTeamMap: {
        [match.playerEast.teamId]: match.result?.playerEast,
        [match.playerSouth.teamId]: match.result?.playerSouth,
        [match.playerWest.teamId]: match.result?.playerWest,
        [match.playerNorth.teamId]: match.result?.playerNorth,
      },
    })),
  }));

  const matches: MatchDTO[] = [];
  const violationMatches: (typeof matchesPerDate)[0]["matches"] = [];

  for (const i of matchesPerDate) {
    for (const j of i.matches) {
      matches.push(await getMatch(j._id));

      for (const k in j.resultTeamMap) {
        if (
          typeof j.resultTeamMap[k]?.penalty !== "undefined" &&
          j.resultTeamMap[k]?.penalty !== 0
        ) {
          violationMatches.push(j);
          break;
        }
      }
    }
  }

  return (
    <main>
      <A4Page hideHeaderAndFooter>
        <div className="h-full w-full flex flex-col justify-center items-center gap-y-16">
          <img src="/images/logo.png" className="w-1/3" alt="" />
          <div className="text-center">
            <h1 className="text-[56px] leading-[1.3] font-serif font-semibold">
              HK-League 2024
            </h1>
            <h2 className="text-[24px] leading-[1]">
              香港麻雀協會香港立直麻雀團體聯賽2024
            </h2>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-[56px] leading-[1.3] font-semibold">
              常規賽報告書
            </h1>
            {/* <h2 className="text-[24px] leading-[1]">2024.08.17 版本</h2> */}
          </div>

          <div></div>

          <div className="space-y-4 self-stretch">
            <div className="flex gap-2 items-center">
              <div>參賽隊伍及參賽者</div>
              <div className="flex-1 border-b border-black border-dotted"></div>
              <div>頁 1-3</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>成績</div>
              <div className="flex-1 border-b border-black border-dotted"></div>
              <div>頁 4-11</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>判罰紀錄</div>
              <div className="flex-1 border-b border-black border-dotted"></div>
              <div>頁 12-17</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>選手數據</div>
              <div className="flex-1 border-b border-black border-dotted"></div>
              <div>頁 18-26</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>半莊成績紀錄</div>
              <div className="flex-1 border-b border-black border-dotted"></div>
              <div>頁 27-207</div>
            </div>
          </div>
        </div>
      </A4Page>

      {[
        [0, 4],
        [4, 8],
        [8, 12],
      ].map((indexes, page) => (
        <A4Page page={page + 2}>
          <div className="space-y-4">
            <h3 className="text-[2em] font-semibold">
              {page === 0 ? "參賽隊伍及參賽者" : <>&nbsp;</>}
            </h3>
            {tournamentTeams
              .slice(indexes[0], indexes[1])
              .map(({ _key, team }) => (
                <table
                  key={_key}
                  className="w-full [&_td]:border [&_td]:border-black [&_td]:p-2"
                >
                  <tbody>
                    <tr>
                      <td rowSpan={5} className="w-[200px]">
                        <img
                          src={team.teamLogoImageUrl + "?w=512&auto=format"}
                        />
                      </td>
                      <td className="text-[1.5em] font-semibold">
                        {team.teamFullname}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {playersInTeamIds[team.teamId][0].name} (
                        {playersInTeamIds[team.teamId][0].nickname})
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {playersInTeamIds[team.teamId][1].name} (
                        {playersInTeamIds[team.teamId][1].nickname})
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {playersInTeamIds[team.teamId][2].name} (
                        {playersInTeamIds[team.teamId][2].nickname})
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {playersInTeamIds[team.teamId][3].name} (
                        {playersInTeamIds[team.teamId][3].nickname})
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
          </div>
        </A4Page>
      ))}

      {new Array(Math.ceil(matchesPerDate.length / 12))
        .fill(undefined)
        .map((_, index) => [
          index * 12,
          Math.min((index + 1) * 12, matchesPerDate.length),
        ])
        .map((indexes, page) => (
          <A4Page page={page + 5}>
            <div className="space-y-4">
              <h3 className="text-[2em] font-semibold">
                成績 (第 {indexes[0] * 2 + 1} 至 {indexes[1] * 2} 場半莊)
              </h3>
              <div>
                <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-1.5">
                  <tbody>
                    <tr className="odd:bg-neutral-100">
                      <td></td>
                      {tournamentTeams.map(({ team }) => (
                        <td className="text-center w-[52px] px-1">
                          <img
                            src={team.teamLogoImageUrl + "?w=512&auto=format"}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-neutral-100">
                      <td>總排名</td>
                      {tournamentTeams.map(({ ranking }) => (
                        <td className="text-center">
                          {renderRanking(ranking)}
                        </td>
                      ))}
                    </tr>
                    <tr className="odd:bg-neutral-100">
                      <td>總成績</td>
                      {tournamentTeams.map(({ point }) => (
                        <td className="text-center">{renderPoint(point)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                {matchesPerDate
                  .slice(indexes[0], indexes[1])
                  .map(({ date, matches }) => (
                    <table
                      key={date}
                      className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-1.5"
                    >
                      <tbody>
                        {matches.map((match, matchIndexInDate) => (
                          <tr key={match._id} className="odd:bg-neutral-100">
                            <td>{match.name}</td>
                            {tournamentTeams.map(({ team }) => (
                              <td className="text-center w-[52px]">
                                {renderPoint(
                                  match.resultTeamMap[team.teamId]?.point
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))}
              </div>

              {(page + 1) * 12 > matchesPerDate.length && (
                <div>
                  <h4 className="text-[1.5em] font-semibold mb-2">判罰扣分</h4>
                  <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2">
                    <tbody>
                      {violationMatches.map((match) => (
                        <tr key={match._id} className="odd:bg-neutral-100">
                          <td>{match.name}</td>
                          {tournamentTeams.map(({ team }) => (
                            <td className="text-center w-[52px]">
                              {renderPoint(
                                match.resultTeamMap[team.teamId]?.penalty,
                                true
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {/* <tr className="odd:bg-neutral-100">
                        <td>違規扣分</td>
                        {tournamentTeams.map(({ team }) => (
                          <td className="text-center w-[52px]">
                            {renderPoint(violationScoreTeamMap[team.teamId])}
                          </td>
                        ))}
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </A4Page>
        ))}

      {[
        [0, 12],
        [12, 24],
        [24, 36],
        [36, 47],
        [47, 60],
        [60, 80],
      ].map((indexes, page) => (
        <A4Page key={page} page={page + 13}>
          <div className="space-y-4">
            <h3 className="text-[2em] font-semibold">
              {page === 0 ? "判罰紀錄" : <>&nbsp;</>}
            </h3>
            <div>
              <table className="w-full [&_td]:border [&_td]:border-black [&_td]:p-2">
                <thead>
                  <tr>
                    {/* <td>日期</td> */}
                    <td className="font-semibold w-1/6">半莊</td>
                    <td className="font-semibold w-1/6">隊伍及選手</td>
                    <td className="font-semibold w-1/6">事件</td>
                    <td className="font-semibold w-1/2">簡述及判決</td>
                  </tr>
                </thead>
                <tbody>
                  {VIOLATIONS.slice(indexes[0], indexes[1]).map(
                    (violation, vi) => (
                      <tr key={vi}>
                        {/* <td>{violation.date}</td> */}
                        <td>{violation.matchCode}</td>
                        <td>{violation.violator}</td>
                        <td>{violation.category}</td>
                        <td>
                          {violation.description}
                          <br />
                          <strong>判決：{violation.result}</strong>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </A4Page>
      ))}

      {[players.slice(0, 24), players.slice(24, 48)].map((subPlayers, spi) => (
        <A4Page key={spi} page={spi + 19}>
          <div className="space-y-4">
            <h3 className="text-[2em] font-semibold">
              {spi === 0 ? (
                "選手數據（總得分、順位、連對率、避四率）"
              ) : (
                <>&nbsp;</>
              )}
            </h3>
            <div>
              <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2">
                <thead>
                  <tr>
                    <td className="font-semibold w-[35%]">選手</td>
                    <td className="font-semibold w-[12.25%]">總得分</td>
                    <td className="font-semibold w-[8%]">半莊數</td>
                    <td className="font-semibold w-[19.5%]">
                      順位(1位/2位/3位/4位)
                    </td>
                    <td className="font-semibold w-[13.25%]">連對率</td>
                    <td className="font-semibold w-[12%]">避四率</td>
                  </tr>
                </thead>
                <tbody>
                  {subPlayers.map((player) => (
                    <tr key={player.playerId} className="odd:bg-neutral-100">
                      <td>
                        {player.teamName} - {player.playerFullname}
                      </td>
                      <td>
                        {renderPoint(player.statistic.point)} (
                        {player.statistic.pointRanking}位)
                      </td>
                      <td>{player.statistic.matchCount}局</td>
                      <td>
                        {player.statistic.firstCount}/
                        {player.statistic.secondCount}/
                        {player.statistic.thirdCount}/
                        {player.statistic.fourthCount}
                      </td>
                      <td>
                        {renderPercentage(player.statistic.firstAndSecondP)} (
                        {player.statistic.firstAndSecondPRanking}位)
                      </td>
                      <td>
                        {renderPercentage(player.statistic.nonFourthP)} (
                        {player.statistic.nonFourthPRanking}位)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </A4Page>
      ))}

      {[players.slice(0, 24), players.slice(24, 48)].map((subPlayers, spi) => (
        <A4Page key={spi} page={spi + 21}>
          <div className="space-y-4">
            <h3 className="text-[2em] font-semibold">
              {spi === 0 ? (
                "選手數據（立直率、和了率、銃和率、打點/失點）"
              ) : (
                <>&nbsp;</>
              )}
            </h3>
            <div>
              <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2">
                <thead>
                  <tr>
                    <td className="font-semibold w-[35%]">選手</td>
                    <td className="font-semibold w-[12%]">立直率</td>
                    <td className="font-semibold w-[12%]">和了率</td>
                    <td className="font-semibold w-[14.5%]">和了平均淨打點</td>
                    <td className="font-semibold w-[12%]">銃和率</td>
                    <td className="font-semibold w-[14.5%]">銃和平均淨失點</td>
                  </tr>
                </thead>
                <tbody>
                  {subPlayers.map((player) => (
                    <tr key={player.playerId} className="odd:bg-neutral-100">
                      <td>
                        {player.teamName} - {player.playerFullname}
                      </td>
                      <td>
                        {renderPercentage(player.statistic.riichiP, 3)} (
                        {player.statistic.riichiPRanking}位)
                      </td>
                      <td>
                        {renderPercentage(player.statistic.ronP, 3)} (
                        {player.statistic.ronPRanking}位)
                      </td>
                      <td>
                        {renderScore(
                          player.statistic.ronPureScoreAvg,
                          false,
                          2
                        )}{" "}
                        ({player.statistic.ronPureScoreAvgRanking}位)
                      </td>
                      <td>
                        {renderPercentage(player.statistic.chuckP, 3)} (
                        {player.statistic.chuckPRanking}位)
                      </td>
                      <td>
                        {renderScore(
                          -player.statistic.chuckPureScoreAvg,
                          false,
                          2
                        )}{" "}
                        ({player.statistic.chuckPureScoreAvgRanking}位)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </A4Page>
      ))}

      {[players.slice(0, 24), players.slice(24, 48)].map((subPlayers, spi) => (
        <A4Page key={spi} page={spi + 23}>
          <div className="space-y-4">
            <h3 className="text-[2em] font-semibold">
              {spi === 0 ? "選手數據（雜項）" : <>&nbsp;</>}
            </h3>
            <div>
              <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2">
                <thead>
                  <tr>
                    <td className="font-semibold w-[35%]">選手</td>
                    <td className="font-semibold w-[12%]">副露率</td>
                    <td className="font-semibold w-[12%]">立直後和了率</td>
                    <td className="font-semibold w-[14.5%]">副露後和了率</td>
                    <td className="font-semibold w-[12%]">立直後銃和率</td>
                    <td className="font-semibold w-[14.5%]">副露後銃和率</td>
                  </tr>
                </thead>
                <tbody>
                  {subPlayers.map((player) => (
                    <tr key={player.playerId} className="odd:bg-neutral-100">
                      <td>
                        {player.teamName} - {player.playerFullname}
                      </td>
                      <td>
                        {renderPercentage(player.statistic.revealP, 3)} (
                        {player.statistic.revealPRanking}位)
                      </td>
                      <td>
                        {renderPercentage(
                          player.statistic.ronAfterRiichiCount /
                            player.statistic.roundCount,
                          3
                        )}
                      </td>
                      <td>
                        {renderPercentage(
                          player.statistic.ronAfterRevealCount /
                            player.statistic.roundCount,
                          3
                        )}
                      </td>
                      <td>
                        {renderPercentage(
                          player.statistic.chuckAfterRiichiCount /
                            player.statistic.roundCount,
                          3
                        )}
                      </td>
                      <td>
                        {renderPercentage(
                          player.statistic.chuckAfterRevealCount /
                            player.statistic.roundCount,
                          3
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </A4Page>
      ))}

      {[players.slice(0, 24), players.slice(24, 48)].map((subPlayers, spi) => (
        <A4Page key={spi} page={spi + 25}>
          <div className="space-y-4">
            <h3 className="text-[2em] font-semibold">&nbsp;</h3>
            <div>
              <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2">
                <thead>
                  <tr>
                    <td className="font-semibold w-[35%]">選手</td>
                    <td className="font-semibold w-[16.25%]">
                      立直和牌平均得點
                    </td>
                    <td className="font-semibold w-[16.25%]">
                      副露和牌平均得點
                    </td>
                    <td className="font-semibold w-[16.25%]">
                      親家和牌平均得點
                    </td>
                    <td className="font-semibold w-[16.25%]">
                      閒家和牌平均等點
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {subPlayers.map((player) => (
                    <tr key={player.playerId} className="odd:bg-neutral-100">
                      <td>
                        {player.teamName} - {player.playerFullname}
                      </td>
                      <td>
                        {renderScore(
                          player.statistic.ronAfterRiichiPureScoreAvg,
                          false,
                          2
                        )}
                      </td>
                      <td>
                        {renderScore(
                          player.statistic.ronAfterRevealPureScoreAvg,
                          false,
                          2
                        )}
                      </td>
                      <td>
                        {renderScore(
                          player.statistic.ronPureScoreAvgWhenEast,
                          false,
                          2
                        )}
                      </td>
                      <td>
                        {renderScore(
                          player.statistic.ronPureScoreAvgWhenNonEast,
                          false,
                          2
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </A4Page>
      ))}

      {[players.slice(0, 24), players.slice(24, 48)].map((subPlayers, spi) => (
        <A4Page key={spi} page={spi + 27}>
          <div className="space-y-4">
            <h3 className="text-[2em] font-semibold">&nbsp;</h3>
            <div>
              <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2">
                <thead>
                  <tr>
                    <td className="font-semibold w-[35%]">選手</td>
                    <td className="font-semibold w-[16.25%]">
                      立直放統平均失點
                    </td>
                    <td className="font-semibold w-[16.25%]">
                      副露放統平均失點
                    </td>
                    <td className="font-semibold w-[16.25%]">
                      親家放統平均失點
                    </td>
                    <td className="font-semibold w-[16.25%]">
                      閒家放統平均失點
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {subPlayers.map((player) => (
                    <tr key={player.playerId} className="odd:bg-neutral-100">
                      <td>
                        {player.teamName} - {player.playerFullname}
                      </td>
                      <td>
                        {renderScore(
                          -player.statistic.chuckAfterRiichiPureScoreAvg,
                          false,
                          2
                        )}
                      </td>
                      <td>
                        {renderScore(
                          -player.statistic.chuckAfterRevealPureScoreAvg,
                          false,
                          2
                        )}
                      </td>
                      <td>
                        {renderScore(
                          -player.statistic.chuckPureScoreAvgWhenEast,
                          false,
                          2
                        )}
                      </td>
                      <td>
                        {renderScore(
                          -player.statistic.chuckPureScoreAvgWhenNonEast,
                          false,
                          2
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </A4Page>
      ))}

      {matches.map((match, page) => (
        <A4Page key={match._id} page={page + 29}>
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2">
                <strong>半莊編號：</strong>
                {match.name}
              </div>
              <div className="col-span-2 text-right">
                <strong>日期：</strong>
                {renderDate(match.startAt)}
              </div>
              <div className="col-span-2">
                <strong>東家：</strong>
                {match.playerEast.teamName} - {match.playerEast.playerFullname}
              </div>
              <div className="text-right">{match.result?.playerEast.score}</div>
              <div className="text-right">
                {renderPoint(match.result?.playerEast.point)}
                {"  "}({match.result?.playerEast.ranking}位)
              </div>
              <div className="col-span-2">
                <strong>南家：</strong>
                {match.playerSouth.teamName} -{" "}
                {match.playerSouth.playerFullname}
              </div>
              <div className="text-right">
                {match.result?.playerSouth.score}
              </div>
              <div className="text-right">
                {renderPoint(match.result?.playerSouth.point)}
                {"  "}({match.result?.playerSouth.ranking}位)
              </div>
              <div className="col-span-2">
                <strong>西家：</strong>
                {match.playerWest.teamName} - {match.playerWest.playerFullname}
              </div>
              <div className="text-right">{match.result?.playerWest.score}</div>
              <div className="text-right">
                {renderPoint(match.result?.playerWest.point)}
                {"  "}({match.result?.playerWest.ranking}位)
              </div>
              <div className="col-span-2">
                <strong>北家：</strong>
                {match.playerNorth.teamName} -{" "}
                {match.playerNorth.playerFullname}
              </div>
              <div className="text-right">
                {match.result?.playerNorth.score}
              </div>
              <div className="text-right">
                {renderPoint(match.result?.playerNorth.point)}
                {"  "}({match.result?.playerNorth.ranking}位)
              </div>
            </div>

            <div className="border-b border-black"></div>

            <div>
              <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2 text-center">
                <tbody>
                  <tr className="odd:bg-neutral-100">
                    <td className="w-[15%]"></td>
                    <td className="w-[21.25%]">
                      <p>
                        <strong>東</strong>
                      </p>
                      <p>
                        <strong>{match.playerEast.playerNickname}</strong>
                      </p>
                    </td>
                    <td className="w-[21.25%]">
                      <p>
                        <strong>南</strong>
                      </p>
                      <p>
                        <strong>{match.playerSouth.playerNickname}</strong>
                      </p>
                    </td>
                    <td className="w-[21.25%]">
                      <p>
                        <strong>西</strong>
                      </p>
                      <p>
                        <strong>{match.playerWest.playerNickname}</strong>
                      </p>
                    </td>
                    <td className="w-[21.25%]">
                      <p>
                        <strong>北</strong>
                      </p>
                      <p>
                        <strong>{match.playerNorth.playerNickname}</strong>
                      </p>
                    </td>
                  </tr>
                  {match.rounds.map((round) => (
                    <tr key={round._key} className="odd:bg-neutral-100">
                      <td>{renderMatchCode(round.code)}</td>
                      <td>
                        {renderScore(
                          round.playerEast.afterScore -
                            round.playerEast.beforeScore,
                          true
                        )}
                      </td>
                      <td>
                        {renderScore(
                          round.playerSouth.afterScore -
                            round.playerSouth.beforeScore,
                          true
                        )}
                      </td>
                      <td>
                        {renderScore(
                          round.playerWest.afterScore -
                            round.playerWest.beforeScore,
                          true
                        )}
                      </td>
                      <td>
                        {renderScore(
                          round.playerNorth.afterScore -
                            round.playerNorth.beforeScore,
                          true
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="odd:bg-neutral-100 text-[1.8em]">
                    <td className="font-semibold">總分</td>
                    <td>
                      <p>
                        <strong>{match.result?.playerEast.score}</strong>
                      </p>
                      <p>
                        <strong>
                          {renderPoint(match.result?.playerEast.point)}
                        </strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        <strong>{match.result?.playerSouth.score}</strong>
                      </p>
                      <p>
                        <strong>
                          {renderPoint(match.result?.playerSouth.point)}
                        </strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        <strong>{match.result?.playerWest.score}</strong>
                      </p>
                      <p>
                        <strong>
                          {renderPoint(match.result?.playerWest.point)}
                        </strong>
                      </p>
                    </td>
                    <td>
                      <p>
                        <strong>{match.result?.playerNorth.score}</strong>
                      </p>
                      <p>
                        <strong>
                          {renderPoint(match.result?.playerNorth.point)}
                        </strong>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {(match.result?.playerEast?.penalty !== 0 ||
              match.result?.playerSouth?.penalty !== 0 ||
              match.result?.playerWest?.penalty !== 0 ||
              match.result?.playerNorth?.penalty !== 0) && (
              <div>
                <h4 className="font-semibold mb-2">判罰扣分</h4>
                <table className="text-[.5em] w-full border-b border-neutral-300 [&_td]:py-2 text-center">
                  <tbody>
                    <tr className="odd:bg-neutral-100">
                      <td className="w-[15%]"></td>
                      <td className="w-[21.25%]">
                        <p>
                          <strong>東</strong>
                        </p>
                        <p>
                          <strong>{match.playerEast.playerNickname}</strong>
                        </p>
                      </td>
                      <td className="w-[21.25%]">
                        <p>
                          <strong>南</strong>
                        </p>
                        <p>
                          <strong>{match.playerSouth.playerNickname}</strong>
                        </p>
                      </td>
                      <td className="w-[21.25%]">
                        <p>
                          <strong>西</strong>
                        </p>
                        <p>
                          <strong>{match.playerWest.playerNickname}</strong>
                        </p>
                      </td>
                      <td className="w-[21.25%]">
                        <p>
                          <strong>北</strong>
                        </p>
                        <p>
                          <strong>{match.playerNorth.playerNickname}</strong>
                        </p>
                      </td>
                    </tr>
                    <tr className="odd:bg-neutral-100 text-[1.8em]">
                      <td></td>
                      <td>
                        <strong>
                          {renderPoint(match.result?.playerEast.penalty, true)}
                        </strong>
                      </td>
                      <td>
                        <strong>
                          {renderPoint(match.result?.playerSouth.penalty, true)}
                        </strong>
                      </td>
                      <td>
                        <strong>
                          {renderPoint(match.result?.playerWest.penalty, true)}
                        </strong>
                      </td>
                      <td>
                        <strong>
                          {renderPoint(match.result?.playerNorth.penalty, true)}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </A4Page>
      ))}
    </main>
  );
}

const W3IssueCard = () => {
  return (
    <div className="bg-yellow-500 p-8 text-neutral-900 space-y-6">
      <h4 className="text-2xl font-semibold">
        <i className="bi bi-exclamation-circle"></i> 對賽程第三週有隊伍觸犯
        [不正當競爭行為] 一事
      </h4>
      <p>
        　　於2025年1月25日（四）第一回戰 (常規賽 #23Pre09-1)
        的東一局，隊伍［一發放銃］的隊員自摸役滿地和。
      </p>
      <p>
        　　裁判組於賽後重看錄影片段以及場地監控片段，發現該隊隊伍成員作出了違法行為——不正當競爭行為：即採取違規或不公正手段以謀取競爭利益。
      </p>
      <p>
        　　因此，隊伍［一發放銃］已被取消參賽資格、即日移出聯賽；與涉事隊伍相關對局、成績及數據亦作廢。新的替補隊伍將安排加入聯賽。
      </p>
      <p>
        　　
        <a
          href="/news/2025-01-29-w3issue"
          target="_blank"
          className="underline"
        >
          詳細內容請點此 &gt;&gt;
        </a>
      </p>
    </div>
  );
};

export default W3IssueCard;

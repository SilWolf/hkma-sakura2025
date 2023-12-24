export default function TeamDetail() {
  return (
    <main className="py-20 relative">
      <section className="py-12 w-full text-center bg-gradient-to-b from-[#4169E120] to-transparent">
        <div className="container mx-auto max-w-screen-md">
          <img src="/images/logo-team6.webp" className="w-64 mx-auto" alt="" />
          <h2 className="mt-12 text-[48px] font-bold bg-[#4169E1] border-[#4169E1] border-y bg-opacity-20 py-1">
            一發放銃
          </h2>
          <p className="text-left text-[16px] leading-[28px] mt-12 px-8">
            一群業餘日麻愛好者組成的隊伍。
            <br />
            隊伍風格強調具風險的兜牌打法，即使面對多家聽牌的局面，也傾向選擇加入混戰、拚出一條血路的打法。
            <br />
            一步天堂一步地獄的破釜沉舟式打法，總是讓分數大上大落，
            <br />
            即便如此還是不斷挑戰，便是隊名「一發放銃」的冒險精神。
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-screen-md">
          <div className="flex gap-12 items-center">
            <div className="shrink-0">
              <img
                className="aspect-square w-36 rounded-full bg-[#4169E1] bg-opacity-20 border-[#4169E1] border"
                src="https://cdn.sanity.io/images/0a9a4r26/production/ff4e2b25bd5ae9ac01c80a96252f15228df35f43-360x500.png?w=360&h=360&fit=crop&crop=top&auto=format"
                alt="FONG, Ka Ho"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl">FONG, Ka Ho</h3>
              <p className="mt-2">天鳳X段 | 麻齡 10年</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4 mt-4">
            <div className="col-span-2">
              <table className="w-full text-center">
                <thead>
                  <tr className="bg-neutral-800">
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
                  <tr className="bg-neutral-800">
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

      <section className="py-12">
        <div className="container mx-auto max-w-screen-md flex gap-12 items-center">
          <div className="shrink-0">
            <img
              className="aspect-square w-36 rounded-full bg-[#4169E1] bg-opacity-20 border-[#4169E1] border"
              src="https://cdn.sanity.io/images/0a9a4r26/production/037d717a2ec0d9f2dec69d91d5b73e7e237d60f5-360x500.png?w=360&h=360&fit=crop&crop=top&auto=format"
              alt="FONG, Ka Ho"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl">WONG, Pak Hin</h3>
            <p className="mt-2">
              天鳳鳳位
              <br />
              《中國立直最強戰 大洋化學盃 全國大賽》香港賽區代表
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-screen-md flex gap-12 items-center">
          <div className="shrink-0">
            <img
              className="aspect-square w-36 rounded-full bg-[#4169E1] bg-opacity-20 border-[#4169E1] border"
              src="https://cdn.sanity.io/images/0a9a4r26/production/1e2d678b4ca4b9b7225eaaabf029c41677429c75-360x500.png?w=360&h=360&fit=crop&crop=top&auto=format"
              alt="FONG, Ka Ho"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl">CHAN, Hin Yiu</h3>
            <p className="mt-2">天鳳X段 | 麻齡 10年</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-screen-md flex gap-12 items-center">
          <div className="shrink-0">
            <img
              className="aspect-square w-36 rounded-full bg-[#4169E1] bg-opacity-20 border-[#4169E1] border"
              src="https://cdn.sanity.io/images/0a9a4r26/production/30d9623d8cff9516354378663ead56abefb3d93e-360x500.png?w=360&h=360&fit=crop&crop=top&auto=format"
              alt="FONG, Ka Ho"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl">WONG, Ching Fung</h3>
            <p className="mt-2">天鳳X段 | 麻齡 10年</p>
          </div>
        </div>
      </section>
    </main>
  );
}

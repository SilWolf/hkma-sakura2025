export default function SchedulePage() {
  return (
    <main>
      <section className="py-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">賽程</h2>
      </section>
      <section className="pb-12">
        <div className="container px-2 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="text-white">
            <iframe
              className="w-full aspect-[4/3]"
              title="賽程Google Calendar"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%231e223b&ctz=Asia%2FHong_Kong&showPrint=0&hl=zh_TW&src=ODI3MDAwMzE0YjQyMmFiMmI0ZjA0YTEzZDNmMTJkYjg1OWQ3YmJkZDFhY2E5MjNjYmQxM2RjM2IyZjcxOThmNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23616161"
              style={{ borderWidth: 0 }}
              frameBorder="0"
            />
          </div>
          <div>
            <table className="w-full [&_img]:w-10 [&_img]:h-10 sm:[&_img]:w-24 sm:[&_img]:h-24">
              <thead>
                <tr>
                  <th>場次</th>
                  <th colSpan={4}>隊伍</th>
                </tr>
              </thead>
              <tbody className="odd:[&_tr]:bg-[rgba(255,255,255,0.1)]">
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    稍後公佈
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

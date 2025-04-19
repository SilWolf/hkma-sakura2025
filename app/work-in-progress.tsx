import Link from "next/link";

export default function WorkInProgress() {
  return (
    <section className="">
      <div className="container mx-auto text-center py-20 space-y-8">
        <img
          src="/images/logo.png"
          className="w-48 mx-auto"
          alt="Sakura League 2025"
        />
        <h2 className="text-4xl">施工中……</h2>
        <p>
          <Link href="/">返回主頁</Link>
        </p>
      </div>
    </section>
  );
}

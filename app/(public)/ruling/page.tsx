import { Metadata } from "next";

export const metadata: Metadata = {
  title: "聯賽賽制及規則",
};

export default function RulingPage() {
  return (
    <main>
      <section className="py-10">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          聯賽賽制及規則
        </h2>
      </section>

      <section className="container mx-auto text-center text-2xl pb-24">
        稍後公佈
      </section>
    </main>
  );
}

import SchedulePage from "./[stage]/[year]/[month]/page";

export const revalidate = 900;

export default async function ScheduleDefaultPage() {
  return <SchedulePage />;
}

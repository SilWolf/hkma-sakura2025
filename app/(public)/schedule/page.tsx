import SchedulePage from "./[year]/[month]/page";

export const revalidate = 900;

export default async function ScheduleDefaultPage() {
  const date = new Date();
  const params = {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
  };

  return <SchedulePage params={params} />;
}

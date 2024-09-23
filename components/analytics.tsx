import MonthlyAttendance from "./graphs/monthly-attendance";
import { YearlyBreakdown } from "./graphs/yearly-breakdown";

export default function Analytics({ data }: any) {
  return (
    <div className="space-y-6">
      <YearlyBreakdown data={data} />
      <MonthlyAttendance data={data} />
    </div>
  );
}

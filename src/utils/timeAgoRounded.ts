import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function timeAgoRounded(date: string | number | Date): string {
  const now = dayjs();
  const past = dayjs(date);

  if (!past.isValid()) return "Ngày không hợp lệ";

  const diffMs = now.diff(past);

  if (diffMs < 0) return "Trong tương lai";

  const dur = dayjs.duration(diffMs);

  const days = dur.asDays();
  const months = dur.asMonths();
  const years = dur.asYears();

  if (days < 1) return "Vừa xong";

  if (days < 30) return `${Math.round(days)} ngày trước`;

  if (months < 12) return `${Math.round(months)} tháng trước`;

  return `${Math.round(years)} năm trước`;
}

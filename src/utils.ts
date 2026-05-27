import type { ItemType, ReservationStatus } from "./types";

export const formatPrice = (price: number, type: ItemType): string =>
  type === "GIVE" ? "무료" : `${price.toLocaleString()}원`;

export const formatDistance = (m: number): string =>
  m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${m}m`;

export const formatPickupTime = (iso: string): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

export const formatTimeOnly = (iso: string): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${min}`;
};

export const reservationStatusLabel: Record<ReservationStatus, string> = {
  CONFIRMED: "확정",
  PICKUP: "픽업완료",
  CANCEL: "취소됨",
  NOSHOW: "노쇼",
};

export const reservationStatusClass: Record<ReservationStatus, string> = {
  CONFIRMED: "badge-confirm",
  PICKUP: "badge-done",
  CANCEL: "badge-cancel",
  NOSHOW: "badge-cancel",
};

export function getFoodEmoji(name: string): string {
  if (
    name.includes("빵") ||
    name.includes("크루아상") ||
    name.includes("베이글")
  )
    return "🥐";
  if (name.includes("샐러드")) return "🥗";
  if (name.includes("도시락")) return "🍱";
  if (name.includes("커피") || name.includes("아메리카노")) return "☕";
  if (name.includes("우유")) return "🥛";
  if (name.includes("케이크")) return "🎂";
  if (name.includes("김밥")) return "🍙";
  if (name.includes("식빵") || name.includes("모음")) return "🍞";
  if (name.includes("당근")) return "🥕";
  if (name.includes("양파")) return "🧅";
  if (name.includes("야채") || name.includes("채소")) return "🥦";
  if (name.includes("과일")) return "🍎";
  if (name.includes("반찬")) return "🍚";
  if (name.includes("피자")) return "🍕";
  if (name.includes("치킨") || name.includes("닭")) return "🍗";
  if (name.includes("햄버거") || name.includes("버거")) return "🍔";
  if (name.includes("라면") || name.includes("국수")) return "🍜";
  if (name.includes("초밥") || name.includes("스시")) return "🍣";
  return "🥘";
}

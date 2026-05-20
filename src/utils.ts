import type { ItemType, ReservationStatus } from "./types";

export const formatPrice = (price: number, type: ItemType): string =>
  type === "GIVE" ? "무료" : `${price.toLocaleString()}원`;

export const formatDistance = (m: number): string =>
  m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${m}m`;

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
  return "🛍️";
}

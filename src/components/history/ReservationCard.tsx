import { useState } from "react";
import type { Reservation } from "../../types";
import {
  reservationStatusLabel,
  reservationStatusClass,
  formatPrice,
  getFoodEmoji,
} from "../../utils";

interface Props {
  reservation: Reservation;
  onClick: () => void;
}

export default function ReservationCard({ reservation, onClick }: Props) {
  const [imgError, setImgError] = useState(false);
  const { status, item, store } = reservation;

  return (
    <button
      onClick={onClick}
      className="w-full card text-left active:scale-[0.99] transition-transform"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-[#EDE7DF] flex items-center justify-center flex-shrink-0 overflow-hidden text-xl">
          {item.image && !imgError ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            getFoodEmoji(item.name)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[#1A1208] truncate">
            {item.name} · {reservation.quantity}개
          </p>
          <p className="text-[12px] text-[#A0917F] truncate mt-0.5">
            🏪 {store.storeName}
          </p>
        </div>
        <span className={reservationStatusClass[status]}>
          {reservationStatusLabel[status]}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Row
          label="픽업 시간"
          value={`${item.pickupStart} ~ ${item.pickupEnd}`}
        />
        <Row
          label="가격"
          value={formatPrice(item.price, item.type)}
          highlight={item.type === "GIVE"}
        />
      </div>
    </button>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between text-[12px]">
      <span className="text-[#A0917F]">{label}</span>
      <span
        className={`font-semibold ${highlight ? "text-[#2D7D52]" : "text-[#1A1208]"}`}
      >
        {value}
      </span>
    </div>
  );
}

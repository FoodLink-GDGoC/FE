import { useState } from "react";
import type { NearbyItem } from "../../types";
import { formatPrice, formatDistance, getFoodEmoji } from "../../utils";

interface Props {
  item: NearbyItem;
  onClick: () => void;
}

export default function FoodCard({ item, onClick }: Props) {
  const [imgError, setImgError] = useState(false);
  const isPaid = item.type === "SELL";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-white border border-[#DDD4C8] rounded-xl p-3 text-left active:scale-[0.99] transition-transform"
    >
      <div className="w-12 h-12 rounded-xl bg-[#EDE7DF] flex items-center justify-center flex-shrink-0 overflow-hidden text-2xl">
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
          {item.name}
        </p>
        <p className="text-[12px] text-[#A0917F] truncate mt-0.5">
          {item.storeName} · {formatDistance(item.distance)} · 마감{" "}
          {item.pickupEnd}
        </p>
      </div>

      <span className={isPaid ? "badge-paid" : "badge-free"}>
        {formatPrice(item.price, item.type)}
      </span>
    </button>
  );
}

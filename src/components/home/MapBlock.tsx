import type { NearbyItem } from "../../types";
import type { NearbyResult } from "../../api/items";
import { formatPrice } from "../../utils";

interface Props {
  result: NearbyResult;
  onPinClick: (item: NearbyItem) => void;
}

export default function MapBlock({ result, onPinClick }: Props) {
  // 아이템 있는 매장 핀
  const itemPins = result.items.slice(0, 3).map((item, i) => {
    const positions = [
      { top: "22%", left: "6%" },
      { top: "12%", left: "44%" },
      { top: "52%", left: "60%" },
    ];
    const pos = positions[i] ?? positions[0];
    const isGive = item.type === "GIVE";

    return (
      <button
        key={`item-${item.itemId}`}
        onClick={() => onPinClick(item)}
        className={`absolute flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold shadow-sm
          ${isGive ? "bg-[#2D7D52] text-white" : "bg-[#7C4D2F] text-white"}`}
        style={pos}
      >
        {item.storeName.slice(0, 4)} · {formatPrice(item.price, item.type)}
      </button>
    );
  });

  // 아이템 없는 매장 핀
  const emptyPins = result.emptyStores.slice(0, 2).map((store, i) => {
    const positions = [
      { top: "60%", left: "15%" },
      { top: "18%", left: "70%" },
    ];
    const pos = positions[i] ?? positions[0];

    return (
      <div
        key={`empty-${store.storeId}`}
        className="absolute flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold shadow-sm bg-white text-[#A0917F] border border-[#DDD4C8]"
        style={pos}
      >
        {store.storeName.slice(0, 6)}
      </div>
    );
  });

  return (
    <div className="mx-5 rounded-2xl overflow-hidden bg-[#EDE7DF] h-[180px] relative flex-shrink-0">
      {/* 도로 격자 */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-1/3 h-2 bg-white/30 rounded" />
        <div className="absolute left-0 right-0 top-2/3 h-2 bg-white/30 rounded" />
        <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-white/30 rounded" />
        <div className="absolute top-0 bottom-0 left-2/3 w-2 bg-white/30 rounded" />
      </div>

      {itemPins}
      {emptyPins}

      {/* 내 위치 */}
      <div className="absolute top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-3.5 h-3.5 bg-[#2D7D52] border-2 border-white rounded-full" />
        <div className="absolute inset-0 bg-[#2D7D52]/20 rounded-full scale-[2.5]" />
      </div>
    </div>
  );
}

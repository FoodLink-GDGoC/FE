import { useState } from "react";
import { MapPin, Clock, Package, Info, Minus, Plus } from "lucide-react";
import { reservationApi } from "../../api/reservations";
import type { NearbyItem } from "../../types";
import { formatPrice, getFoodEmoji } from "../../utils";

interface Props {
  item: NearbyItem;
  onClose: () => void;
  onSuccess: (reservationId: number) => void;
}

export default function ReservationSheet({ item, onClose, onSuccess }: Props) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isGive = item.type === "GIVE";

  const handleReserve = async () => {
    try {
      setLoading(true);
      const res = await reservationApi.create(item.itemId, qty);
      onSuccess(res.reservationId);
    } catch (e) {
      console.error(e);
      alert("예약 중 오류가 발생했어요. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white rounded-t-3xl z-50 pb-8 shadow-2xl">
        <div className="w-9 h-1 bg-[#DDD4C8] rounded-full mx-auto mt-3 mb-4" />

        <div className="px-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-[#EDE7DF] flex items-center justify-center flex-shrink-0 overflow-hidden text-2xl">
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
              <p className="text-[16px] font-bold text-[#1A1208]">
                {item.name}
              </p>
              <p className="text-[12px] text-[#A0917F] mt-0.5 truncate">
                {item.storeName}
              </p>
            </div>
            <span className={isGive ? "badge-free" : "badge-paid"}>
              {formatPrice(item.price, item.type)}
            </span>
          </div>

          <div className="h-px bg-[#EDE7DF] mb-1" />

          <InfoRow
            icon={<MapPin size={14} />}
            label="거리"
            value={`${item.distance}m`}
          />
          <InfoRow
            icon={<Clock size={14} />}
            label="픽업 가능"
            value={item.pickupEnd ? `오늘 ~ ${item.pickupEnd}` : "—"}
            highlight
          />
          <InfoRow
            icon={<Package size={14} />}
            label="잔여 수량"
            value={item.quantity != null ? `${item.quantity}개 남음` : "—"}
          />

          <div className="flex items-center justify-between bg-[#F6F1EB] rounded-xl px-4 py-3 mt-4 mb-3">
            <span className="text-[14px] font-semibold text-[#1A1208]">
              수량 선택
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg border border-[#DDD4C8] bg-white flex items-center justify-center"
              >
                <Minus size={16} className="text-[#1A1208]" />
              </button>
              <span className="text-[17px] font-bold text-[#1A1208] w-5 text-center">
                {qty}
              </span>
              <button
                onClick={() =>
                  setQty((q) => Math.min(Math.max(item.quantity, 1), q + 1))
                }
                className="w-8 h-8 rounded-lg border border-[#DDD4C8] bg-white flex items-center justify-center"
              >
                <Plus size={16} className="text-[#1A1208]" />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-amber-50 rounded-xl px-3.5 py-2.5 mb-4">
            <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <span className="text-[12px] text-amber-700">
              노쇼 시 포인트 차감 및 패널티가 적용돼요
            </span>
          </div>

          <div className="flex gap-2.5">
            <button onClick={onClose} className="flex-1 btn-outline">
              취소
            </button>
            <button
              onClick={handleReserve}
              disabled={loading}
              className="flex-[2] btn-primary disabled:opacity-60"
            >
              {loading ? "예약 중..." : "예약하기"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#F0EBE4] last:border-0">
      <div className="flex items-center gap-1.5 text-[13px] text-[#A0917F]">
        <span className="text-[#A0917F]">{icon}</span>
        {label}
      </div>
      <span
        className={`text-[13px] font-semibold ${highlight ? "text-[#7C4D2F]" : "text-[#1A1208]"}`}
      >
        {value}
      </span>
    </div>
  );
}

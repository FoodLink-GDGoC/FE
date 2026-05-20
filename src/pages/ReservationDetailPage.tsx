import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Package,
  Tag,
  Calendar,
  CircleCheck,
} from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Spinner from "../components/common/Spinner";
import { reservationApi } from "../api/reservations";
import {
  reservationStatusLabel,
  reservationStatusClass,
  formatPrice,
  getFoodEmoji,
} from "../utils";
import type { ReservationDetail } from "../types";

interface Props {
  reservationId: number;
  onBack: () => void;
}

export default function ReservationDetailPage({
  reservationId,
  onBack,
}: Props) {
  const [data, setData] = useState<ReservationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    reservationApi
      .getDetail(reservationId)
      .then(setData)
      .catch((err: unknown) => {
        console.error("[FoodLink] detail error:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [reservationId]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <PageHeader title="예약 상세" onBack={onBack} />
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col h-screen">
        <PageHeader title="예약 상세" onBack={onBack} />
        <p className="text-center text-[14px] text-[#A0917F] py-16">
          정보를 불러올 수 없어요
        </p>
      </div>
    );
  }

  const { item, status } = data;
  const { store } = item;
  const isConfirmed = status === "CONFIRMED";

  return (
    <div className="flex flex-col h-screen">
      <PageHeader title="예약 상세" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-5 pb-10 flex flex-col gap-3">
        {/* 확정 배너 */}
        {isConfirmed && (
          <div className="flex items-center gap-2.5 bg-[#E6F4EC] border border-[#A8D9BC] rounded-xl px-3.5 py-3">
            <div className="w-7 h-7 bg-[#2D7D52] rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleCheck size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#1A5C36]">
                예약이 확정됐어요!
              </p>
              <p className="text-[12px] text-[#2D7D52]">
                픽업 시간에 맞춰 방문해 주세요
              </p>
            </div>
          </div>
        )}

        {/* 예약 항목 */}
        <div className="card">
          <p className="text-[12px] font-bold text-[#A0917F] mb-3">예약 항목</p>
          <div className="flex gap-3 pb-3 mb-1 border-b border-[#F0EBE4]">
            {/* 이모지 폴백 */}
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
            <div>
              <p className="text-[15px] font-bold text-[#1A1208]">
                {item.name}
              </p>
              <p className="text-[12px] text-[#A0917F]">🏪 {store.storeName}</p>
              <p className="text-[11px] text-[#A0917F]">{store.address}</p>
            </div>
          </div>

          <InfoRow
            icon={<Package size={14} />}
            label="수량"
            value={`${data.quantity}개`}
          />
          <InfoRow
            icon={<Tag size={14} />}
            label="가격"
            value={formatPrice(item.price, item.type)}
            green={item.type === "GIVE"}
          />
          <InfoRow
            icon={<Clock size={14} />}
            label="픽업 시간"
            value={`오늘 ${item.pickupStart} ~ ${item.pickupEnd}`}
            brown
          />
          <InfoRow
            icon={<Calendar size={14} />}
            label="예약 일시"
            value={new Date(data.createdAt).toLocaleString("ko-KR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          />
          <InfoRow
            icon={<CircleCheck size={14} />}
            label="예약 상태"
            value={reservationStatusLabel[status]}
            customClass={reservationStatusClass[status]}
          />
        </div>

        {/* 매장 정보 */}
        <div className="card">
          <p className="text-[12px] font-bold text-[#A0917F] mb-3">매장 정보</p>
          <InfoRow
            icon={<MapPin size={14} />}
            label="매장명"
            value={store.storeName}
          />
          <InfoRow
            icon={<MapPin size={14} />}
            label="주소"
            value={store.address}
          />
        </div>

        {isConfirmed && (
          <div className="flex items-start gap-2 bg-amber-50 rounded-xl px-3.5 py-3">
            <span className="text-amber-600 text-[13px] flex-shrink-0">ℹ️</span>
            <span className="text-[12px] text-amber-700">
              노쇼 시 포인트가 차감되고 패널티가 적용돼요
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  green?: boolean;
  brown?: boolean;
  customClass?: string;
}

function InfoRow({
  icon,
  label,
  value,
  green,
  brown,
  customClass,
}: InfoRowProps) {
  const valueClass =
    customClass ??
    `text-[13px] font-semibold ${green ? "text-[#2D7D52]" : brown ? "text-[#7C4D2F]" : "text-[#1A1208]"}`;

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#F0EBE4] last:border-0">
      <div className="flex items-center gap-1.5 text-[13px] text-[#A0917F]">
        <span>{icon}</span>
        {label}
      </div>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

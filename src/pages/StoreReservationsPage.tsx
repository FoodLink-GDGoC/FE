import { useState, useEffect, useCallback } from "react";
import { Clock, AlertTriangle, Check } from "lucide-react";
import NavBar from "../components/common/NavBar";
import Spinner from "../components/common/Spinner";
import { storeApi } from "../api/store";
import { getFoodEmoji } from "../utils";
import type { StoreReservation, ReservationStatus } from "../types";

export default function StoreReservationsPage() {
  const [list, setList] = useState<StoreReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // 취소/픽업 완료 후 재호출용
  const refreshList = useCallback(() => {
    storeApi
      .getReservations()
      .then(setList)
      .catch((err: unknown) => {
        console.error("[FoodLink] store reservations refresh error:", err);
      });
  }, []);

  // 최초 로드
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const data = await storeApi.getReservations();
        if (!cancelled) setList(data);
      } catch (err: unknown) {
        if (!cancelled) {
          console.error("[FoodLink] store reservations error:", err);
          setList([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCancel = async (id: number) => {
    if (!confirm("예약을 취소할까요?")) return;
    try {
      setActionLoading(id);
      await storeApi.cancelReservation(id);
      refreshList();
    } catch {
      alert("취소 처리 중 오류가 발생했어요");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePickup = async (id: number) => {
    try {
      setActionLoading(id);
      await storeApi.pickupReservation(id);
      refreshList();
    } catch {
      alert("픽업 완료 처리 중 오류가 발생했어요");
    } finally {
      setActionLoading(null);
    }
  };

  const confirmedList = list.filter((r) => r.status === "CONFIRMED");
  const otherList = list.filter((r) => r.status !== "CONFIRMED");

  return (
    <div className="flex-1 overflow-y-auto pb-6 flex flex-col gap-3">
      <NavBar hasNotification />

      <div className="flex items-baseline gap-3 px-5 pb-2">
        <h1 className="text-[22px] font-black text-[#1A1208]">예약 목록</h1>
        {confirmedList.length > 0 && (
          <span className="text-[13px] font-bold text-[#7C4D2F]">
            픽업 예정 {confirmedList.length}건
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 flex flex-col gap-3">
        {loading ? (
          <Spinner />
        ) : list.length === 0 ? (
          <p className="text-center text-[14px] text-[#A0917F] py-16">
            예약 내역이 없어요
          </p>
        ) : (
          <>
            {confirmedList.length > 0 && (
              <div className="flex items-start gap-3 bg-white border border-[#DDD4C8] rounded-xl px-4 py-3">
                <Clock
                  size={16}
                  className="text-[#7C4D2F] flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-[13px] font-bold text-[#1A1208]">
                    오늘 픽업 예정 {confirmedList.length}건
                  </p>
                  <p className="text-[12px] text-[#A0917F]">
                    고객이 방문하기 전에 물품을 준비해 두세요
                  </p>
                </div>
              </div>
            )}

            {confirmedList.map((r) => (
              <ReservationCard
                key={r.reservationId}
                reservation={r}
                actionLoading={actionLoading === r.reservationId}
                onCancel={() => handleCancel(r.reservationId)}
                onPickup={() => handlePickup(r.reservationId)}
              />
            ))}

            {otherList.length > 0 && (
              <>
                <p className="text-[12px] font-semibold text-[#A0917F] mt-2">
                  지난 예약
                </p>
                {otherList.map((r) => (
                  <ReservationCard
                    key={r.reservationId}
                    reservation={r}
                    actionLoading={false}
                    onCancel={() => handleCancel(r.reservationId)}
                    onPickup={() => handlePickup(r.reservationId)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ReservationCard({
  reservation,
  actionLoading,
  onCancel,
  onPickup,
}: {
  reservation: StoreReservation;
  actionLoading: boolean;
  onCancel: () => void;
  onPickup: () => void;
}) {
  const { item, user, status, quantity } = reservation;
  const isConfirmed = status === "CONFIRMED";
  const isDone = status === "PICKUP";

  const pickupTimeLabel = item.pickupStart
    ? new Date(item.pickupStart).toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-3 pb-3 border-b border-[#F0EBE4]">
        <div className="w-10 h-10 rounded-xl bg-[#EDE7DF] flex items-center justify-center text-xl flex-shrink-0">
          {getFoodEmoji(item.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[#1A1208] truncate">
            {item.name}
          </p>
          <p className="text-[12px] text-[#A0917F]">{quantity}개</p>
        </div>
        {pickupTimeLabel && (
          <div className="flex items-center gap-1 text-[12px] font-bold text-[#7C4D2F]">
            <Clock size={13} />
            {pickupTimeLabel}
          </div>
        )}
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#A67355] flex items-center justify-center flex-shrink-0">
          <span className="text-[13px] font-bold text-white">
            {user.nickname.slice(0, 1)}
          </span>
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-[#1A1208]">
            {user.nickname}
          </p>
          {user.phone && (
            <p className="text-[12px] text-[#A0917F]">{user.phone}</p>
          )}
        </div>
      </div>

      {user.allergy && (
        <div className="flex items-center gap-1.5 text-[12px] text-red-500">
          <AlertTriangle size={13} />
          {user.allergy}
        </div>
      )}

      {isConfirmed && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            disabled={actionLoading}
            className="flex-1 py-2.5 rounded-xl border border-[#DDD4C8] text-[13px] font-semibold text-[#6B5A4E] bg-white disabled:opacity-50"
          >
            예약 취소
          </button>
          <button
            onClick={onPickup}
            disabled={actionLoading}
            className="flex-[2] py-2.5 rounded-xl bg-[#2D7D52] text-[13px] font-bold text-white disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <Check size={15} />
            픽업 완료
          </button>
        </div>
      )}

      {isDone && (
        <div className="flex items-center gap-1.5 text-[12px] text-[#2D7D52] font-semibold pt-1">
          <Check size={14} />
          픽업이 완료됐어요
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ReservationStatus }) {
  const map: Record<ReservationStatus, { label: string; cls: string }> = {
    CONFIRMED: { label: "확정", cls: "badge-confirm" },
    PICKUP: { label: "픽업완료", cls: "badge-done" },
    CANCEL: { label: "취소됨", cls: "badge-cancel" },
    NOSHOW: { label: "노쇼", cls: "badge-cancel" },
  };
  const { label, cls } = map[status];
  return <span className={cls}>{label}</span>;
}

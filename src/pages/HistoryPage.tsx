import { useState, useEffect } from "react";
import NavBar from "../components/common/NavBar";
import ReservationCard from "../components/history/ReservationCard";
import Spinner from "../components/common/Spinner";
import { reservationApi } from "../api/reservations";
import type { Reservation } from "../types";

interface Props {
  onSelectReservation: (id: number) => void;
}

export default function HistoryPage({ onSelectReservation }: Props) {
  const [list, setList] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    reservationApi
      .getList(controller.signal)
      .then(setList)
      .catch((err: unknown) => {
        if (isCanceled(err)) return;
        console.error("[FoodLink] reserve list error:", err);
        setError("예약 내역을 불러오지 못했어요");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar hasNotification showSettings />
      <div className="px-5 pb-2">
        <h1 className="text-[22px] font-black text-[#1A1208]">내 예약</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-[14px] text-[#A0917F] py-16">
            {error}
          </p>
        ) : list.length === 0 ? (
          <p className="text-center text-[14px] text-[#A0917F] py-16">
            예약 내역이 없어요
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((res) => (
              <ReservationCard
                key={res.reservationId}
                reservation={res}
                onClick={() => onSelectReservation(res.reservationId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function isCanceled(err: unknown): boolean {
  return (
    err instanceof Error &&
    (err.name === "CanceledError" || err.message === "canceled")
  );
}

import { useState, useEffect, useCallback } from "react";
import { Building2 } from "lucide-react";
import NavBar from "../components/common/NavBar";
import SearchBar from "../components/home/SearchBar";
import MapBlock from "../components/home/MapBlock";
import FoodCard from "../components/common/FoodCard";
import ReservationSheet from "../components/reservation/ReservationSheet";
import ReservationSuccessModal from "../components/reservation/ReservationSuccessModal";
import Spinner from "../components/common/Spinner";
import { itemsApi } from "../api/items";
import type { NearbyResult } from "../api/items";
import type { NearbyItem } from "../types";
import { formatDistance } from "../utils";

const DEFAULT_LAT = 37.5563;
const DEFAULT_LNG = 126.924;
const EMPTY_RESULT: NearbyResult = { items: [], emptyStores: [] };

interface Props {
  onGoHistory: () => void;
}

export default function HomePage({ onGoHistory }: Props) {
  const [result, setResult] = useState<NearbyResult>(EMPTY_RESULT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<NearbyItem | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    id: number;
    item: NearbyItem;
  } | null>(null);

  const refreshItems = useCallback(() => {
    itemsApi
      .getNearby(DEFAULT_LAT, DEFAULT_LNG, 5000)
      .then(setResult)
      .catch((err: unknown) => {
        if (isCanceled(err)) return;
        console.error("[FoodLink] nearby refresh error:", err);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await itemsApi.getNearby(
          DEFAULT_LAT,
          DEFAULT_LNG,
          5000,
          controller.signal,
        );
        if (!cancelled) setResult(data);
      } catch (err: unknown) {
        if (cancelled || isCanceled(err)) return;
        console.error("[FoodLink] nearby error:", err);
        if (!cancelled) setError("주변 정보를 불러오지 못했어요");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const handleReserveSuccess = (id: number) => {
    setSelectedItem(null);
    if (selectedItem) setSuccessInfo({ id, item: selectedItem });
    refreshItems();
  };

  const hasContent = result.items.length > 0 || result.emptyStores.length > 0;

  return (
    <div className="flex flex-col h-screen">
      <NavBar hasNotification />
      <SearchBar />

      <MapBlock result={result} onPinClick={setSelectedItem} />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
        <h2 className="text-[16px] font-black text-[#1A1208] mb-3">
          오늘의 가치 🌿
        </h2>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-[14px] text-[#A0917F] mb-3">{error}</p>
            <button
              onClick={refreshItems}
              className="text-[13px] text-[#7C4D2F] underline"
            >
              다시 시도
            </button>
          </div>
        ) : !hasContent ? (
          <p className="text-center text-[14px] text-[#A0917F] py-12">
            주변에 나눔 중인 음식이 없어요
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {result.items.map((item) => (
              <FoodCard
                key={item.itemId}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}

            {result.emptyStores.length > 0 && (
              <>
                <p className="text-[12px] font-semibold text-[#A0917F] mt-2 mb-1">
                  근처 매장
                </p>
                {result.emptyStores.map((store) => (
                  <div
                    key={store.storeId}
                    className="flex items-center gap-3 bg-white border border-[#DDD4C8] rounded-xl p-3 opacity-60"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#EDE7DF] flex items-center justify-center flex-shrink-0">
                      <Building2 size={20} className="text-[#A0917F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-[#1A1208] truncate">
                        {store.storeName}
                      </p>
                      <p className="text-[12px] text-[#A0917F] mt-0.5">
                        {formatDistance(store.distance)} · 현재 나눔 준비 중
                      </p>
                    </div>
                    <span className="text-[11px] text-[#A0917F] bg-[#EDE7DF] px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                      준비 중
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {selectedItem && (
        <ReservationSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSuccess={handleReserveSuccess}
        />
      )}

      {successInfo && (
        <ReservationSuccessModal
          itemName={successInfo.item.name}
          storeName={successInfo.item.storeName}
          reservationId={successInfo.id}
          onViewHistory={() => {
            setSuccessInfo(null);
            onGoHistory();
          }}
        />
      )}
    </div>
  );
}

function isCanceled(err: unknown): boolean {
  return (
    err instanceof Error &&
    (err.name === "CanceledError" || err.message === "canceled")
  );
}

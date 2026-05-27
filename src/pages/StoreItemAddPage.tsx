import { useState } from "react";
import { Camera, ToggleLeft, ToggleRight } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import { storeApi } from "../api/store";
import type { ItemType } from "../types";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export default function StoreItemAddPage({ onBack, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [price, setPrice] = useState("");
  const [type, setType] = useState<ItemType>("GIVE");
  const [pickupDate, setPickupDate] = useState(todayStr());
  const [pickupStart, setPickupStart] = useState("17:00");
  const [pickupEnd, setPickupEnd] = useState("19:00");
  const [welfareLink, setWelfareLink] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name) {
      setError("음식 이름을 입력해 주세요");
      return;
    }
    if (type === "SELL" && !price) {
      setError("가격을 입력해 주세요");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await storeApi.addItem({
        name,
        quantity,
        price: type === "GIVE" ? 0 : parseInt(price, 10),
        type,
        pickupStart: toISO(pickupDate, pickupStart),
        pickupEnd: toISO(pickupDate, pickupEnd),
      });
      onSuccess();
    } catch {
      setError("등록에 실패했어요. 다시 시도해 주세요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F6F1EB]">
      <PageHeader title="음식 등록" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-5 pb-10 flex flex-col gap-5">
        {/* 사진 첨부 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#6B5A4E]">
            사진 첨부
          </label>
          <div className="bg-white border border-dashed border-[#C9BFB2] rounded-xl py-8 flex flex-col items-center gap-2">
            <Camera size={28} className="text-[#A67355]" />
            <span className="text-[13px] text-[#A0917F]">
              사진을 추가하세요
            </span>
          </div>
        </div>

        {/* 음식 이름 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#6B5A4E]">
            음식 이름
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예) 크루아상, 도시락..."
            className="input-field"
          />
        </div>

        {/* 수량 / 가격 */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-semibold text-[#6B5A4E]">
              수량
            </label>
            <div className="bg-white border border-[#DDD4C8] rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-[16px] font-bold text-[#1A1208]">
                {quantity}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 bg-[#EDE7DF] rounded-lg flex items-center justify-center text-[#1A1208] font-bold"
                >
                  −
                </button>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 bg-[#EDE7DF] rounded-lg flex items-center justify-center text-[#1A1208] font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-semibold text-[#6B5A4E]">
              가격
            </label>
            {type === "GIVE" ? (
              <div className="bg-white border border-[#DDD4C8] rounded-xl px-4 py-3">
                <span className="text-[15px] text-[#A0917F]">0원 (무료)</span>
              </div>
            ) : (
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="가격 입력"
                className="input-field"
              />
            )}
          </div>
        </div>

        {/* 픽업 날짜 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#6B5A4E]">
            픽업 날짜
          </label>
          <input
            type="date"
            value={pickupDate}
            min={todayStr()}
            onChange={(e) => setPickupDate(e.target.value)}
            className="input-field"
          />
        </div>

        {/* 픽업 가능 시간 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#6B5A4E]">
            픽업 가능 시간
          </label>
          <div className="flex items-center gap-2 bg-white border border-[#DDD4C8] rounded-xl px-4 py-3">
            <input
              type="time"
              value={pickupStart}
              onChange={(e) => setPickupStart(e.target.value)}
              className="flex-1 outline-none text-[15px] text-[#1A1208] bg-transparent"
            />
            <span className="text-[#A0917F] font-semibold">~</span>
            <input
              type="time"
              value={pickupEnd}
              onChange={(e) => setPickupEnd(e.target.value)}
              className="flex-1 outline-none text-[15px] text-[#1A1208] bg-transparent"
            />
          </div>
        </div>

        {/* 나눔 / 판매 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#6B5A4E]">
            나눔 / 판매
          </label>
          <div className="flex gap-3">
            {(["GIVE", "SELL"] as ItemType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2.5 rounded-xl text-[14px] font-semibold border transition-colors
                  ${
                    type === t
                      ? "bg-[#FDF3EC] border-[#D4956A] text-[#7C4D2F]"
                      : "bg-white border-[#DDD4C8] text-[#A0917F]"
                  }`}
              >
                {t === "GIVE" ? "나눔" : "저렴하게 판매"}
              </button>
            ))}
          </div>
        </div>

        {/* 복지기관 연결 토글 */}
        <div className="flex items-center gap-3 bg-[#E6F4EC] border border-[#A8D9BC] rounded-xl px-4 py-3">
          <span className="text-[20px]">🏛</span>
          <span className="flex-1 text-[13px] text-[#1A5C36] font-medium">
            미수령 시 복지기관에 자동 연결
          </span>
          <button onClick={() => setWelfareLink((v) => !v)}>
            {welfareLink ? (
              <ToggleRight size={32} className="text-[#2D7D52]" />
            ) : (
              <ToggleLeft size={32} className="text-[#A0917F]" />
            )}
          </button>
        </div>

        {error && <p className="text-[13px] text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function toISO(date: string, time: string): string {
  return new Date(`${date}T${time}:00`).toISOString();
}

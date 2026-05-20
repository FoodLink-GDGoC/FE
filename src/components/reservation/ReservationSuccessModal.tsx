import { CheckCircle } from 'lucide-react';

interface Props {
  itemName: string;
  storeName: string;
  reservationId: number;
  onViewHistory: () => void;
}

export default function ReservationSuccessModal({
  itemName, storeName, reservationId, onViewHistory,
}: Props) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-7 w-full text-center">
          {/* 아이콘 */}
          <div className="w-16 h-16 bg-[#E6F4EC] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={34} className="text-[#2D7D52]" />
          </div>

          <h2 className="text-[20px] font-black text-[#1A1208] mb-2">예약 완료!</h2>
          <p className="text-[14px] text-[#A0917F] leading-relaxed mb-5">
            {itemName}<br />
            {storeName}에서 픽업 대기 중이에요
          </p>

          <div className="inline-flex items-center gap-1.5 bg-[#EDE7DF] px-4 py-2 rounded-full text-[13px] text-[#6B5A4E] mb-5">
            🎉 예약번호 #{reservationId}가 발급됐어요
          </div>

          <button onClick={onViewHistory} className="btn-primary">
            내 예약 확인하기 →
          </button>
        </div>
      </div>
    </>
  );
}

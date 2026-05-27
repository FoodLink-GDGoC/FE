import { Plus, ClipboardList, QrCode, User } from "lucide-react";

export type StoreTabKey = "add" | "reservations" | "qr" | "my";

interface Props {
  active: StoreTabKey;
  onChange: (tab: StoreTabKey) => void;
}

const TABS: { key: StoreTabKey; label: string; Icon: React.ElementType }[] = [
  { key: "add", label: "나눔 등록", Icon: Plus },
  { key: "reservations", label: "예약 목록", Icon: ClipboardList },
  { key: "qr", label: "QR 스캔", Icon: QrCode },
  { key: "my", label: "마이", Icon: User },
];

export default function StoreBottomTab({ active, onChange }: Props) {
  return (
    <nav className="h-[80px] flex-shrink-0 bg-white border-t border-[#DDD4C8] flex z-20">
      {TABS.map(({ key, label, Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors
            ${active === key ? "text-[#7C4D2F]" : "text-[#A0917F]"}`}
        >
          <Icon size={22} strokeWidth={active === key ? 2.2 : 1.7} />
          {label}
        </button>
      ))}
    </nav>
  );
}

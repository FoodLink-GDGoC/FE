import { MapPin, Heart, Clock, User } from "lucide-react";

export type TabKey = "home" | "wish" | "history" | "my";

interface Props {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; Icon: React.ElementType }[] = [
  { key: "home", label: "탐색", Icon: MapPin },
  { key: "wish", label: "찜", Icon: Heart },
  { key: "history", label: "내역", Icon: Clock },
  { key: "my", label: "마이", Icon: User },
];

export default function BottomTab({ active, onChange }: Props) {
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-[#DDD4C8] flex z-20 flex-shrink-0">
      {TABS.map(({ key, label, Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 flex flex-col items-center gap-1 py-2.5 pb-6 text-[10px] font-medium transition-colors
            ${active === key ? "text-[#7C4D2F]" : "text-[#A0917F]"}`}
        >
          <Icon size={22} strokeWidth={active === key ? 2.2 : 1.7} />
          {label}
        </button>
      ))}
    </nav>
  );
}

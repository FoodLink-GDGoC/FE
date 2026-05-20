import { Bell, SlidersHorizontal, Settings } from "lucide-react";

interface NavBarProps {
  hasNotification?: boolean;
  showSettings?: boolean;
}

export default function NavBar({ hasNotification, showSettings }: NavBarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-5 pt-3 pb-2 bg-[#F6F1EB]">
      <span className="text-[20px] font-black text-[#7C4D2F] tracking-tight">
        FOODLINK
      </span>
      <div className="flex gap-2">
        <button className="relative w-9 h-9 rounded-full bg-[#EDE7DF] border border-[#DDD4C8] flex items-center justify-center">
          <Bell size={17} className="text-[#1A1208]" />
          {hasNotification && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F6F1EB]" />
          )}
        </button>
        <button className="w-9 h-9 rounded-full bg-[#EDE7DF] border border-[#DDD4C8] flex items-center justify-center">
          {showSettings ? (
            <Settings size={17} className="text-[#1A1208]" />
          ) : (
            <SlidersHorizontal size={17} className="text-[#1A1208]" />
          )}
        </button>
      </div>
    </header>
  );
}

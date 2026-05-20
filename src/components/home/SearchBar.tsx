import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="mx-5 mb-3 flex items-center gap-2.5 bg-white border border-[#DDD4C8] rounded-xl px-3.5 py-2.5">
      <Search size={17} className="text-[#A0917F] flex-shrink-0" />
      <span className="flex-1 text-[14px] text-[#A0917F]">내 주변 음식 검색...</span>
      <span className="bg-[#EDE7DF] text-[#7C4D2F] text-[11px] font-bold px-2.5 py-1 rounded-full">500m</span>
    </div>
  );
}

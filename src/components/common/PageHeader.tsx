import { ArrowLeft } from 'lucide-react';

interface Props { title: string; onBack: () => void; }

export default function PageHeader({ title, onBack }: Props) {
  return (
    <header className="flex items-center gap-3 px-5 pt-3 pb-2 bg-[#F6F1EB]">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-[#EDE7DF] border border-[#DDD4C8] flex items-center justify-center"
      >
        <ArrowLeft size={18} className="text-[#1A1208]" />
      </button>
      <span className="text-[17px] font-bold text-[#1A1208]">{title}</span>
    </header>
  );
}

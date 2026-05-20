import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function TokenSetupPage() {
  const { token, setToken, clearToken } = useAuthStore();
  const [input, setInput] = useState('');

  const handleSave = () => {
    if (input.trim()) {
      setToken(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F6F1EB]">
      {/* 헤더 */}
      <div className="bg-[#5C3820] px-5 py-10 flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
          <KeyRound size={32} className="text-white" />
        </div>
        <p className="text-white text-[22px] font-black">FOODLINK</p>
        <p className="text-white/60 text-[13px]">개발용 토큰 설정</p>
      </div>

      <div className="flex-1 px-5 pt-8 flex flex-col gap-4">
        <p className="text-[14px] text-[#6B5A4E] leading-relaxed">
          Swagger에서 발급받은 Bearer 토큰을 아래에 입력해 주세요.
          <br /><br />
          테스트 계정: <strong>hihi@gmail.com</strong> / <strong>hihihihi</strong>
        </p>

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiJ9..."
          rows={4}
          className="input-field resize-none font-mono text-[12px]"
        />

        <button onClick={handleSave} disabled={!input.trim()} className="btn-primary disabled:opacity-50">
          토큰 저장
        </button>

        {token && (
          <div className="card bg-[#E6F4EC] border-[#A8D9BC]">
            <p className="text-[12px] font-bold text-[#1A5C36] mb-1">✓ 토큰 저장됨</p>
            <p className="text-[11px] text-[#2D7D52] font-mono break-all">{token.slice(0, 40)}...</p>
            <button onClick={clearToken} className="mt-3 text-[12px] text-red-500 underline">
              토큰 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

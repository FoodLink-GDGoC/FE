import { useState } from "react";
import { userAuthApi, storeAuthApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import type { UserRole } from "../types";

interface Props {
  onSuccess: () => void;
  onGoSignup: (role: UserRole) => void;
}

export default function LoginPage({ onSuccess, onGoSignup }: Props) {
  const [role, setRole] = useState<UserRole>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해 주세요");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const token =
        role === "user"
          ? await userAuthApi.login(email, password)
          : await storeAuthApi.login(email, password);
      setAuth(token, role);
      onSuccess();
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않아요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1EB]">
      {/* 상단 헤더 */}
      <div className="bg-[#5C3820] px-6 py-12 flex flex-col items-center gap-2">
        <span className="text-[28px] font-black text-[#F6F1EB] tracking-tight">
          FOODLINK
        </span>
        <span className="text-[13px] text-white/50">음식 낭비 없는 연결</span>
      </div>

      <div className="flex-1 px-6 pt-8 flex flex-col gap-5">
        <h2 className="text-[22px] font-black text-[#1A1208]">로그인</h2>

        {/* 역할 탭 */}
        <div className="flex bg-[#EDE7DF] rounded-xl p-1">
          {(["user", "store"] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                setError("");
              }}
              className={`flex-1 py-2.5 rounded-lg text-[14px] font-semibold transition-colors
                ${role === r ? "bg-white text-[#1A1208] shadow-sm" : "text-[#A0917F]"}`}
            >
              {r === "user" ? "일반 사용자" : "매장 사장님"}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <InputField
            label="이메일"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="example@email.com"
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호 입력"
          />
        </div>

        {error && <p className="text-[13px] text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary disabled:opacity-60 mt-1"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-[#DDD4C8]" />
          <span className="text-[12px] text-[#A0917F]">또는</span>
          <div className="flex-1 h-px bg-[#DDD4C8]" />
        </div>

        <p className="text-[14px] text-center text-[#6B5A4E]">
          아직 계정이 없으신가요?{" "}
          <button
            onClick={() => onGoSignup(role)}
            className="text-[#7C4D2F] font-bold underline"
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-[#6B5A4E]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
}

import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { userAuthApi } from "../api/auth";
import type { UserSignupBody } from "../api/auth";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export default function SignupUserPage({ onBack, onSuccess }: Props) {
  const [form, setForm] = useState<UserSignupBody>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof UserSignupBody) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSignup = async () => {
    if (
      !form.nickname ||
      !form.email ||
      !form.password ||
      !form.passwordConfirm
    ) {
      setError("모든 항목을 입력해 주세요");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않아요");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await userAuthApi.signup(form);
      onSuccess();
    } catch {
      setError("회원가입에 실패했어요. 다시 시도해 주세요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1EB]">
      <PageHeader title="일반 사용자 회원가입" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-10 flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 bg-[#EDE7DF] px-3 py-1.5 rounded-full w-fit">
          <span className="text-[13px]">🙋</span>
          <span className="text-[13px] font-semibold text-[#6B5A4E]">
            일반 사용자
          </span>
        </div>

        <Field
          label="닉네임"
          value={form.nickname}
          onChange={set("nickname")}
          placeholder="닉네임 입력"
        />
        <Field
          label="이메일"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="example@email.com"
        />
        <Field
          label="비밀번호"
          type="password"
          value={form.password}
          onChange={set("password")}
          placeholder="8자 이상 입력"
        />
        <Field
          label="비밀번호 확인"
          type="password"
          value={form.passwordConfirm}
          onChange={set("passwordConfirm")}
          placeholder="비밀번호 재입력"
        />

        {/* 약관 */}
        <div className="bg-[#EDE7DF] rounded-xl p-4 flex flex-col gap-2.5 text-[13px] text-[#6B5A4E]">
          <div className="flex justify-between">
            <span className="font-bold">전체 동의</span>
          </div>
          <div className="h-px bg-[#DDD4C8]" />
          <div className="flex justify-between">
            <span>[필수] 서비스 이용약관</span>
            <span className="text-[#7C4D2F] font-semibold">보기</span>
          </div>
          <div className="flex justify-between">
            <span>[필수] 개인정보 처리방침</span>
            <span className="text-[#7C4D2F] font-semibold">보기</span>
          </div>
          <div className="flex justify-between">
            <span>[선택] 마케팅 정보 수신</span>
            <span className="text-[#7C4D2F] font-semibold">보기</span>
          </div>
        </div>

        {error && <p className="text-[13px] text-red-500">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "가입 중..." : "가입하기"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
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

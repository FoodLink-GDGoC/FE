import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { storeAuthApi } from "../api/auth";
import type { StoreSignupBody } from "../api/auth";

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export default function SignupStorePage({ onBack, onSuccess }: Props) {
  const [form, setForm] = useState<
    Omit<StoreSignupBody, "lat" | "lng"> & { lat: string; lng: string }
  >({
    storeName: "",
    ownerName: "",
    email: "",
    address: "",
    lat: "",
    lng: "",
    storeNumber: "",
    password1: "",
    password2: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSignup = async () => {
    const required = [
      "storeName",
      "ownerName",
      "email",
      "address",
      "storeNumber",
      "password1",
      "password2",
    ] as const;
    if (required.some((k) => !form[k])) {
      setError("필수 항목을 모두 입력해 주세요");
      return;
    }
    if (form.password1 !== form.password2) {
      setError("비밀번호가 일치하지 않아요");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await storeAuthApi.signup({
        ...form,
        lat: parseFloat(form.lat) || 0,
        lng: parseFloat(form.lng) || 0,
      });
      onSuccess();
    } catch {
      setError("회원가입에 실패했어요. 다시 시도해 주세요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1EB]">
      <PageHeader title="매장 회원가입" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-10 flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 bg-[#EDE7DF] px-3 py-1.5 rounded-full w-fit">
          <span className="text-[13px]">🏪</span>
          <span className="text-[13px] font-semibold text-[#6B5A4E]">
            매장 사장님
          </span>
        </div>

        <Field
          label="매장 이름"
          value={form.storeName}
          onChange={set("storeName")}
          placeholder="매장 이름 입력"
        />
        <Field
          label="사장님 이름"
          value={form.ownerName}
          onChange={set("ownerName")}
          placeholder="이름 입력"
        />
        <Field
          label="매장 위치 (주소)"
          value={form.address}
          onChange={set("address")}
          placeholder="서울 마포구 망원동 123-4"
        />
        <Field
          label="매장 전화번호"
          value={form.storeNumber}
          onChange={set("storeNumber")}
          placeholder="02-0000-0000"
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
          value={form.password1}
          onChange={set("password1")}
          placeholder="8자 이상 입력"
        />
        <Field
          label="비밀번호 확인"
          type="password"
          value={form.password2}
          onChange={set("password2")}
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

import { useState } from "react";
import { useAuthStore } from "./store/authStore";
import type { UserRole } from "./types";
import type { TabKey } from "./components/common/BottomTab";
import type { StoreTabKey } from "./components/store/StoreBottomTab";

import BottomTab from "./components/common/BottomTab";
import StoreBottomTab from "./components/store/StoreBottomTab";

import LoginPage from "./pages/LoginPage";
import SignupUserPage from "./pages/SignupUserPage";
import SignupStorePage from "./pages/SignupStorePage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import ReservationDetailPage from "./pages/ReservationDetailPage";
import StoreItemAddPage from "./pages/StoreItemAddPage";
import StoreReservationsPage from "./pages/StoreReservationsPage";

type View =
  | { type: "login" }
  | { type: "signup-user" }
  | { type: "signup-store" }
  | { type: "signup-success" }
  | { type: "user-tab"; tab: TabKey }
  | { type: "reservation-detail"; id: number }
  | { type: "store-tab"; tab: StoreTabKey };

export default function App() {
  const { token, role, clearAuth } = useAuthStore();
  const [view, setView] = useState<View>({ type: "login" });

  const handleLogout = () => {
    clearAuth();
    setView({ type: "login" });
  };

  const handleLoginSuccess = () => {
    const r = useAuthStore.getState().role;
    setView(
      r === "store"
        ? { type: "store-tab", tab: "reservations" }
        : { type: "user-tab", tab: "home" },
    );
  };

  // 로그인/회원가입
  if (view.type === "login") {
    return (
      <LoginPage
        onSuccess={handleLoginSuccess}
        onGoSignup={(r: UserRole) =>
          setView(
            r === "store" ? { type: "signup-store" } : { type: "signup-user" },
          )
        }
      />
    );
  }

  if (view.type === "signup-user") {
    return (
      <SignupUserPage
        onBack={() => setView({ type: "login" })}
        onSuccess={() => setView({ type: "signup-success" })}
      />
    );
  }

  if (view.type === "signup-store") {
    return (
      <SignupStorePage
        onBack={() => setView({ type: "login" })}
        onSuccess={() => setView({ type: "signup-success" })}
      />
    );
  }

  if (view.type === "signup-success") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 px-8 text-center bg-[#F6F1EB]">
        <span className="text-[56px]">🎉</span>
        <h2 className="text-[24px] font-black text-[#1A1208]">가입 완료!</h2>
        <p className="text-[14px] text-[#A0917F]">로그인해서 시작해 보세요</p>
        <button
          onClick={() => setView({ type: "login" })}
          className="btn-primary mt-2 w-full"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  if (!token) {
    setView({ type: "login" });
    return null;
  }

  // 매장 사장님
  if (role === "store") {
    const storeTab = view.type === "store-tab" ? view.tab : "reservations";

    return (
      <div className="flex flex-col h-screen bg-[#F6F1EB]">
        <div className="flex-1 overflow-hidden">
          {storeTab === "add" && (
            <StoreItemAddPage
              onBack={() => setView({ type: "store-tab", tab: "reservations" })}
              onSuccess={() =>
                setView({ type: "store-tab", tab: "reservations" })
              }
            />
          )}
          {storeTab === "reservations" && <StoreReservationsPage />}
          {storeTab === "qr" && (
            <div className="flex items-center justify-center h-full text-[#A0917F] text-[15px]">
              QR 스캔 (준비 중)
            </div>
          )}
          {storeTab === "my" && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-[15px] text-[#A0917F]">마이페이지 (준비 중)</p>
              <button onClick={handleLogout} className="btn-danger w-40">
                로그아웃
              </button>
            </div>
          )}
        </div>
        <StoreBottomTab
          active={storeTab}
          onChange={(tab) => setView({ type: "store-tab", tab })}
        />
      </div>
    );
  }

  // 일반 사용자
  if (view.type === "reservation-detail") {
    return (
      <ReservationDetailPage
        reservationId={view.id}
        onBack={() => setView({ type: "user-tab", tab: "history" })}
      />
    );
  }

  const userTab = view.type === "user-tab" ? view.tab : "home";

  return (
    <div className="flex flex-col h-screen bg-[#F6F1EB]">
      <div className="flex-1 overflow-hidden">
        {userTab === "home" && (
          <HomePage
            onGoHistory={() => setView({ type: "user-tab", tab: "history" })}
          />
        )}
        {userTab === "history" && (
          <HistoryPage
            onSelectReservation={(id) =>
              setView({ type: "reservation-detail", id })
            }
          />
        )}
        {userTab === "wish" && (
          <div className="flex items-center justify-center h-full text-[#A0917F] text-[15px]">
            찜 (준비 중)
          </div>
        )}
        {userTab === "my" && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-[15px] text-[#A0917F]">마이페이지 (준비 중)</p>
            <button onClick={handleLogout} className="btn-danger w-40">
              로그아웃
            </button>
          </div>
        )}
      </div>
      <BottomTab
        active={userTab}
        onChange={(tab) => setView({ type: "user-tab", tab })}
      />
    </div>
  );
}

import { useState } from 'react';
import BottomTab, { type TabKey } from './components/common/BottomTab';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import ReservationDetailPage from './pages/ReservationDetailPage';
import TokenSetupPage from './pages/TokenSetupPage';
import { useAuthStore } from './store/authStore';

type View =
  | { type: 'tab'; tab: TabKey }
  | { type: 'reservation-detail'; id: number };

export default function App() {
  const { token } = useAuthStore();
  const [view, setView] = useState<View>({ type: 'tab', tab: 'home' });
  const activeTab = view.type === 'tab' ? view.tab : 'history';

  const goTab = (tab: TabKey) => setView({ type: 'tab', tab });
  const goDetail = (id: number) => setView({ type: 'reservation-detail', id });
  const goBack = () => setView({ type: 'tab', tab: 'history' });

  if (!token) return <TokenSetupPage />;

  return (
    <>
      {view.type === 'tab' && view.tab === 'home'    && <HomePage onGoHistory={() => goTab('history')} />}
      {view.type === 'tab' && view.tab === 'history' && <HistoryPage onSelectReservation={goDetail} />}
      {view.type === 'tab' && view.tab === 'wish'    && <PlaceholderPage title="찜" />}
      {view.type === 'tab' && view.tab === 'my'      && <PlaceholderPage title="마이페이지" />}
      {view.type === 'reservation-detail'            && <ReservationDetailPage reservationId={view.id} onBack={goBack} />}
      {view.type === 'tab' && <BottomTab active={activeTab} onChange={goTab} />}
    </>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-screen text-[#A0917F] text-[15px]">
      {title} (준비 중)
    </div>
  );
}

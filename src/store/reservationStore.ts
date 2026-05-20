import { create } from 'zustand';
import type { NearbyItem } from '../types';

interface ReservationState {
  selectedItem: NearbyItem | null;
  isSheetOpen: boolean;
  openSheet: (item: NearbyItem) => void;
  closeSheet: () => void;
}

export const useReservationStore = create<ReservationState>()((set) => ({
  selectedItem: null,
  isSheetOpen: false,
  openSheet: (item) => set({ selectedItem: item, isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),
}));

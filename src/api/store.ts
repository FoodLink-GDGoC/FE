import api from "./client";
import type { StoreReservation, StoreReservationRaw } from "../types";

export interface AddItemBody {
  name: string;
  quantity: number;
  price: number;
  type: "GIVE" | "SELL";
  pickupStart: string;
  pickupEnd: string;
  image?: string;
}

export const storeApi = {
  // POST /api/store/item/add
  addItem: async (body: AddItemBody): Promise<void> => {
    await api.post("/api/store/item/add", body);
  },

  // GET /api/store/reservations
  getReservations: async (): Promise<StoreReservation[]> => {
    const { data } = await api.get<StoreReservationRaw[]>(
      "/api/store/reservations",
    );

    const raw: StoreReservationRaw[] = Array.isArray(data)
      ? data
      : Array.isArray((data as { data: StoreReservationRaw[] }).data)
        ? (data as { data: StoreReservationRaw[] }).data
        : [];

    return raw.map(normalizeReservation);
  },

  // PATCH /api/store/reservations/:id/cancel
  cancelReservation: async (reservationId: number): Promise<void> => {
    await api.patch(`/api/store/reservations/${reservationId}/cancel`);
  },

  // PATCH /api/store/reservations/:id/pickup
  pickupReservation: async (reservationId: number): Promise<void> => {
    await api.patch(`/api/store/reservations/${reservationId}/pickup`);
  },
};

function normalizeReservation(raw: StoreReservationRaw): StoreReservation {
  return {
    reservationId: raw.reservationId,
    quantity: raw.quantity,
    status: raw.status,
    createdAt: raw.createdAt,
    pickedUpAt: raw.pickedUpAt,
    user: raw.user,
    item: {
      itemId: raw.item.itemId,
      name: raw.item.name,
      quantity: raw.item.quantity,
      price: raw.item.price,
      type: raw.item.type,
      pickupStart: raw.item.pickup_start,
      pickupEnd: raw.item.pickup_end,
      image: raw.item.image,
    },
  };
}

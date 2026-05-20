import api from "./client";
import type {
  ApiResponse,
  Reservation,
  ReservationDetail,
  CreateReservationResponse,
} from "../types";

export const reservationApi = {
  /** POST /api/user/reserve/items/:itemId */
  create: async (
    itemId: number,
    quantity: number,
  ): Promise<CreateReservationResponse> => {
    const { data: res } = await api.post<
      ApiResponse<CreateReservationResponse>
    >(`/api/user/reserve/items/${itemId}`, { quantity });
    return res.data;
  },

  /** GET /api/user/reserve */
  getList: async (signal?: AbortSignal): Promise<Reservation[]> => {
    const { data: res } = await api.get<
      ApiResponse<{ reservations: Reservation[] }>
    >("/api/user/reserve", { signal });
    return res.data.reservations;
  },

  /** GET /api/user/reserve/reservations/:reservationId */
  getDetail: async (reservationId: number): Promise<ReservationDetail> => {
    const { data: res } = await api.get<ApiResponse<ReservationDetail>>(
      `/api/user/reserve/reservations/${reservationId}`,
    );
    return res.data;
  },
};

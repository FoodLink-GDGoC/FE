export type ItemStatus = "ACTIVE" | "RESERVED" | "DONE";
export type ItemType = "GIVE" | "SELL";
export type ReservationStatus = "CONFIRMED" | "PICKUP" | "CANCEL" | "NOSHOW";
export type UserRole = "user" | "store";

export interface NearbyItemRaw {
  itemId: number;
  name: string;
  price: number;
  type: ItemType;
  pickupEnd: string;
  status: ItemStatus;
  availableQty: number;
  image?: string;
}

export interface NearbyStore {
  storeId: number;
  storeName: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  items: NearbyItemRaw[];
}

export interface NearbyItem {
  itemId: number;
  name: string;
  price: number;
  type: ItemType;
  pickupStart: string;
  pickupEnd: string;
  status: ItemStatus;
  quantity: number;
  storeId: number;
  storeName: string;
  storeAddress: string;
  distance: number;
  image?: string;
}

export interface ReservationItem {
  itemId: number;
  name: string;
  price: number;
  type: ItemType;
  pickupStart: string;
  pickupEnd: string;
  image?: string;
}

export interface ReservationStore {
  storeId: number;
  storeName: string;
}

export interface Reservation {
  reservationId: number;
  quantity: number;
  status: ReservationStatus;
  createdAt: string;
  pickedUpAt: string | null;
  item: ReservationItem;
  store: ReservationStore;
}

export interface ReservationDetailStore {
  storeId: number;
  storeName: string;
  address: string;
}

export interface ReservationDetailItem {
  itemId: number;
  name: string;
  price: number;
  type: ItemType;
  pickupStart: string;
  pickupEnd: string;
  image?: string;
  store: ReservationDetailStore;
}

export interface ReservationDetail {
  reservationId: number;
  quantity: number;
  status: ReservationStatus;
  createdAt: string;
  pickedUpAt: string | null;
  item: ReservationDetailItem;
  user: {
    userId: number;
    nickname: string;
    email: string;
  };
}

export interface CreateReservationResponse {
  reservationId: number;
  status: ReservationStatus;
  quantity: number;
  createdAt: string;
  item: {
    itemId: number;
    name: string;
    pickupStart: string;
    pickupEnd: string;
  };
  store: {
    storeId: number;
    storeName: string;
  };
}

// ── 매장 예약 목록 raw 응답 ────────────────────────────
export interface StoreReservationItemRaw {
  itemId: number;
  name: string;
  quantity: number;
  price: number;
  type: ItemType;
  pickup_start: string; // snake_case
  pickup_end: string; // snake_case
  image?: string;
}

export interface StoreReservationUser {
  userId: number;
  nickname: string;
  email: string;
  phone?: string;
  allergy?: string;
}

export interface StoreReservationRaw {
  reservationId: number;
  quantity: number;
  status: ReservationStatus;
  createdAt: string;
  pickedUpAt: string | null;
  userId: number;
  itemId: number;
  user: StoreReservationUser;
  item: StoreReservationItemRaw;
}

// 화면에서 쓸 정규화된 타입
export interface StoreReservation {
  reservationId: number;
  quantity: number;
  status: ReservationStatus;
  createdAt: string;
  pickedUpAt: string | null;
  user: StoreReservationUser;
  item: {
    itemId: number;
    name: string;
    quantity: number;
    price: number;
    type: ItemType;
    pickupStart: string;
    pickupEnd: string;
    image?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

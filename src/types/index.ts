export type ItemStatus = "ACTIVE" | "RESERVED" | "DONE";
export type ItemType = "GIVE" | "SELL";
export type ReservationStatus = "CONFIRMED" | "PICKUP" | "CANCEL" | "NOSHOW";

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

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

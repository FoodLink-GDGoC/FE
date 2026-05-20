import api from "./client";
import type { ApiResponse, NearbyStore, NearbyItem } from "../types";

export interface NearbyResult {
  items: NearbyItem[];
  emptyStores: Pick<NearbyStore, "storeId" | "storeName" | "distance">[];
}

export const itemsApi = {
  getNearby: async (
    lat: number,
    lng: number,
    radius = 500,
    signal?: AbortSignal,
  ): Promise<NearbyResult> => {
    const { data: res } = await api.get<ApiResponse<{ stores: NearbyStore[] }>>(
      "/api/user/items/nearby",
      { params: { lat, lng, radius }, signal },
    );

    const items: NearbyItem[] = res.data.stores
      .filter((store) => store.items.length > 0)
      .flatMap((store) =>
        store.items.map((item) => ({
          itemId: item.itemId,
          name: item.name,
          price: item.price,
          type: item.type,
          pickupStart: "",
          pickupEnd: item.pickupEnd,
          status: item.status,
          quantity: item.availableQty,
          storeId: store.storeId,
          storeName: store.storeName,
          storeAddress: store.address,
          distance: store.distance,
          image: item.image,
        })),
      );

    const emptyStores = res.data.stores
      .filter((store) => store.items.length === 0)
      .map((store) => ({
        storeId: store.storeId,
        storeName: store.storeName,
        distance: store.distance,
      }));

    return { items, emptyStores };
  },
};

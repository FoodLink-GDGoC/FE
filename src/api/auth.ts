import api from "./client";
import type { ApiResponse } from "../types";

// 일반 유저

export interface UserSignupBody {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const userAuthApi = {
  signup: async (body: UserSignupBody): Promise<void> => {
    await api.post("/api/user/accounts/signup", body);
  },

  login: async (email: string, password: string): Promise<string> => {
    const { data: res } = await api.post<ApiResponse<LoginResponse>>(
      "/api/user/accounts/login",
      { email, password },
    );
    return res.data.accessToken;
  },

  logout: async (): Promise<void> => {
    await api.post("/api/user/accounts/logout");
  },
};

// 매장

export interface StoreSignupBody {
  storeName: string;
  ownerName: string;
  email: string;
  address: string;
  lat: number;
  lng: number;
  storeNumber: string;
  password1: string;
  password2: string;
  imageUrl?: string;
}

export const storeAuthApi = {
  signup: async (body: StoreSignupBody): Promise<void> => {
    await api.post("/api/store/accounts/signup", body);
  },

  login: async (email: string, password: string): Promise<string> => {
    const { data: res } = await api.post<ApiResponse<LoginResponse>>(
      "/api/store/accounts/login",
      { email, password },
    );
    return res.data.accessToken;
  },

  logout: async (): Promise<void> => {
    await api.post("/api/store/accounts/logout");
  },
};

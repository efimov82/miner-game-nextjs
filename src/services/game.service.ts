import axios from "axios";
import { WinnerResult } from "../types/game.types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// TODO: find how correct define type
export type ParamsTop = {
  queryKey: [string, { count: number }];
};

export async function fetchTop(params: any): Promise<WinnerResult[]> {
  const [, { count }] = params.queryKey;

  const response = await apiClient.get<WinnerResult[]>(`/top?count=${count}`);
  return response.data;
}

type ParamsSaveGame = {
  queryKey: [
    string,
    {
      nickName: string;
      fieldSize: string;
      gameTime: number;
      countMines: number;
    }
  ];
};

export async function saveGameResults(params: ParamsSaveGame) {
  const [, data] = params.queryKey;
  const response = await apiClient.post(`/top`, data);

  return response.data;
}

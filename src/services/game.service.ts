import axios from "axios";
import { CreateWinnerDto, Winner } from "../models";

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

export async function fetchTop(params: any): Promise<Winner[]> {
  const [, { count }] = params.queryKey;

  const response = await apiClient.get<Winner[]>(`/winners/top?count=${count}`);
  return response.data;
}

type ParamsSaveGame = {
  queryKey: [string, CreateWinnerDto];
};

export async function saveGameResult(data: CreateWinnerDto) {
  const response = await apiClient.post(`/winners/top`, data);

  return response.data;
}

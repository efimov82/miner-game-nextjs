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

/**
 * Fetch top-20
 *
 * @param params queryKey: [string, { count: number }]
 * @returns Winner[]
 */
export async function fetchTop(params: any): Promise<Winner[]> {
  const [, { count }] = params.queryKey;

  const response = await apiClient.get<Winner[]>(`/winners/top?count=${count}`);
  return response.data;
}

/**
 * 
 * @param params queryKey: [string, { fieldSize: string, countMines: number }]
 * @returns Winner[]
 */
export async function fetchWinnersList(fieldSize: string, countMines: number): Promise<Winner[]> {
  // const [, { fieldSize, countMines }] = params.queryKey;

  const response = await apiClient.get<Winner[]>(`/winners/list?fieldSize=${fieldSize}&countMines=${countMines}`);
  return response.data;
}

/**
 * Save game result
 *
 * @param data CreateWinnerDto
 * @returns Winner
 */
export async function saveGameResult(data: CreateWinnerDto): Promise<Winner> {
  const response = await apiClient.post(`/winners/top`, data);

  return response.data as Winner;
}

import axios from "axios";
import { QueryKey } from "react-query";
import { WinnerResult } from "../types/game.types";

const apiClient = axios.create({
  baseURL: "/api",
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

  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    const response = await apiClient.get<WinnerResult[]>(`/top?count=${count}`);
    return response.data;
  } else {
    // use server call
    return [];
  }
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

// export type Character = {
//   name: string;
// };

// function assertIsCharacter(character: any): asserts character is Character {
//   if (!("name" in character)) {
//     throw new Error("Not character");
//   }
// }

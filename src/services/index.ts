import { AxiosError } from "axios";
import { api } from "../lib/axios";
import { CreateHabitRequest, DayRequest, DayResponse, SummaryProps, ToggleHabitRequest } from "./types";

export const getSummary = async () => {
  return api.get<SummaryProps[]>("/summary");
};

export const createHabit = async (data: CreateHabitRequest) => {
  return api.post("/habits", data);
};

export const getDay = async (params: DayRequest) => {
  return api.get<DayResponse>("/day", { params });
};

export const toggleHabit = async ({ id }: ToggleHabitRequest) => {
  return api.patch(`/habits/${id}/toggle`);

};

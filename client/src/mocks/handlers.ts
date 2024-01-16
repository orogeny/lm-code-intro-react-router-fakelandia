import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "../environment_variables";
import { MISDEMEANOURS } from "../misdemeanours.types";

// Generate 4 misdemeanours for all MisdemeanourKinds except the first
const mockGetResponse = MISDEMEANOURS.slice(1).flatMap((kind, i) =>
  Array.from({ length: 4 }).map((_, j) => ({
    citizenId: 4 * i + j,
    misdemeanour: kind,
    date: "2023-12-24",
  }))
);

export const handlers = [
  http.get(`${API_BASE_URL}/misdemeanours/12`, () => {
    return HttpResponse.json(mockGetResponse);
  }),
];

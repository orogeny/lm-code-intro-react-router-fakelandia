import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "../environment_variables";

const mockGetResponse = [
  { citizenId: 1, misdemeanour: "lift", date: "2023-12-24" },
  { citizenId: 2, misdemeanour: "rudeness", date: "2023-12-24" },
  { citizenId: 3, misdemeanour: "united", date: "2023-12-24" },
  { citizenId: 4, misdemeanour: "vegetables", date: "2023-12-24" },
];

export const handlers = [
  http.get(`${API_BASE_URL}/misdemeanours/4`, () => {
    return HttpResponse.json(mockGetResponse);
  }),
];

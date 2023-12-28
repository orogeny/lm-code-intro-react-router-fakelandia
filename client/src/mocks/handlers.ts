import { http, HttpResponse } from "msw";

const mockGetResponse = [
  { citizenId: 1, misdemeanour: "lift", date: "2023-12-24" },
  { citizenId: 2, misdemeanour: "rudeness", date: "2023-12-24" },
  { citizenId: 3, misdemeanour: "united", date: "2023-12-24" },
  { citizenId: 4, misdemeanour: "vegetables", date: "2023-12-24" },
];

export const handlers = [
  http.get("http://localhost:8080/api/misdemeanours", () => {
    return HttpResponse.json(mockGetResponse);
  }),
];

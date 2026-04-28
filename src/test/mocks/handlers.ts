import { http, HttpResponse } from "msw";
import { createMockStoreDetailsResponse } from "../factories/storeDetails";

const BASE_URL = "http://localhost:3000/api";

export const handlers = [
  http.get(`${BASE_URL}/v1/stores/details/:storeUrl`, ({ params }) => {
    if (params.storeUrl === "not-found.com") {
      return HttpResponse.json({ store: null, codes: [], deals: [] });
    }
    return HttpResponse.json(createMockStoreDetailsResponse());
  }),
];

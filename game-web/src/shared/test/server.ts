import { setupServer } from "msw/node";

import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*", () => {
    return HttpResponse.json({});
  }),
];

export const server = setupServer(...handlers);

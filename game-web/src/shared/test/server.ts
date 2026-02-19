import { setupServer } from "msw/node";

import { http, HttpResponse } from "msw";

export const handlers = [
  http.all("*", () => {
    return HttpResponse.json({});
  }),
];

export const server = setupServer(...handlers);

import { StatusCodes } from "http-status-codes";

import type { ZodRequestBody } from "@asteasolutions/zod-to-openapi";
import type { z } from "zod";

export function createApiRequestBody(schema: z.ZodTypeAny): ZodRequestBody {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
  };
}

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiRequestBody } from "@/api-docs/openAPIRequestBuilders";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { eventController } from "@/api/main-event/eventController";
import { EventSchema, PutEventSchema } from "@/api/main-event/eventModel";
import { validateRequest } from "@/common/utils/httpHandlers";

// Registry and Router
const eventRegistry = new OpenAPIRegistry();
const eventRouter: Router = express.Router();

eventRegistry.register("Event", EventSchema);

// GET Event
eventRegistry.registerPath({
  method: "get",
  path: "/event",
  tags: ["Event"],
  responses: createApiResponse(EventSchema, "Success"),
});
eventRouter.get("/", eventController.getEvent);

// PUT Event
eventRegistry.registerPath({
  method: "put",
  path: "/event",
  tags: ["Event"],
  request: { body: createApiRequestBody(PutEventSchema.shape.body) },
  responses: createApiResponse(EventSchema, "Success"),
});
eventRouter.put("/", validateRequest(PutEventSchema), eventController.updateEvent);

export { eventRouter, eventRegistry };

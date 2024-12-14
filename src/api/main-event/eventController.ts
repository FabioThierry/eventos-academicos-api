import type { Request, RequestHandler, Response } from "express";

import { eventService } from "@/api/main-event/eventService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class EventController {
  public getEvent: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await eventService.findEvent();
    return handleServiceResponse(serviceResponse, res);
  };

  public updateEvent: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await eventService.updateEvent(req.body);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const eventController = new EventController();

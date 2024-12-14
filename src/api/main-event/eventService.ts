import { StatusCodes } from "http-status-codes";

import type { Event } from "@/api/main-event/eventModel";
import { EventRepository } from "@/api/main-event/eventRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class EventService {
  private eventRepository = new EventRepository();

  constructor(repository: EventRepository = new EventRepository()) {
    this.eventRepository = repository;
  }

  async findEvent(): Promise<ServiceResponse<Event | null>> {
    try {
      const event = await this.eventRepository.findEventAsync();
      if (!event) {
        return ServiceResponse.failure("Event not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Event>("Event found", event);
    } catch (error) {
      const errorMessage = `Error finding a event:, ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding event.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async updateEvent(event: Event): Promise<ServiceResponse<Event | null>> {
    try {
      const updatedEvent = await this.eventRepository.updateEventAsync(event);
      if (!updatedEvent) {
        return ServiceResponse.failure("Event not found", null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<Event>("Event updated", updatedEvent);
    } catch (error) {
      const errorMessage = `Error updating a event:, ${(error as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating event.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const eventService = new EventService();

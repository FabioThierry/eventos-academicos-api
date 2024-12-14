import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";

import type { Event } from "@/api/main-event/eventModel";
import { EventRepository } from "@/api/main-event/eventRepository";
import { EventService } from "@/api/main-event/eventService";

vi.mock("@/api/main-event/eventRepository");

describe("Event Service", () => {
  let eventServiceInstance: EventService;
  let eventRepositoryInstance: EventRepository;

  const mockEvent: Event = {
    id: 1,
    title: "Default Event Title",
    description: "Default Event Description",
    start_date: new Date(),
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    cidade: "City Name",
    square: "Square Name",
    reference: "Reference Name",
    cep: "00000-000",
    neighborhood: "Neighborhood Name",
  };

  beforeEach(() => {
    eventRepositoryInstance = new EventRepository();
    eventServiceInstance = new EventService(eventRepositoryInstance);
  });

  describe("findEvent", () => {
    it("should return a success response when event is found", async () => {
      // Arrange
      const testId = 1;
      const mockFindEventAsync = eventRepositoryInstance.findEventAsync as Mock;
      mockFindEventAsync.mockResolvedValue(mockEvent);

      // Act
      const result = await eventServiceInstance.findEvent();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toEqual("Event found");
      expect(result.responseObject).toEqual(mockEvent);
    });

    it("should return a not found response when event is not found", async () => {
      // Arrange
      const testId = 1;
      const mockFindEventAsync = eventRepositoryInstance.findEventAsync as Mock;
      mockFindEventAsync.mockResolvedValue(null);

      // Act
      const result = await eventServiceInstance.findEvent();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("Event not found");
      expect(result.responseObject).toBeNull();
    });

    it("should handle errors for findEventAsync", async () => {
      // Arrange
      const testId = 1;
      const mockFindEventAsync = eventRepositoryInstance.findEventAsync as Mock;
      mockFindEventAsync.mockRejectedValue(new Error("Database error"));

      // Act
      const result = await eventServiceInstance.findEvent();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("An error occurred while finding event.");
      expect(result.responseObject).toBeNull();
    });
  });

  describe("updateEvent", () => {
    it("should return a success response when event is updated", async () => {
      // Arrange
      const testId = 1;
      const mockUpdateEventAsync = eventRepositoryInstance.updateEventAsync as Mock;
      mockUpdateEventAsync.mockResolvedValue(mockEvent);

      // Act
      const result = await eventServiceInstance.updateEvent(mockEvent);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toEqual("Event updated");
      expect(result.responseObject).toEqual(mockEvent);
    });

    it("should return a not found response when event is not found", async () => {
      // Arrange
      const testId = 1;
      const mockUpdateEventAsync = eventRepositoryInstance.updateEventAsync as Mock;
      mockUpdateEventAsync.mockResolvedValue(null);

      // Act
      const result = await eventServiceInstance.updateEvent(mockEvent);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("Event not found");
      expect(result.responseObject).toBeNull();
    });

    it("should handle errors for updateEventAsync", async () => {
      // Arrange
      const testId = 1;
      const mockUpdateEventAsync = eventRepositoryInstance.updateEventAsync as Mock;
      mockUpdateEventAsync.mockRejectedValue(new Error("Database error"));

      // Act
      const result = await eventServiceInstance.updateEvent(mockEvent);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("An error occurred while updating event.");
      expect(result.responseObject).toBeNull();
    });
  });
});

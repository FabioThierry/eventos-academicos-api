import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { Event } from "@/api/main-event/eventModel";
import { eventService } from "@/api/main-event/eventService";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("Event API endpoints", () => {
  // Arrange
  const expectedEvent: Event = {
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
  describe("GET /event", () => {
    it("should return a event data", async () => {
      // Mock service or repository
      vi.spyOn(eventService, "findEvent").mockResolvedValue(ServiceResponse.success("Event found", expectedEvent));
      // Act
      const response = await request(app).get("/event");
      const responseBody: ServiceResponse<Event> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Event found");
      compareEvent(responseBody.responseObject, expectedEvent);
    });

    it("should return a not found error", async () => {
      // Mock service or repository
      vi.spyOn(eventService, "findEvent").mockResolvedValue(
        ServiceResponse.failure("Event not found", null, StatusCodes.NOT_FOUND),
      );
      // Act
      const response = await request(app).get("/event");
      const responseBody: ServiceResponse<Event> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Event not found");
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("POST /event", () => {
    it("should return a event data", async () => {
      // Mock service or repository
      vi.spyOn(eventService, "updateEvent").mockResolvedValue(ServiceResponse.success("Event updated", expectedEvent));

      // Act
      const response = await request(app).put("/event").send(expectedEvent);
      const responseBody: ServiceResponse<Event> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Event updated");
      compareEvent(responseBody.responseObject, expectedEvent);
    });

    it("should return a not found error", async () => {
      // Arrange
      const updatedEvent: Event = {
        id: 1,
        title: "Default Event Title2",
        description: "Default Event Description",
        start_date: new Date(),
        end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        cidade: "City Name",
        square: "Square Name",
        reference: "Reference Name",
        cep: "00000-000",
        neighborhood: "Neighborhood Name",
      };

      // Mock service or repository
      vi.spyOn(eventService, "updateEvent").mockResolvedValue(
        ServiceResponse.failure("Event not found", null, StatusCodes.NOT_FOUND),
      );

      // Act
      const response = await request(app).put("/event").send(updatedEvent);
      const responseBody: ServiceResponse<Event> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Event not found");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a bad request error", async () => {
      // Arrange
      const invalidEvent = { invalidField: "Invalid Data" };

      // Mock service or repository
      vi.spyOn(eventService, "updateEvent").mockResolvedValue(
        ServiceResponse.failure("Event not found", null, StatusCodes.BAD_REQUEST),
      );

      // Act
      const response = await request(app).put("/event").send(invalidEvent);
      const responseBody: ServiceResponse<Event> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid input");
      expect(responseBody.responseObject).toBeNull();
    });
  });
});

function compareEvent(responseEvent: Event, mockEvent: Event) {
  if (!mockEvent || !responseEvent) {
    throw new Error("Invalid test data: mockEvent or responseEvent is undefined");
  }

  expect(responseEvent.id).toEqual(mockEvent.id);
  expect(responseEvent.title).toEqual(mockEvent.title);
  expect(responseEvent.description).toEqual(mockEvent.description);
  expect(new Date(responseEvent.start_date)).toEqual(mockEvent.start_date);
  expect(new Date(responseEvent.end_date)).toEqual(mockEvent.end_date);
  expect(responseEvent.cidade).toEqual(mockEvent.cidade);
  expect(responseEvent.square).toEqual(mockEvent.square);
  expect(responseEvent.reference).toEqual(mockEvent.reference);
  expect(responseEvent.cep).toEqual(mockEvent.cep);
  expect(responseEvent.neighborhood).toEqual(mockEvent.neighborhood);
}

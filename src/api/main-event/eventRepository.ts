import type { Event } from "@/api/main-event/eventModel";
import db from "@/common/utils/db";

export const defaultEvent: Event = {
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

export class EventRepository {
  private id: number;

  constructor() {
    this.id = 1;
  }

  async findEventAsync(): Promise<Event | null> {
    const event = db.event.findUnique({ where: { id: this.id } });
    return event || null;
  }

  async updateEventAsync(event: Event): Promise<Event> {
    const updatedEvent = db.event.update({ where: { id: this.id }, data: event });
    return updatedEvent;
  }
}

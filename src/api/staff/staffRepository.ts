import type { Staff } from "@/api/staff/staffModel";
import db from "@/common/utils/db";

export class OrganizerRepository {
  async findAllAsync(): Promise<Staff[]> {
    const organizers = db.staff.findMany();
    return organizers;
  }

  async findByIdAsync(id: string): Promise<Staff | null> {
    const organizer = db.staff.findUnique({ where: { id } });
    return organizer || null;
  }

  async createAsync(organizer: Staff): Promise<Staff> {
    const createdOrganizer = db.staff.create({ data: organizer });
    return createdOrganizer;
  }

  async updateAsync(organizer: Staff): Promise<Staff> {
    const updatedOrganizer = db.staff.update({ where: { id: organizer.id }, data: organizer });
    return updatedOrganizer;
  }

  async deleteAsync(id: string): Promise<Staff> {
    const deletedOrganizer = db.staff.delete({ where: { id } });
    return deletedOrganizer;
  }

  async findByEmailAsync(email: string): Promise<Staff | null> {
    const organizer = db.staff.findUnique({ where: { email } });
    return organizer || null;
  }
}

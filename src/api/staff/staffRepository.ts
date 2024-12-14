import type { Staff } from "@/api/staff/staffModel";
import db from "@/common/utils/db";

export class StaffRepository {
  async findAllAsync(): Promise<Staff[]> {
    const staffers = db.staff.findMany();
    return staffers;
  }

  async findByIdAsync(id: string): Promise<Staff | null> {
    const staffer = db.staff.findUnique({ where: { id } });
    return staffer || null;
  }

  async createAsync(organizer: Staff): Promise<Staff> {
    const createdStaff = db.staff.create({ data: organizer });
    return createdStaff;
  }

  async updateAsync(organizer: Staff): Promise<Staff> {
    const updatedStaff = db.staff.update({ where: { id: organizer.id }, data: organizer });
    return updatedStaff;
  }

  async deleteAsync(id: string): Promise<Staff> {
    const deletedStaff = db.staff.delete({ where: { id } });
    return deletedStaff;
  }

  async findByEmailAsync(email: string): Promise<Staff | null> {
    const staffer = db.staff.findUnique({ where: { email } });
    return staffer || null;
  }
}

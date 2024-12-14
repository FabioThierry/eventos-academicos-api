import type { Staff } from "@/api/staff/staffModel";
import db from "@/common/utils/db";

export class OrganizerRepository {
  async findAllAsync(): Promise<Staff[]> {
    const organizers = db.staff.findMany();
    return organizers;
  }
}

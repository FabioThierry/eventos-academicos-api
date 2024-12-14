import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Staff = z.infer<typeof StaffSchema>;
export const StaffSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  password_hash: z.string().min(1).max(250),
  eventId: z.number(),
});

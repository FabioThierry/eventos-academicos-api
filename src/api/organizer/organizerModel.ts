import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Organizer = z.infer<typeof OrganizerSchema>;
export const OrganizerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(1).max(250),
  institution: z.string().min(1).max(250),
  createdAt: z.date(),
  updatedAt: z.date(),
  password_hash: z.string().min(1).max(250),
});

import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Event = z.infer<typeof EventSchema>;
export const EventSchema = z.object({
  id: z.number().default(1),
  title: z.string().min(1, { message: "title must be at least 1 characters long" }).max(250, {
    message: "title cannot be longer than 250 characters",
  }),
  description: z.string().min(1, { message: "description must be at least 1 characters long" }).max(250, {
    message: "description cannot be longer than 250 characters",
  }),
  start_date: z.date(),
  end_date: z.date(),
  cidade: z.string().min(1, { message: "cidade must be at least 1 characters long" }).max(250, {
    message: "cidade cannot be longer than 250 characters",
  }),
  square: z.string().min(1, { message: "square must be at least 1 characters long" }).max(250, {
    message: "square cannot be longer than 250 characters",
  }),
  reference: z.string().min(1, { message: "reference must be at least 1 characters long" }).max(250, {
    message: "reference cannot be longer than 250 characters",
  }),
  cep: z.string().min(1, { message: "cep must be at least 1 characters long" }).max(250, {
    message: "cep cannot be longer than 250 characters",
  }),
  neighborhood: z.string().min(1, { message: "neighborhood must be at least 1 characters long" }).max(250, {
    message: "neighborhood cannot be longer than 250 characters",
  }),
});

// Input Validation for 'PUT event' endpoint
export const PutEventSchema = z.object({
  body: z.object({
    id: z.number().default(1),
    title: z.string().min(1).max(250),
    description: z.string().min(1).max(250),
    start_date: commonValidations.date,
    end_date: commonValidations.date,
    cidade: z.string().min(1).max(250),
    square: z.string().min(1).max(250),
    reference: z.string().min(1).max(250),
    cep: z.string().min(1).max(250),
    neighborhood: z.string().min(1).max(250),
  }),
});

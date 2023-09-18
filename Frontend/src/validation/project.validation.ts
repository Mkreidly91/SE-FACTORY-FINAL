import { z, string, number, object, array } from "zod";

const projectSearch = object({
  search: string().trim().optional(),
  location: string().trim().optional(),
  bedrooms: number().positive('Please provide a valid number').optional(),
  bathrooms: number().positive('Please provide a valid number').optional(),
  size: number().array().length(2),
  price: number().array().length(2), 
});

export type ProjectSearchFormSchemaType = z.infer<typeof projectSearch>;
export { projectSearch };

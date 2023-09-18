import { string, number, object, z } from "zod";
const projectSearchTerms = object({
  search: string().trim().optional(),
  location: string().trim().optional(),
  bedrooms: number().positive("Please provide a valid number").optional(),
  bathrooms: number().positive("Please provide a valid number").optional(),
  size: number().array().length(2),
  price: number().array().length(2),
});
const projectSearchForm = object({
  body: projectSearchTerms,
});

export type ProjectSearchSchema = z.infer<typeof projectSearchTerms>;
export { projectSearchForm };

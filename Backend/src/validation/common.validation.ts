import { string, number, object, z } from 'zod';

const projectSearchTerms = object({
  search: string().trim().optional(),
  location: string().trim().optional(),
  bedrooms: number().positive('Please provide a valid number').optional(),
  bathrooms: number().positive('Please provide a valid number').optional(),
  size: number().array().length(2).optional(),
  price: number().array().length(2).optional(),
});

const projectSearchForm = object({
  body: projectSearchTerms,
  params: object({
    page: string()
      .transform((v) => parseInt(v))
      .optional(),
    perPage: string()
      .transform((v) => parseInt(v))
      .optional(),
  }),
});

const getAllProjectsSchema = object({
  params: object({
    page: string()
      .transform((v) => parseInt(v))
      .optional(),
    perPage: string()
      .transform((v) => parseInt(v))
      .optional(),
  }),
});

export type ProjectSearchSchema = z.infer<typeof projectSearchTerms>;
export { projectSearchForm, getAllProjectsSchema };

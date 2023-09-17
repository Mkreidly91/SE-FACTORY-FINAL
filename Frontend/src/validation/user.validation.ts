import { z, string, number, object, array, any } from 'zod';
const phoneNumberRegex = /^[\d\s()+-]+$/;

const editUserSchema = object({
  name: string().trim().min(1).max(18),
  email: string().trim().email(),
  password: string().trim().min(6),
  userType: number().min(0).max(1),
  tel: string()
    .refine(
      (value) => {
        return phoneNumberRegex.test(value);
      },
      {
        message: 'Invalid telephone number format',
      }
    )
    .optional(),
  file: z.union([
    any().refine((files) => files?.length === 1, 'No image selected'),
    string().trim().url(),
  ]),
}).partial();

export { editUserSchema };

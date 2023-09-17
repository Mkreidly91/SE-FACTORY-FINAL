import { string, number, object, array, any } from 'zod';

const phoneNumberRegex = /^[\d\s()+-]+$/;
const CreateUserForm = object({
  body: object({
    name: string().trim().min(1).max(18),
    email: string().trim().email(),
    password: string().trim().min(6),
    userType: number().min(0).max(1),
    tel: string().refine(
      (value) => {
        const phoneNumberRegex = /^\d{10}$/;

        return phoneNumberRegex.test(value);
      },
      {
        message: 'Invalid telephone number format',
      }
    ),
  }).optional(),
});

const editUserSchema = object({
  body: object({
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
  }).partial(),
  files: array(
    object({
      fieldname: string().trim().nonempty(),
      originalname: string().trim().nonempty(),
      encoding: string().trim().nonempty(),
      mimetype: string().trim().nonempty(),
      buffer: any(),
      size: number(),
    })
  ).optional(),
}).partial();

export { CreateUserForm, editUserSchema };

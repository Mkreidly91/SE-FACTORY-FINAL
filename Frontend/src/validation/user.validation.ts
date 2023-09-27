import { z, string, number, object, any } from 'zod';
const phoneNumberRegex = /^[\d\s()+-]+$/;

const editUserSchema = object({
  name: string().trim().min(1).max(40),
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
const signupFormSchema = object({
  name: string().trim().min(1).max(40).nonempty('Name field is required'),
  email: string().trim().email().nonempty('Email field is required'),
  password: string().trim().min(6).nonempty('Password field is required'),
  confirmPassword: string()
    .trim()
    .min(6)
    .nonempty('Password field is required'),
  userType: number().min(0).max(1),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ['confirmPassword'],
    });
  }
});
const loginFormSchema = object({
  email: string().trim().email().nonempty('Email field is required'),
  password: string().trim().min(6).nonempty('Password field is required'),
});

export type UserSchema = z.infer<typeof editUserSchema>;
export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export { signupFormSchema, loginFormSchema, editUserSchema };

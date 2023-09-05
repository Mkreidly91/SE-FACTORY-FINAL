import { string, number, object } from 'zod';

const CreateUserForm = object({
  body: object({
    name: string().trim().min(1).max(18),
    email: string().trim().email(),
    password: string().trim().min(6),
    userType: number().min(0).max(1),
  }),
});

export { CreateUserForm };

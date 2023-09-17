import express from 'express';
import { register, login } from '../controllers';

import { CreateUserForm } from '../validation/user.validation';
import formValidationMiddleware from '../middlewares/formValidation.middleware';
import { getUser } from '../controllers/auth.controller';
import authMiddleware, { Roles } from '../middlewares/auth.middleware';

export default (router: express.Router) => {
  router.post(
    '/auth/register',
    formValidationMiddleware(CreateUserForm),
    register
  );
  router.post('/auth/login', login);
  router.get('/auth/getUser', authMiddleware(Roles.All), getUser);
};

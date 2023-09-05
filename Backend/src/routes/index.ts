import { Router } from 'express';
import authRoute from './auth.route';
import companyRoute from './company.route';

const router = Router();

export default (): Router => {
  authRoute(router);
  companyRoute(router);
  return router;
};

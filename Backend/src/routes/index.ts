import { Router } from "express";
import authRoute from "./auth.route";
import companyRoute from "./company.route";
import commonRoute from "./common.route";

const router = Router();

export default (): Router => {
  authRoute(router);
  companyRoute(router);
  commonRoute(router);
  return router;
};

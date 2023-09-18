import { Router } from 'express';

import formValidationMiddleware from '../middlewares/formValidation.middleware';
import { projectSearchForm } from '../validation/common.validation';
import { searchProject } from '../controllers/common.controller';

export default (router: Router) => {
  router.post(
    '/search/project',
    formValidationMiddleware(projectSearchForm),
    searchProject,
  );
};

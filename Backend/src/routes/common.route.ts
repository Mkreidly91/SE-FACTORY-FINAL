import { Router } from 'express';

import formValidationMiddleware from '../middlewares/formValidation.middleware';
import {
  getAllProjectsSchema,
  projectSearchForm,
} from '../validation/common.validation';
import {
  searchProject,
  getAllProjects,
  getProjectById,
} from '../controllers/common.controller';

export default (router: Router) => {
  router.post(
    '/search/project/:page/:perPage',
    formValidationMiddleware(projectSearchForm),
    searchProject
  );
  router.get(
    '/getAllProjects/:page/:perPage',
    formValidationMiddleware(getAllProjectsSchema),
    getAllProjects
  );
  router.get('/company/getProject/:projectId', getProjectById);
};

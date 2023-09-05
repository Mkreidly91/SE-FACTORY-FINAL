import {
  uploadToS3,
  deleteFromS3,
  createProject,
  addApartment,
} from '../controllers';
import { Router } from 'express';
import multer from 'multer';
import authMiddleware, { Roles } from '../middlewares/auth.middleware';
import { projectForm, apartmentForm } from '../validation/company.validation';
import formValidationMiddleware from '../middlewares/formValidation.middleware';

export default (router: Router) => {
  router.post('/company/upload', multer().any(), uploadToS3);
  router.post('/company/delete', deleteFromS3);
  router.post(
    '/company/createProject',
    authMiddleware(Roles.Company),
    formValidationMiddleware(projectForm),
    createProject
  );
  router.post(
    '/company/addApartment',
    authMiddleware(Roles.Company),
    multer().any(),
    formValidationMiddleware(apartmentForm),
    addApartment
  );
};

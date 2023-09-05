import { Router } from 'express';
import multer from 'multer';
import authMiddleware, { Roles } from '../middlewares/auth.middleware';
import {
  projectForm,
  apartmentForm,
  panoramaForm,
  markerForm,
  hotspotForm,
} from '../validation/company.validation';
import formValidationMiddleware from '../middlewares/formValidation.middleware';
import {
  uploadToS3,
  deleteFromS3,
  createProject,
  addApartment,
  addPanorama,
  addHotspot,
  addMarker,
} from '../controllers';

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
  router.post(
    '/company/addPanorama',
    authMiddleware(Roles.Company),
    multer().any(),
    formValidationMiddleware(panoramaForm),
    addPanorama
  );
  router.post(
    '/company/addMarker',
    authMiddleware(Roles.Company),
    formValidationMiddleware(markerForm),
    addMarker
  );
  router.post(
    '/company/addHotspot',
    authMiddleware(Roles.Company),
    formValidationMiddleware(hotspotForm),
    addHotspot
  );
};

import { Router } from 'express';
import multer from 'multer';
import authMiddleware, { Roles } from '../middlewares/auth.middleware';
import {
  projectForm,
  apartmentForm,
  panoramaForm,
  markerForm,
  hotspotForm,
  deleteProjectForm,
  deleteApartmentForm,
  deletePanoramaOrMarkerForm,
  deleteHotspotForm,
  editProjectSchema,
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
  deleteProject,
  deleteApartment,
  deletePanorama,
  deleteMarker,
  deleteHotspot,
  getCompanyProjects,
} from '../controllers';
import { editProject, getProjectById } from '../controllers/company.controller';

export default (router: Router) => {
  router.post('/company/upload', multer().any(), uploadToS3);
  router.post('/company/delete', deleteFromS3);
  router.post(
    '/company/createProject',
    authMiddleware(Roles.Company),
    multer().any(),
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

  router.delete(
    '/company/deleteProject',
    authMiddleware(Roles.Company),
    formValidationMiddleware(deleteProjectForm),
    deleteProject
  );

  router.delete(
    '/company/deleteApartment',
    authMiddleware(Roles.Company),
    formValidationMiddleware(deleteApartmentForm),
    deleteApartment
  );

  router.delete(
    '/company/deletePanorama',
    authMiddleware(Roles.Company),
    formValidationMiddleware(deletePanoramaOrMarkerForm),
    deletePanorama
  );
  router.delete(
    '/company/deleteMarker',
    authMiddleware(Roles.Company),
    formValidationMiddleware(deletePanoramaOrMarkerForm),
    deleteMarker
  );
  router.delete(
    '/company/deleteHotspot',
    authMiddleware(Roles.Company),
    formValidationMiddleware(deleteHotspotForm),
    deleteHotspot
  );

  router.get(
    '/company/getCompanyProjects',
    authMiddleware(Roles.Company),
    getCompanyProjects
  );

  router.get(
    '/company/getProject/:projectId',
    authMiddleware(Roles.Company),
    getProjectById
  );

  router.put(
    '/company/editProject/:projectId',
    multer().any(),
    formValidationMiddleware(editProjectSchema),
    editProject
  );
};

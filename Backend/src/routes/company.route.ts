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
  deletePanoramaOrMarkerForm,
  deleteHotspotForm,
  editProjectSchema,
  editHotspotSchema,
} from '../validation/company.validation';
import formValidationMiddleware from '../middlewares/formValidation.middleware';
import {
  createProject,
  addApartment,
  addPanorama,
  addHotspot,
  addMarker,
  deleteProject,
  deletePanorama,
  deleteMarker,
  deleteHotspot,
  getCompanyProjects,
  editHotspot,
} from '../controllers';
import {
  editProfile,
  editProject,
  getPanoramaById,
  getProjectById,
} from '../controllers/company.controller';
import { editUserSchema } from '../validation/user.validation';

export default (router: Router) => {
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

  router.get(
    '/company/getPanoramaById/:projectId/:panoramaId',
    authMiddleware(Roles.Company),
    getPanoramaById
  );

  router.put(
    '/company/editProject/:projectId',
    multer().any(),
    formValidationMiddleware(editProjectSchema),
    editProject
  );

  router.put(
    '/company/editHotspot/:projectId/:panoramaId/:hotspotId',
    multer().any(),
    formValidationMiddleware(editHotspotSchema),
    editHotspot
  );

  router.put(
    '/company/editProfile',
    authMiddleware(Roles.Company),
    multer().any(),
    formValidationMiddleware(editUserSchema),
    editProfile
  );
};

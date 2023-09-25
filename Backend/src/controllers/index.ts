import { register, login } from './auth.controller';
import { getProjectById } from './common.controller';
import {
  createProject,
  addApartment,
  addPanorama,
  addMarker,
  addHotspot,
  deleteProject,
  deletePanorama,
  deleteMarker,
  deleteHotspot,
  deleteApartment,
  getCompanyProjects,
  editProject,
  getPanoramaById,
  editHotspot,
  editProfile,
} from './company.controller';

import { uploadToS3, deleteFromS3 } from './s3.controller';
export {
  register,
  login,
  uploadToS3,
  deleteFromS3,
  createProject,
  addApartment,
  addPanorama,
  addMarker,
  addHotspot,
  deleteProject,
  deletePanorama,
  deleteMarker,
  deleteHotspot,
  deleteApartment,
  getCompanyProjects,
  getProjectById,
  editProject,
  getPanoramaById,
  editHotspot,
  editProfile,
};

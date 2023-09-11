import { register, login } from './auth.controller';
import {
  createProject,
  addApartment,
  addPanorama,
  addMarker,
  addHotspot,
  deleteProject,
  deleteApartment,
  deletePanorama,
  deleteMarker,
  deleteHotspot,
  getCompanyProjects,
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
  deleteApartment,
  deletePanorama,
  deleteMarker,
  deleteHotspot,
  getCompanyProjects,
};

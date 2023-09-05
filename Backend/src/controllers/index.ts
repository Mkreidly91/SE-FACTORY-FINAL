import { register, login } from './auth.controller';
import { createProject, addApartment } from './company.controller';
import { uploadToS3, deleteFromS3 } from './s3.controller';

export {
  register,
  login,
  uploadToS3,
  deleteFromS3,
  createProject,
  addApartment,
};

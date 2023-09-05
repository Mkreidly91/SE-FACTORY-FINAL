import envConfig from '../configs/env.config';
import { Company } from '../models/company';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import {
  addApartmentService,
  createProjectService,
  addPanoramaService,
} from '../services/company.service';
import mongoose, { Types } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';

const createProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { name, description } = req.body;
    const { message, data } = await createProjectService({
      owner: new mongoose.Types.ObjectId(user._id),
      name,
      description,
    });

    return res.status(200).json({
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const addApartment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { name, description, projectId } = req.body;

    const files: Express.Multer.File[] = Object.values(req.files);

    const apartment = await addApartmentService(projectId, files[0], {
      name,
      description,
    });

    return res.status(200).json({
      message: 'Successfully added apartment',
      data: apartment,
    });
  } catch (error) {
    next(error);
  }
};

const addPanorama = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, apartmentId } = req.body;
    const files: Express.Multer.File[] = Object.values(req.files);
    const panoramas = await addPanoramaService(
      projectId,
      apartmentId,
      files[0]
    );
  } catch (error) {
    next(error);
  }
};

export { createProject, addApartment };

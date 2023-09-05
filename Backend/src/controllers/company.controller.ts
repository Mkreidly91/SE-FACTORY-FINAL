import envConfig from '../configs/env.config';
import { Company } from '../models/company';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import {
  addApartmentService,
  createProjectService,
  addPanoramaService,
  addMarkerService,
  addHotspotService,
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
    return res.status(200).json({
      message: 'Successfully added panorama',
      data: panoramas,
    });
  } catch (error) {
    next(error);
  }
};

const addMarker = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, apartmentId, panoramaId, x, y, z } = req.body;
    const marker = await addMarkerService(projectId, apartmentId, panoramaId, {
      x,
      y,
      z,
    });
    return res.status(200).json({
      message: 'Successfully added marker',
      data: marker,
    });
  } catch (error) {
    next(error);
  }
};

const addHotspot = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // projectId: Types.ObjectId, apartmentId: Types.ObjectId, panoramaId: Types.ObjectId, { link, info, yaw, pitch }: IHotspot)
    const { projectId, apartmentId, panoramaId, link, info, yaw, pitch } =
      req.body;
    const hotspot = await addHotspotService(
      projectId,
      apartmentId,
      panoramaId,
      { link, info, yaw, pitch }
    );
    return res.status(200).json({
      message: 'Successfully added hotspot',
      data: hotspot,
    });
  } catch (error) {
    next(error);
  }
};

export { createProject, addApartment, addPanorama, addMarker, addHotspot };

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
  deleteProjectService,
  deletePanoramaService,
  deleteMarkerService,
  deleteHotspotService,
  getCompanyProjectsService,
  deleteApartmentService,
  editHotspotService,
  editProfileService,
  editProjectService,
  getPanoramaByIdService,
} from '../services';
import mongoose, { Types } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';

const createProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const {
      name,
      description,
      features,
      bedrooms,
      bathrooms,
      size,
      location,
      price,
    } = req.body;
    const files: Express.Multer.File[] = Object.values(req.files);
    const { message, data } = await createProjectService(files[0], {
      owner: new mongoose.Types.ObjectId(user._id),
      name,
      description,
      features,
      bedrooms,
      bathrooms,
      size,
      location,
      price,
    });

    return res.status(200).json({
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const addProjectThumbnail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const files: Express.Multer.File[] = Object.values(req.files);
  } catch (error) {}
};

const addApartment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { projectId } = req.body;

    const files: Express.Multer.File[] = Object.values(req.files);

    const apartment = await addApartmentService(files[0], projectId);

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
    const { projectId, name } = req.body;
    const files: Express.Multer.File[] = Object.values(req.files);
    const panoramas = await addPanoramaService(projectId, name, files[0]);
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
    const { projectId, panoramaId, x, y, z } = req.body;
    const marker = await addMarkerService(projectId, panoramaId, {
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
    const { projectId, panoramaId, link, info, yaw, pitch } = req.body;
    const newPanos = await addHotspotService(
      projectId,

      panoramaId,
      { link, info, yaw, pitch }
    );
    return res.status(200).json({
      message: 'Successfully added hotspot',
      data: newPanos,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.body;
    const deleted = await deleteProjectService(projectId);
    return res.status(200).json({
      message: 'Successfully deleted project',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

const deleteApartment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.body;
    const deleted = await deleteApartmentService(projectId);
    return res.status(200).json({
      message: 'Successfully deleted 3d model',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

const deletePanorama = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, panoramaId } = req.body;
    const newPanoramas = await deletePanoramaService(
      projectId,

      panoramaId
    );
    return res.status(200).json({
      message: 'Successfully deleted Panorama',
      data: newPanoramas,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMarker = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, panoramaId } = req.body;
    const newPanoramas = await deleteMarkerService(
      projectId,

      panoramaId
    );
    return res.status(200).json({
      message: 'Successfully deleted Marker',
      data: newPanoramas,
    });
  } catch (error) {
    next(error);
  }
};
const deleteHotspot = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, panoramaId, hotspotId } = req.body;
    const newHotpots = await deleteHotspotService(
      projectId,
      panoramaId,
      hotspotId
    );
    return res.status(200).json({
      message: 'Successfully deleted Hotspot',
      data: newHotpots,
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyProjects = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const serviceRes = await getCompanyProjectsService(user._id);
    return res.status(200).json({
      message: 'Successfully fetched Projects',
      data: serviceRes.projects,
    });
  } catch (error) {
    next(error);
  }
};

const getPanoramaById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, panoramaId } = req.params;
    const serviceRes = await getPanoramaByIdService(projectId, panoramaId);
    return res.status(200).json({
      message: 'Successfully fetched Panorama',
      data: serviceRes,
    });
  } catch (error) {
    next(error);
  }
};
const editProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const files: Express.Multer.File[] = Object.values(req.files);
    let serviceRes;
    if (files[0]) {
      serviceRes = await editProfileService(user, req.body, files[0]);
    } else {
      serviceRes = await editProfileService(user, req.body);
    }

    return res.status(200).json({
      message: 'Successfully Edited Profile',
      data: serviceRes,
    });
  } catch (error) {
    next(error);
  }
};

const editProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const files: Express.Multer.File[] = Object.values(req.files);
    let serviceRes;
    if (files[0]) {
      serviceRes = await editProjectService(projectId, req.body, files[0]);
    } else {
      serviceRes = await editProjectService(projectId, req.body);
    }

    return res.status(200).json({
      message: 'Successfully Edited Project',
      data: serviceRes,
    });
  } catch (error) {
    next(error);
  }
};

const editHotspot = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId, panoramaId, hotspotId } = req.params;

    const serviceRes = await editHotspotService(
      projectId,
      panoramaId,
      hotspotId,
      req.body
    );
    return res.status(200).json({
      message: 'Successfully Edited Hotspot',
      data: serviceRes,
    });
  } catch (error) {
    next(error);
  }
};

export {
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
  getPanoramaById,
  editProject,
  editHotspot,
  editProfile,
};

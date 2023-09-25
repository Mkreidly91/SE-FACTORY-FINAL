import { Request, Response, NextFunction } from 'express';
import {
  getAllProjectsService,
  getProjectByIdService,
  searchProjectService,
} from '../services/common.service';
import { escapeRegExp } from 'lodash';
const searchProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, perPage } = req.params;

    const { message, data } = await searchProjectService(req.body, {
      page,
      perPage,
    });

    return res.status(200).json({
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, perPage } = req.params;
    const serviceRes = await getAllProjectsService(page, perPage);
    return res
      .status(200)
      .json({ message: 'Successfully fetched projects', data: serviceRes });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const serviceRes = await getProjectByIdService(projectId);
    return res.status(200).json({
      message: 'Successfully fetched Projects',
      data: serviceRes,
    });
  } catch (error) {
    next(error);
  }
};
export { searchProject, getAllProjects, getProjectById };

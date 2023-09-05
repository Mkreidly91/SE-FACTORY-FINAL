import { Company } from '../models/company';
import { IProjectDocument, IProject, Project } from '../models/project';
import { Apartment, IApartment, IApartmentDocument } from '../models/apartment';
import { IPanorama, Panorama } from '../models/panorama';
import { S3Client } from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
import envConfig from '../configs/env.config';
import { HttpException } from '../exceptions/HttpException';
import { upload } from '../helpers/s3.helpers';

const createProjectService = async ({ owner, name, description }: IProject) => {
  const project = new Project({
    name,
    description,
    owner,
  });
  await project.save();
  return {
    message: 'Project successfully created',
    data: project,
  };
};

const addApartmentService = async (
  projectId: mongoose.Types.ObjectId,
  fileData: Express.Multer.File,
  { name, description }: IApartment
) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const storageRes = await upload(fileData);

  const apartment = new Apartment({
    name,
    description,
    url: storageRes,
  });

  project.apartments.push(apartment);
  await project.save();
  return apartment;
};

const addPanoramaService = async (
  projectId: mongoose.Types.ObjectId,
  apartmentId: mongoose.Types.ObjectId,
  fileData: Express.Multer.File
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const apartment = project.apartments.find((e) => e._id === apartmentId);
  if (!apartment) {
    throw new HttpException(400, 'Apartment not found');
  }

  const storageRes = await upload(fileData);

  const panorama = new Panorama({ url: storageRes });
  apartment.panoramas.push(panorama);
  await project.save();
};
export { createProjectService, addApartmentService, addPanoramaService };

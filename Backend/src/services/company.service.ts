import { Company } from '../models/company';
import { IProjectDocument, IProject, Project } from '../models/project';
import { Apartment, IApartment, IApartmentDocument } from '../models/apartment';
import { IPanorama, Panorama } from '../models/panorama';
import { S3Client } from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
import envConfig from '../configs/env.config';
import { HttpException } from '../exceptions/HttpException';
import { upload } from '../helpers/s3.helpers';
import { IMarker, Marker } from '../models/marker';
import { Hotspot, IHotspot } from '../models/hotspot';

const createProjectService = async ({ owner, name, description }: IProject) => {
  const company = await Company.findById(owner);
  if (!company) {
    throw new HttpException(400, 'company not found');
  }
  const project = new Project({
    name,
    description,
    owner,
  });
  company.projects.push(project._id);
  await project.save();
  await company.save();
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
  console.log(project.apartments);
  const apartment = project.apartments.find((e) => e._id.equals(apartmentId));
  if (!apartment) {
    throw new HttpException(400, 'Apartment not found');
  }

  const storageRes = await upload(fileData);

  const panorama = new Panorama({ url: storageRes });
  apartment.panoramas.push(panorama);
  await project.save();
  return panorama;
};

const addHotspotService = async (
  projectId: mongoose.Types.ObjectId,
  apartmentId: mongoose.Types.ObjectId,
  panoramaId: mongoose.Types.ObjectId,
  { link, info, yaw, pitch }: IHotspot
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const apartment = project.apartments.find((e) => e._id.equals(apartmentId));
  if (!apartment) {
    throw new HttpException(400, 'Apartment not found');
  }

  const panorama = apartment.panoramas.find((e) => e._id.equals(panoramaId));
  if (!panorama) {
    throw new HttpException(400, 'panorama not found');
  }

  const hotspot = new Hotspot({
    link,
    info,
    yaw,
    pitch,
  });

  panorama.hotspots.push(hotspot);
  await project.save();
  return hotspot;
};

const addMarkerService = async (
  projectId: mongoose.Types.ObjectId,
  apartmentId: mongoose.Types.ObjectId,
  panoramaId: mongoose.Types.ObjectId,
  { x, y, z }: IMarker
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const apartment = project.apartments.find((e) => e._id.equals(apartmentId));
  if (!apartment) {
    throw new HttpException(400, 'Apartment not found');
  }

  const panorama = apartment.panoramas.find((e) => e._id.equals(panoramaId));
  if (!panorama) {
    throw new HttpException(400, 'panorama not found');
  }

  const marker = new Marker({
    x,
    y,
    z,
  });

  panorama.marker = marker;
  await project.save();
  return marker;
};

const deleteProjectService = async (projectId: mongoose.Types.ObjectId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const owner = await Company.findById(project.owner);
  if (!owner) {
    throw new HttpException(400, 'Owner not found');
  }

  owner.projects = owner.projects.filter((id) => !id.equals(project._id));
  const deleted = await project.deleteOne();
};

export {
  createProjectService,
  addApartmentService,
  addPanoramaService,
  addMarkerService,
  addHotspotService,
};

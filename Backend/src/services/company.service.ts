import { Company } from '../models/company';
import { IProjectDocument, IProject, Project } from '../models/project';
import { Apartment, IApartment, IApartmentDocument } from '../models/apartment';
import { IPanorama, Panorama } from '../models/panorama';
import { S3Client } from '@aws-sdk/client-s3';
import mongoose from 'mongoose';
import envConfig from '../configs/env.config';
import { HttpException } from '../exceptions/HttpException';
import { deleteBulk, deleteFile, upload } from '../helpers/s3.helpers';
import { IMarker, Marker } from '../models/marker';
import { Hotspot, IHotspot } from '../models/hotspot';
import { FileSystemCredentials } from 'aws-sdk';

const createProjectService = async (
  fileData: Express.Multer.File,
  {
    owner,
    name,
    description,
    features,
    bedrooms,
    bathrooms,
    size,
    location,
    price,
  }: IProject
) => {
  const company = await Company.findById(owner);

  if (!company) {
    throw new HttpException(400, 'company not found');
  }
  const storageRes = await upload(fileData);

  const project = new Project({
    name,
    description,
    owner,
    features: features || [],
    thumbnail: storageRes,
    bedrooms,
    bathrooms,
    size,
    location,
    price,
  });

  company.projects.push(project._id);
  await project.save();
  await company.save();
  return {
    message: 'Project successfully created',
    data: project,
  };
};

const ProjectThumbnailService = async (
  fileData: Express.Multer.File,
  projectId: string
) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  if (project.thumbnail) {
    await deleteFile(project.thumbnail);
  }
  const storageRes = await upload(fileData);
  project.thumbnail = storageRes;
  const newProject = await project.save();
  return newProject.thumbnail;
};

const addApartmentService = async (
  fileData: Express.Multer.File,
  projectId: string
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  if (project.url) {
    await deleteFile(project.url);
  }
  const storageRes = await upload(fileData);
  project.url = storageRes;
  const newProject = await project.save();
  return newProject.url;
};

const deleteApartmentService = async (projectId: string) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  if (project.url) {
    await deleteFile(project.url);
    project.url = '';
  }

  const newProject = await project.save();
  return newProject.url;
};

const addPanoramaService = async (
  projectId: mongoose.Types.ObjectId,
  name: string,
  fileData: Express.Multer.File
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const storageRes = await upload(fileData);

  const panorama = new Panorama({ url: storageRes, name });
  project.panoramas.push(panorama);
  await project.save();
  return panorama;
};

const addHotspotService = async (
  projectId: mongoose.Types.ObjectId,
  panoramaId: mongoose.Types.ObjectId,
  { link, info, yaw, pitch }: IHotspot
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const panorama = project.panoramas.find((e) => e._id.equals(panoramaId));
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
  return panorama.hotspots;
};

const addMarkerService = async (
  projectId: mongoose.Types.ObjectId,

  panoramaId: mongoose.Types.ObjectId,
  { x, y, z }: IMarker
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const panorama = project.panoramas.find((e) => e._id.equals(panoramaId));
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
  let filesToDelete: string[] = [];

  if (project.thumbnail) {
    filesToDelete = [project.thumbnail];
  }
  if (project.url) {
    filesToDelete = [...filesToDelete, project.url];
  }

  if (project.panoramas.length > 0) {
    const panoramaUrls = project.panoramas.map((e) => e.url);
    filesToDelete = [...filesToDelete, ...panoramaUrls];
  }
  if (filesToDelete.length > 0) {
    await deleteBulk(filesToDelete);
  }

  owner.projects = owner.projects.filter((id) => !id.equals(project._id));
  await owner.save();
  const deleted = await project.deleteOne();
  return deleted;
};

const deletePanoramaService = async (
  projectId: mongoose.Types.ObjectId,

  panoramaId: mongoose.Types.ObjectId
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const panorama = project.panoramas.find((e) => e._id.equals(panoramaId));
  if (!panorama) {
    throw new HttpException(400, 'Panorama not found');
  }

  await deleteFile(panorama.url);

  project.panoramas = project.panoramas.filter(
    (e) => !e._id.equals(panoramaId)
  );

  for (const pano of project.panoramas) {
    pano.hotspots = pano.hotspots.filter(
      (hotspot) => !hotspot.link.equals(panoramaId)
    );
  }

  await project.save();
  return project.panoramas;
};

const deleteMarkerService = async (
  projectId: mongoose.Types.ObjectId,

  panoramaId: mongoose.Types.ObjectId
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const panorama = project.panoramas.find((e) => e._id.equals(panoramaId));
  if (!panorama) {
    throw new HttpException(400, 'Panorama not found');
  }

  await panorama.marker.deleteOne();

  await deleteFile(panorama.url);

  await project.save();
  return true;
};

const deleteHotspotService = async (
  projectId: mongoose.Types.ObjectId,

  panoramaId: mongoose.Types.ObjectId,
  hotspotId: mongoose.Types.ObjectId
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const panorama = project.panoramas.find((e) => e._id.equals(panoramaId));
  if (!panorama) {
    throw new HttpException(400, 'Panorama not found');
  }

  const hotspot = panorama.hotspots.find((e) => e._id.equals(hotspotId));
  if (!hotspot) {
    throw new HttpException(400, 'Hotspot not found');
  }

  panorama.hotspots = panorama.hotspots.filter((e) => !e._id.equals(hotspotId));
  await project.save();
  console.log(panorama.hotspots);
  return panorama.hotspots;
};

const getCompanyProjectsService = async (userId: string) => {
  const company = await Company.findById(userId).populate('projects');
  if (!company) {
    throw new HttpException(400, 'User not found');
  }
  return company;
};

const getProjectByIdService = async (projectId: string) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }
  return project;
};

const getPanoramaByIdService = async (
  projectId: string,
  panoramaId: string
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }
  const panorama = project.panoramas.find((e) => e._id.equals(panoramaId));
  if (!panorama) {
    throw new HttpException(400, 'Panorama not found');
  }

  return panorama;
};

const editProjectService = async (
  projectId: string,
  fields: any,
  fileData?: Express.Multer.File
) => {
  const project = await Project.findByIdAndUpdate(projectId, fields);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }
  if (fileData) {
    await deleteFile(project.thumbnail);
    const storageRes = await upload(fileData);
    project.thumbnail = storageRes;
  }
  const newProject = await project.save();
  return newProject;
};
const editProfileService = async (
  user: any,
  fields: any,
  fileData?: Express.Multer.File
) => {
  const profile = await Company.findByIdAndUpdate(user._id, fields);
  if (!profile) {
    throw new HttpException(400, 'Profile not found');
  }

  if (fileData) {
    if (profile.logo) {
      await deleteFile(profile.logo);
    }
    const storageRes = await upload(fileData);
    profile.logo = storageRes;
  }
  const newProfile = await profile.save();
  return newProfile;
};

const editHotspotService = async (
  projectId: string,
  panoramaId: string,
  hotspotId: string,
  fields: any
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const panorama = project.panoramas.find((e) => e._id.equals(panoramaId));
  if (!panorama) {
    throw new HttpException(400, 'Panorama not found');
  }

  let hotspot = panorama.hotspots.find((e) => e._id.equals(hotspotId));
  if (!hotspot) {
    throw new HttpException(400, 'Hotspot not found');
  }

  hotspot.info = fields.info ? fields.info : hotspot.info;
  hotspot.link = fields.link ? fields.link : hotspot.link;
  const newProject = await project.save();
  const newHotspots = newProject.panoramas.find((e) =>
    e._id.equals(panoramaId)
  ).hotspots;

  // console.log(newHotspots);
  return newHotspots;
};
export {
  createProjectService,
  addApartmentService,
  addPanoramaService,
  addMarkerService,
  addHotspotService,
  deleteProjectService,
  deletePanoramaService,
  deleteMarkerService,
  deleteHotspotService,
  deleteApartmentService,
  editProfileService,
  getCompanyProjectsService,
  getProjectByIdService,
  getPanoramaByIdService,
  editProjectService,
  editHotspotService,
};

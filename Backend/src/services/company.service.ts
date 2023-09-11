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

const createProjectService = async (
  fileData: Express.Multer.File,
  { owner, name, description, features }: IProject
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

  let filesToDelete: string[] = [project.thumbnail];
  if (project.apartments.length > 0) {
    const panormasToDelete = project.apartments.forEach((apartment) => {
      const apartmentUrl = apartment.url;
      if (apartment.panoramas.length > 0) {
        const panoramaUrls = apartment.panoramas.map((e) => e.url);
        filesToDelete = [...filesToDelete, ...panoramaUrls, apartmentUrl];
      } else {
        filesToDelete = [...filesToDelete, apartmentUrl];
      }
    });
  }
  await deleteBulk(filesToDelete);

  owner.projects = owner.projects.filter((id) => !id.equals(project._id));
  await owner.save();
  const deleted = await project.deleteOne();
  return deleted;
};

const deleteApartmentService = async (
  projectId: mongoose.Types.ObjectId,
  apartmentId: mongoose.Types.ObjectId
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Project not found');
  }

  const apartment = project.apartments.find((e) => e._id.equals(apartmentId));
  if (!apartment) {
    throw new HttpException(400, 'Apartment not found');
  }

  await deleteFile(apartment.url);

  if (apartment.panoramas.length > 0) {
    const panoramasToDelete = apartment.panoramas.map((e) => e.url);
    await deleteBulk(panoramasToDelete);
  }

  project.apartments = project.apartments.filter(
    (e) => !e._id.equals(apartmentId)
  );

  const newProject = await project.save();

  return newProject.apartments;
};

const deletePanoramaService = async (
  projectId: mongoose.Types.ObjectId,
  apartmentId: mongoose.Types.ObjectId,
  panoramaId: mongoose.Types.ObjectId
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
    throw new HttpException(400, 'Panorama not found');
  }

  await deleteFile(panorama.url);

  apartment.panoramas = apartment.panoramas.filter(
    (e) => !e._id.equals(panoramaId)
  );
  await project.save();
  return apartment.panoramas;
};

const deleteMarkerService = async (
  projectId: mongoose.Types.ObjectId,
  apartmentId: mongoose.Types.ObjectId,
  panoramaId: mongoose.Types.ObjectId
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
    throw new HttpException(400, 'Panorama not found');
  }

  await panorama.marker.deleteOne();

  await deleteFile(panorama.url);

  await project.save();
  return true;
};

const deleteHotspotService = async (
  projectId: mongoose.Types.ObjectId,
  apartmentId: mongoose.Types.ObjectId,
  panoramaId: mongoose.Types.ObjectId,
  hotspotId: mongoose.Types.ObjectId
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
    throw new HttpException(400, 'Panorama not found');
  }

  const hotspot = panorama.hotspots.find((e) => e._id.equals(hotspotId));
  if (!hotspot) {
    throw new HttpException(400, 'Hotspot not found');
  }

  panorama.hotspots = panorama.hotspots.filter((e) => !e._id.equals(hotspotId));
  await project.save();
  return panorama.hotspots;
};

const getCompanyProjectsService = async (userId: string) => {
  const company = await Company.findById(userId).populate('projects');
  if (!company) {
    throw new HttpException(400, 'User not found');
  }
  return company;
};
export {
  createProjectService,
  addApartmentService,
  addPanoramaService,
  addMarkerService,
  addHotspotService,
  deleteProjectService,
  deleteApartmentService,
  deletePanoramaService,
  deleteMarkerService,
  deleteHotspotService,
  getCompanyProjectsService,
};

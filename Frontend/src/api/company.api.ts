const baseURL = 'http://localhost:8080/';
import axios from 'axios';
import { ProjectFormSchemaType } from '../validation/company.validation';
import { headers } from './api.helpers';

const getProjects = async () => {
  try {
    const res = await axios.get(
      `${baseURL}company/getCompanyProjects`,
      headers()
    );
    if (res.status === 200) {
      console.log(res);
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getProjectById = async (projectId: string) => {
  try {
    const res = await axios.get(
      `${baseURL}company/getProject/${projectId}`,
      headers()
    );
    if (res.status === 200) {
      console.log(res);
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getPanoramaById = async (projectId: string, panoramaId: string) => {
  try {
    const res = await axios.get(
      `${baseURL}company/getPanoramaById/${projectId}/${panoramaId}`,
      headers()
    );
    if (res.status === 200) {
      console.log(res);
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const createProject = async (formData: ProjectFormSchemaType) => {
  try {
    console.log(formData);
    const res = await axios.post(
      `${baseURL}company/createProject`,
      formData,
      headers({ 'Content-Type': 'multipart/form-data' })
    );
    if (res.status === 200) {
      console.log(res);
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const addHotspot = async (
  projectId: string,
  panoramaId: string,
  formData: any
) => {
  try {
    const res = await axios.post(
      `${baseURL}company/addHotspot`,
      { projectId, panoramaId, ...formData },
      headers()
    );
    if (res.status === 200) {
      console.log(res);
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const editProject = async (projectId: string, fields: any) => {
  try {
    const res = await axios.put(
      `${baseURL}company/editProject/${projectId}`,
      fields,
      headers({ 'Content-Type': 'multipart/form-data' })
    );
    if (res.status === 200) {
      console.log(res);
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const editHotspot = async (
  projectId: string,
  panoramaId: string,
  hotspotId: string,
  fields: any
) => {
  try {
    const res = await axios.put(
      `${baseURL}company/editHotspot/${projectId}/${panoramaId}/${hotspotId}`,
      fields,
      headers()
    );
    if (res.status === 200) {
      console.log(res);
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (projectId: string) => {
  try {
    const res = await axios.delete(`${baseURL}company/deleteProject`, {
      data: {
        projectId,
      },
      ...headers(),
    });
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const deletePanorama = async (projectId: string, panoramaId: string) => {
  try {
    const res = await axios.delete(`${baseURL}company/deleteProject`, {
      data: {
        projectId,
        panoramaId,
      },
      ...headers(),
    });
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

const deleteHotspot = async (
  projectId: string,
  panoramaId: string,
  hotspotId: string
) => {
  try {
    const res = await axios.delete(`${baseURL}company/deleteHotspot`, {
      data: {
        projectId,
        panoramaId,
        hotspotId,
      },
      ...headers(),
    });
    if (res.status === 200) {
      console.log(res.data.data);
      return [res.status, res.data.data];
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getProjects,
  createProject,
  addHotspot,
  getProjectById,
  getPanoramaById,
  editProject,
  deleteProject,
  deletePanorama,
  editHotspot,
  deleteHotspot,
};

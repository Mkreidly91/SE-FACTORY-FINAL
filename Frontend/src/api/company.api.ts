import axios, { AxiosError } from 'axios';
import { ProjectFormSchemaType } from '../validation/company.validation';
import { handleError, headers } from './api.helpers';

const baseURL = import.meta.env.VITE_URL;
const getProjects = async () => {
  try {
    const res = await axios.get(
      `${baseURL}company/getCompanyProjects`,
      headers()
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const getProjectById = async (projectId: string) => {
  try {
    const res = await axios.get(
      `${baseURL}company/getProject/${projectId}`,
      headers()
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const getPanoramaById = async (projectId: string, panoramaId: string) => {
  try {
    const res = await axios.get(
      `${baseURL}company/getPanoramaById/${projectId}/${panoramaId}`,
      headers()
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const createProject = async (formData: ProjectFormSchemaType) => {
  try {
    const res = await axios.post(
      `${baseURL}company/createProject`,
      formData,
      headers({ 'Content-Type': 'multipart/form-data' })
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
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
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const addApartment = async (projectId: string, formData: any) => {
  try {
    const res = await axios.post(
      `${baseURL}company/addApartment`,
      { projectId, ...formData },
      headers({ 'Content-Type': 'multipart/form-data' })
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};
const addPanorama = async (projectId: string, formData: any) => {
  try {
    const res = await axios.post(
      `${baseURL}company/addPanorama`,
      { projectId, ...formData },
      headers({ 'Content-Type': 'multipart/form-data' })
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
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
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
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
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
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
      return res.status;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const deleteApartment = async (projectId: string) => {
  try {
    const res = await axios.delete(`${baseURL}company/deleteApartment`, {
      data: {
        projectId,
      },
      ...headers(),
    });
    return res.status;
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const deletePanorama = async (projectId: string, panoramaId: string) => {
  try {
    const res = await axios.delete(`${baseURL}company/deletePanorama`, {
      data: {
        projectId,
        panoramaId,
      },
      ...headers(),
    });
    return res.status;
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
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
      return res.status;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

export {
  getProjects,
  createProject,
  addApartment,
  addPanorama,
  addHotspot,
  getProjectById,
  getPanoramaById,
  editProject,
  deleteProject,
  deleteApartment,
  deletePanorama,
  editHotspot,
  deleteHotspot,
};

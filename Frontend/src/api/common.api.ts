const baseURL = 'http://localhost:80/';
import axios, { AxiosError } from 'axios';
import { handleError } from './api.helpers';
import { ProjectSearchFormSchemaType } from '../validation/project.validation';

const searchProject = async (
  page = 1,
  perPage = 10,
  formData?: ProjectSearchFormSchemaType
) => {
  try {
    const res = await axios.post(
      `${baseURL}search/project/${page}/${perPage}`,
      formData
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const getAllProjects = async (page = 1, perPage = 10) => {
  try {
    const res = await axios.get(`${baseURL}getAllProjects/${page}/${perPage}`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

export { searchProject, getAllProjects };

const baseURL = 'http://localhost:8080/';
import axios from 'axios';
import { ProjectFormSchemaType } from '../components/Forms/ProjectForm';
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
    }
  } catch (error) {
    console.log(error);
  }
};

export { getProjects, createProject };

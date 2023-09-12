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

const editProject = async (projectId: string, fields: any) => {
  try {
    console.log(fields);
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

const deleteProject = async (projectId: string) => {
  const res = await axios.delete(`${baseURL}company/deleteProject`, {
    data: { projectId },
    ...headers(),
  });
};
export {
  getProjects,
  createProject,
  getProjectById,
  editProject,
  deleteProject,
};

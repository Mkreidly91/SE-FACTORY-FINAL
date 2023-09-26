import axios, { AxiosError } from 'axios';
import {
  LoginFormSchemaType,
  SignupFormSchemaType,
} from '../validation/user.validation';
import { handleError } from './api.helpers';

const baseURL = import.meta.env.VITE_URL;
const signup = async (formData: SignupFormSchemaType) => {
  try {
    const res = await axios.post(`${baseURL}auth/register`, formData);
    console.log(res);
    if (res.status === 200) {
      return { status: res.status };
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

const login = async (formData: LoginFormSchemaType) => {
  try {
    const res = await axios.post(`${baseURL}auth/login`, formData);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};
export { signup, login };

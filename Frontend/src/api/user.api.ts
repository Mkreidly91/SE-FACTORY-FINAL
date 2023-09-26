import axios from 'axios';
import { headers } from './api.helpers';

const baseURL = import.meta.env.VITE_URL;

const getUserInfo = async () => {
  try {
    const res = await axios.get(`${baseURL}auth/getUser`, headers());
    if (res.status === 200) {
      return res.data.profile;
    }
  } catch (error) {
    console.log(error);
  }
};

const editCompanyProfile = async (fields: any) => {
  try {
    const res = await axios.put(
      `${baseURL}company/editProfile`,
      fields,
      headers({ 'Content-Type': 'multipart/form-data' })
    );
    if (res.status === 200) {
      return res.data.user;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserInfo, editCompanyProfile };

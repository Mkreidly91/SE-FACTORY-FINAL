const baseURL = "http://localhost:8080/";
import axios, { AxiosError } from "axios";
import { handleError } from "./api.helpers";
import { ProjectSearchFormSchemaType } from "../validation/project.validation";

const searchProject = async (formData: ProjectSearchFormSchemaType) => {
  try {
    const res = await axios.post(
      `${baseURL}search/project`,
      formData,
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    const errors = error as Error | AxiosError;
    return handleError(errors);
  }
};

export { searchProject };

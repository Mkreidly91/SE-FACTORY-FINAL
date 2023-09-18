import { AxiosError, isAxiosError } from 'axios';

interface ValidationError {
  status: number;
  data: string;
  message: string;
  errors: Record<string, string[]>;
}
export type ApiError = {
  status: number;
  message: string;
};
const headers = (contentType?: {}) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo || '');
    return {
      headers: { Authorization: `Bearer ${token}`, ...contentType },
    };
  }
  return {
    headers: contentType,
  };
};
const getUser = () => {
  const { user } = JSON.parse(localStorage.getItem('userInfo') || '');
  return user;
};
const handleError = (e: Error | AxiosError) => {
  if (isAxiosError<ValidationError, Record<string, unknown>>(e)) {
    if (e.response) {
      const {
        status,
        data: { message },
      } = e.response;
      return {
        error: {
          status,
          message,
        },
      };
    } else {
      throw e;
    }
  } else {
    throw e;
  }
};
export { headers, getUser, handleError };

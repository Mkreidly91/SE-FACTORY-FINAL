import { Alert } from '@mui/material';
import { ApiError } from '../../api/api.helpers';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ApiErrorHandler = ({ error }: { error: ApiError | null }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (error?.status === 401) navigate('/login');
  }, [error?.status]);
  return (
    error && error.status && <Alert severity="error">{error.message}</Alert>
  );
};

export default ApiErrorHandler;

import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth.api';
import {
  LoginFormSchemaType,
  loginFormSchema,
} from '../../validation/user.validation';
import { useState } from 'react';
import { ApiError } from '../../api/api.helpers';
import ApiErrorHandler from '../Common/ApiError';
import SubmitButton from '../Common/SubmitButton';

const LoginForm = ({ className }: { className: string }) => {
  const navigate = useNavigate();
  const [err, setError] = useState<ApiError | null>(null);
  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    const res = await login(data);
    if (res.error) setError(res.error);
    if (res.token) {
      localStorage.setItem('userInfo', JSON.stringify(res));
      navigate('/dashboard/projects');
    }
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div
        className={`project-form-left flex w-fit flex-col gap-1 items-center ${className}`}
      >
        <ApiErrorHandler error={err} />
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-gray-600 text-sm">Email</label>
          <TextField
            className="max-w-[600px]"
            required
            onFocus={() => clearErrors('email')}
            error={Boolean(errors.email)}
            helperText={errors?.email?.message || ' '}
            {...register('email')}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-gray-600 text-sm">
            Password
          </label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: '' }}
            required
            type="password"
            onFocus={() => clearErrors('password')}
            error={Boolean(errors.password)}
            helperText={errors?.password?.message || ' '}
            {...register('password')}
          />
        </div>

        <div className=" w-full project-form-buttons flex justify-between items-center gap-3">
          <SubmitButton
            conditions={{ isSubmitting, isValid }}
            buttonText="Sign in"
          />
          <div className="text-sm ">
            No account? Sign up
            <Link to="/signUp">
              <span className="text-sky-700"> here</span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

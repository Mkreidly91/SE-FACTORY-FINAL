import { Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth.api';
import {
  LoginFormSchemaType,
  loginFormSchema,
} from '../../validation/user.validation';
import { useState } from 'react';
import { ApiError } from '../../api/api.helpers';
import ApiErrorHandler from '../Common/ApiError';

const LoginForm = () => {
  const navigate = useNavigate();
  const [err, setError] = useState<ApiError | null>(null);
  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    const res = await login(data);
    if (res.error) setError(res.error);
    if (res.token) {
      localStorage.setItem('userInfo', JSON.stringify(res));
      navigate('/dashboard');
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 w-full h-full justify-around  mt-20"
    >
      <div className="project-form-left w-[50%] flex flex-col gap-1 items-center ">
        <ApiErrorHandler error={err} />
        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold">Email</label>
          <TextField
            className="max-w-[600px]"
            required
            onFocus={() => clearErrors('email')}
            error={Boolean(errors.email)}
            helperText={errors?.email?.message || ' '}
            {...register('email')}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Password</label>
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

        <Button
          color="inherit"
          className="bg-red-200 text-red-200 font-extrabold self-start"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

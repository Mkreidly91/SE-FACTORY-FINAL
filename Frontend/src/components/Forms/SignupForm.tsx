import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@material-tailwind/react';

import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../api/auth.api';
import {
  SignupFormSchemaType,
  signupFormSchema,
} from '../../validation/user.validation';
import { useState } from 'react';
import { ApiError } from '../../api/api.helpers';
import ApiErrorHandler from '../Common/ApiError';

const SignupForm = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const [err, setError] = useState<ApiError | null>(null);
  const onSubmit: SubmitHandler<SignupFormSchemaType> = async (data) => {
    const res = (await signup(data)) as any;
    if (res?.status === 200) {
      navigate('/login');
    } else if (res?.error) {
      setError(res.error);
    }
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div
        className={`project-form-left flex flex-col gap-1 items-center ${className}`}
      >
        <ApiErrorHandler error={err} />
        <div className="flex flex-col gap-1 w-full justify-center">
          <label className="font-semibold text-gray-600 text-sm">Name</label>
          <TextField
            className="max-w-[600px]"
            required
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('name')}
            error={Boolean(errors.name)}
            helperText={errors?.name?.message || ' '}
            {...register('name')}
          />
        </div>

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

        <div className="flex flex-col gap-1 w-full justify-center">
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

        <div className="flex flex-col gap-1 w-full justify-center">
          <label className="font-semibold text-gray-600 text-sm">
            Confirm Password
          </label>
          <TextField
            className="max-w-[600px]"
            required
            type="password"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('confirmPassword')}
            error={Boolean(errors.confirmPassword)}
            helperText={errors?.confirmPassword?.message || ' '}
            {...register('confirmPassword')}
          />
        </div>

        {/* <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">User Type</label>
          <TextField
            className="max-w-[600px]"
            type="number"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('userType')}
            error={Boolean(errors.userType)}
            helperText={errors?.userType?.message || ' '}
            {...register('userType', { valueAsNumber: true })}
          />
        </div> */}

        <div className=" w-full project-form-buttons flex justify-between items-center gap-3">
          <Button
            ripple
            type="submit"
            disabled={isSubmitting || !isValid}
            variant={`gradient`}
            className="light-gradient p-4 font-sora font-normal uppercase tracking-wider px-10 cursor-pointer disabled  "
            size="md"
          >
            Sign up
          </Button>
          <div className="text-sm ">
            Have an account? Sign in
            <Link to="/login">
              <a className="text-sky-700"> here</a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;

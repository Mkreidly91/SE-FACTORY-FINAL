import { Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

editUserSchema;
import Photo from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import NoPhoto from '@mui/icons-material/ImageNotSupportedOutlined';
import { useEffect, useState } from 'react';
import {
  createProject,
  deleteProject,
  editProject,
} from '../../api/company.api';
import FeatureBox from '../Common/FeatureBox';
import FileUploadForm from '../Common/FileUploadForm';

import { useNavigate } from 'react-router-dom';
import { filterChangedFormFields } from '../../helpers/helpers';
import { editUserSchema, UserSchema } from '../../validation/user.validation';
import { editCompanyProfile } from '../../api/user.api';

const EditProfileForm = ({
  initialValues,
}: {
  initialValues: { name: string; email: string; logo?: string; tel?: string };
}) => {
  const [preview, setPreview] = useState() as any;
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      const { name, email, tel, logo } = initialValues;
      reset({
        name,
        email,
        tel,
        file: logo,
      });
      setPreview(logo);
    }
  }, [initialValues]);

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    const changedFieldValues = filterChangedFormFields(data, dirtyFields);
    const res = await editCompanyProfile(data);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: {
      errors,
      isSubmitting,
      touchedFields,
      isValid,
      dirtyFields,
      isDirty,
    },
  } = useForm<UserSchema>({
    resolver: zodResolver(editUserSchema),
    mode: 'onSubmit',
    criteriaMode: 'firstError',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 w-full h-full justify-around  mt-20"
    >
      <div className="project-form-left w-[50%] flex flex-col gap-1 items-center ">
        <div className="flex flex-col gap-1 w-full justify-center">
          <label className="font-semibold text-gray-600 text-sm">
            Company Name
          </label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('name')}
            error={Boolean(errors.name)}
            helperText={errors?.name?.message || ' '}
            {...register('name')}
          />
        </div>

        <div className="flex flex-col gap-1 w-full justify-center">
          <label className="font-semibold text-gray-600 text-sm">Email</label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('email')}
            error={Boolean(errors.email)}
            helperText={errors?.email?.message || ' '}
            {...register('email')}
          />
        </div>

        <div className="flex flex-col gap-1 w-full justify-center">
          <label className="font-semibold text-gray-600 text-sm">Tel</label>
          <TextField
            className="max-w-[600px]"
            type="tel"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('tel')}
            error={Boolean(errors.tel)}
            helperText={errors?.tel?.message || ' '}
            {...register('tel')}
          />
        </div>
      </div>

      <div className="project-form-right w-[300px] grow flex flex-col gap-3">
        <div className="image-preview flex items-center justify-center w-[300px] h-[300px] bg-gray-200 text-[200px] rounded-md ">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover rounded-md"
              alt=""
            />
          ) : (
            <NoPhoto style={{ fontSize: '150px' }} />
          )}
        </div>

        <label
          className={`file-input flex justify-center items-center bg-transparent border border-black  border-dashed cursor-pointer p-20 rounded-md ${
            errors?.file?.message ? 'border-red-700' : ' '
          }`}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <Photo color="primary" style={{ fontSize: '100px' }} />
            <span className="text-gray-500">
              Drop your image here, or browse
            </span>
            <span className="text-gray-500">Only jpeg, png are allowed</span>
          </div>

          <input
            hidden
            className="w-full h-full "
            accept="image/png, image/jpeg"
            type="file"
            {...register('file')}
            onChange={async (e) => {
              const file = new FileReader();
              file.onload = () => {
                setPreview(file.result);
              };

              const firstFile = e?.target?.files?.[0];
              if (firstFile) {
                file.readAsDataURL(firstFile || '');
              } else {
                setPreview('');
              }
              register('file').onChange(e);
            }}
          />
        </label>

        <div className="error text-sm text-red-600">
          {errors?.file?.message?.toString() || ' '}
        </div>

        <div className="project-form-buttons flex justify-center gap-3s">
          <Button
            color="inherit"
            className="bg-red-200 text-red-200 font-extrabold"
            type="submit"
            disabled={!isDirty || isSubmitting}
          >
            Save
          </Button>
          {/* 
          {id && (
            <Button
              color="inherit"
              className="bg-red-200 text-red-200 font-extrabold"
              style={{ color: 'red' }}
              type="button"
              onClick={async () => {
                const status = await deleteProject(initialValues?._id);

                if (status === 200) navigate('/dashboard/projects');
              }}
            >
              Delete Project
            </Button>
          )} */}
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;

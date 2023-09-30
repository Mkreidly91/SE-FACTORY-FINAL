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
import UploadButton from '../Common/UploadButton';
import Toast from '../Common/Toast';
import { TroubleshootOutlined } from '@mui/icons-material';

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
    if (res === 200) {
      setToastDisplay(true);
      reset({}, { keepValues: true });
    }
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
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });

  const [toastDisplay, setToastDisplay] = useState(false);
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 w-full h-full justify-around  mt-20"
    >
      {toastDisplay && (
        <Toast setOpen={setToastDisplay} text="Successfully edited profile" />
      )}
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

        <Button
          color="inherit"
          className="self-start font-extrabold"
          type="submit"
          disabled={!isDirty || isSubmitting || !isValid}
        >
          Save
        </Button>
      </div>

      <div className="project-form-right flex flex-col gap-3">
        <div className="image-preview flex items-center justify-center w-[300px] h-[300px] bg-gray-200 text-[200px] rounded-md ">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover rounded-md"
              alt=""
            />
          ) : (
            <Photo style={{ fontSize: '150px' }} />
          )}
        </div>

        <UploadButton
          accept="image/png, image/jpeg"
          text="Upload"
          className="w-fit py-2 px-5 self-center cursor-pointer "
          register={register}
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
        <div className="error text-sm text-red-600">
          {errors?.file?.message?.toString() || ' '}
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;

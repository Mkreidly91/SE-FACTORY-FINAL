import { Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  projectFormSchema,
  ProjectFormSchemaType,
} from '../../validation/company.validation';
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

const ProjectForm = ({
  initialValues,
  id = '',
}: {
  initialValues: {
    name: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    location: string;
    price: number;
    size: number;
    features: string[];
    thumbnail: string;
  };
  id: string;
}) => {
  // console.log(initialValues);
  const [preview, setPreview] = useState() as any;

  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues && id) {
      const {
        name,
        features,
        description,
        thumbnail,
        size,
        bedrooms,
        bathrooms,
        location,
        price,
      } = initialValues;
      reset({
        name,
        description,
        features,
        size,
        bedrooms,
        bathrooms,
        location,
        price,
        file: thumbnail,
      });
      setPreview(thumbnail);
    }
  }, [initialValues, id]);

  const onSubmit: SubmitHandler<ProjectFormSchemaType> = async (data) => {
    // console.log(data);
    if (!id) {
      const res = await createProject(data);
      navigate(`${res._id}`);
      return;
    } else {
      const changedFieldValues = filterChangedFormFields(data, dirtyFields);
      const res = await editProject(id, changedFieldValues);
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
  } = useForm<ProjectFormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: {
      size: 0,
      bedrooms: 0,
      bathrooms: 0,
      price: 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 w-full h-full justify-around  mt-20"
    >
      <div className="project-form-left w-[50%] flex flex-col gap-1 items-center ">
        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Project Name</label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('name')}
            error={Boolean(errors.name)}
            helperText={errors?.name?.message || ' '}
            {...register('name')}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold">Description</label>
          <TextField
            className="max-w-[600px]"
            multiline
            minRows={4}
            onFocus={() => clearErrors('description')}
            error={Boolean(errors.description)}
            helperText={errors?.description?.message || ' '}
            {...register('description')}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Location</label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('location')}
            error={Boolean(errors.location)}
            helperText={errors?.location?.message || ' '}
            {...register('location')}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Area</label>
          <TextField
            className="max-w-[600px]"
            type="number"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('size')}
            error={Boolean(errors.size)}
            helperText={errors?.size?.message || ' '}
            {...register('size', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Price</label>
          <TextField
            className="max-w-[600px]"
            type="number"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('price')}
            error={Boolean(errors.price)}
            helperText={errors?.price?.message || ' '}
            {...register('price', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Bedrooms</label>
          <TextField
            className="max-w-[600px]"
            type="number"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('size')}
            error={Boolean(errors.bedrooms)}
            helperText={errors?.bedrooms?.message || ' '}
            {...register('bedrooms', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Bathrooms</label>
          <TextField
            className="max-w-[600px]"
            type="number"
            InputLabelProps={{ className: '' }}
            onFocus={() => clearErrors('bathrooms')}
            error={Boolean(errors.bathrooms)}
            helperText={errors?.bathrooms?.message || ' '}
            {...register('bathrooms', { valueAsNumber: true })}
          />
        </div>

        <Controller
          name="features"
          control={control}
          render={({ field: { value, onChange } }) => (
            <FeatureBox features={value} setFeatures={onChange} />
          )}
        />
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
            disabled={id ? !isDirty || isSubmitting : isSubmitting || !isValid}
          >
            Submit
          </Button>

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
          )}
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;

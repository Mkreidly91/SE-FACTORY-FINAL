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
import { createProject, editProject } from '../../api/company.api';
import FeatureBox from '../Common/FeatureBox';
import FileUploadForm from '../Common/FileUploadForm';
import { useNavigate } from 'react-router-dom';
import { filterChangedFormFields } from '../../helpers/helpers';

const ProjectForm = ({
  initialValues = { name: '', features: [], description: '', thumbnail: '' },
  id = '',
}) => {
  const [preview, setPreview] = useState() as any;

  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues && id) {
      const { name, features, description, thumbnail } = initialValues;
      reset({ name, description, features, file: thumbnail || '' });
      setPreview(thumbnail);
    }
  }, [initialValues, id]);

  const onSubmit: SubmitHandler<ProjectFormSchemaType> = async (data) => {
    if (!id) {
      const res = await createProject(data);
      navigate(`${res._id}`);
      return;
    } else {
      const changedFieldValues = filterChangedFormFields(data, dirtyFields);
      const res = await editProject(id, changedFieldValues);
    }

    // fields = { ...fields, ...dirtyFields };
    // reset();
    // setFeatures([]);
    // setPreview();
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
      file: initialValues?.thumbnail || '',
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

        {/* <div className="error"> {Object.values(errors)[0]?.message || ''}</div> */}
        <Button
          color="inherit"
          className="bg-red-200 text-red-200 font-extrabold"
          // style={{ color: 'red' }}
          type="submit"
          disabled={id ? !isDirty || isSubmitting : isSubmitting || !isValid}
        >
          submit
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;

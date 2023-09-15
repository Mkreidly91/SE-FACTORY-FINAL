import { Button, MenuItem, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  projectFormSchema,
  ProjectFormSchemaType,
} from '../../validation/company.validation';
import { useEffect, useState } from 'react';
import { createProject, editProject } from '../../api/company.api';
import { useNavigate } from 'react-router-dom';
import { filterChangedFormFields } from '../../helpers/helpers';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  HotspotSchemaType,
  hotspotForm,
} from '../../validation/company.validation';
import BasicSelect from '../Common/BasicSelect';

interface IhotspotForm {
  initialValues?: HotspotSchemaType;
  id?: string;
  projectId?: string;
  panoramaId?: string;
  panoramas?: any;
  deleteAction?: () => void;
  setOpen: (arg0: boolean) => void;
}
const HotspotForm = ({ initialValues, id = '', setOpen }: IhotspotForm) => {
  const [preview, setPreview] = useState() as any;

  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues && id) {
      const { link, info } = initialValues;
      reset({ link, info });
    }
  }, [initialValues, id]);

  const onSubmit: SubmitHandler<HotspotSchemaType> = (data) => {
    console.log(data);
    // if (!id) {
    //   const res = await createProject(data);
    //   navigate(`${res._id}`);
    //   return;
    // } else {
    //   const changedFieldValues = filterChangedFormFields(data, dirtyFields);
    //   const res = await editProject(id, changedFieldValues);
    // }

    // fields = { ...fields, ...dirtyFields };
    // reset();
    // setFeatures([]);
    // setPreview();
  };

  const {
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
  } = useForm<HotspotSchemaType>({
    resolver: zodResolver(hotspotForm),
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });
  console.log(isValid);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" gap-4 w-full h-full justify-around  mt-20 bg-transparent text-white"
    >
      <div className="flex flex-col gap-3 w-full justify-center">
        <label className="font-semibold">Link to</label>
        <TextField
          className="max-w-[600px]"
          select
          onFocus={() => clearErrors('link')}
          error={Boolean(errors.link)}
          helperText={errors?.link?.message || ' '}
          {...register('link')}
        >
          <MenuItem value={'None'}>None</MenuItem>
          <MenuItem
            value={
              'https://vizi-bucket.s3.eu-west-1.amazonaws.com/ab16f33c-bb77-444e-ad2d-654dbba58ed9.glb'
            }
          >
            Bedroom
          </MenuItem>
          <MenuItem
            value={
              'https://vizi-bucket.s3.eu-west-1.amazonaws.com/ab16f33c-bb77-444e-ad2d-654dbba58ed9.glb'
            }
          >
            Bathroom
          </MenuItem>
          <MenuItem
            value={
              'https://vizi-bucket.s3.eu-west-1.amazonaws.com/ab16f33c-bb77-444e-ad2d-654dbba58ed9.glb'
            }
          >
            Salon
          </MenuItem>
        </TextField>
      </div>

      <div className="flex flex-col gap-3 w-full justify-center">
        <label className="font-semibold">Text</label>
        <TextField
          className="max-w-[600px]"
          onFocus={() => clearErrors('info')}
          error={Boolean(errors.info)}
          helperText={errors?.info?.message || ' '}
          {...register('info')}
        />
      </div>

      <div className="button-container">
        <Button
          color="inherit"
          className="text-xs font-extrabold"
          type="submit"
          disabled={id ? !isDirty || isSubmitting : isSubmitting || !isValid}
          size="small"
        >
          Add
        </Button>
        <Button
          color="inherit"
          className="bg-red-200 text-red-200 font-extrabold"
          type="submit"
          disabled={id ? !isDirty || isSubmitting : isSubmitting || !isValid}
          size="small"
        >
          Delete
        </Button>
        <Button
          color="inherit"
          className="bg-red-200 text-red-200 font-extrabold"
          onClick={() => {
            setOpen(false);
          }}
          size="small"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default HotspotForm;

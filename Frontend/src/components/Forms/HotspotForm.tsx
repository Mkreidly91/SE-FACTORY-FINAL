import { Button, MenuItem, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { filterChangedFormFields } from '../../helpers/helpers';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  HotspotSchemaType,
  hotspotForm,
} from '../../validation/company.validation';

interface IhotspotForm {
  selectedHotspot?: {
    link?: string | undefined;
    info?: string | undefined;
    id: string;
  };
  projectId?: string;
  panoramaId?: string;
  panoramas?: any;
  deleteAction: () => Promise<void>;
  addAction: (arg0: any) => Promise<void>;
  editAction: (arg0: any) => Promise<void>;
  setOpen: (arg0: boolean) => void;
  isOpen?: boolean;
}
const HotspotForm = ({
  selectedHotspot,
  panoramas,
  setOpen,
  isOpen,
  addAction,
  deleteAction,
  editAction,
}: IhotspotForm) => {
  useEffect(() => {
    if (selectedHotspot) {
      const { link, info } = selectedHotspot;
      reset({ link, info: info || '' });
    }
    if (!isOpen) {
      reset({ info: '', link: '' });
      clearErrors('link');
      clearErrors('info');
    }
  }, [isOpen, selectedHotspot]);

  const onSubmit: SubmitHandler<HotspotSchemaType> = async (data) => {
    if (!selectedHotspot) {
      addAction(data);
      return;
    } else {
      const changedFieldValues = filterChangedFormFields(data, dirtyFields);
      await editAction(changedFieldValues);
      reset({ link: data.link }, { keepValues: true });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting, isValid, dirtyFields, isDirty },
  } = useForm<HotspotSchemaType>({
    resolver: zodResolver(hotspotForm),
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: {
      link: '',
      info: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" gap-4 w-full h-full justify-around  mt-20 bg-transparent"
    >
      <div className="flex flex-col gap-3 w-full justify-center">
        <label className="font-semibold">Link to</label>

        <TextField
          className="max-w-[600px]"
          select
          defaultValue={selectedHotspot?.link || ''}
          onFocus={() => clearErrors('link')}
          error={Boolean(errors.link)}
          helperText={errors?.link?.message || ' '}
          {...register('link')}
          value={getValues('link')}
        >
          <MenuItem value={''}>None</MenuItem>
          {panoramas &&
            panoramas?.map((e: any) => (
              <MenuItem key={e._id} value={e._id}>
                <div>
                  <span>{e.name || ''}</span>
                  <img className="w-[100px] " src={e.url} />
                </div>
              </MenuItem>
            ))}
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

      <div className="button-container flex justify-center">
        <Button
          color="inherit"
          className="text-xs font-extrabold"
          type="submit"
          disabled={
            selectedHotspot
              ? !isDirty || isSubmitting
              : isSubmitting || !isValid
          }
          size="small"
        >
          {selectedHotspot ? 'Edit' : 'Add'}
        </Button>

        {selectedHotspot && (
          <Button
            color="inherit"
            className="bg-red-200 text-red-200 font-extrabold"
            size="small"
            onClick={async () => deleteAction()}
          >
            Delete
          </Button>
        )}

        <Button
          color="inherit"
          className="bg-red-200 text-red-200 font-extrabold"
          onClick={() => {
            setOpen(false);
            reset();
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

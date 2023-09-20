import { Button, Grid, Slider, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProjectSearchFormSchemaType,
  projectSearch,
} from '../../validation/project.validation';
import { useState } from 'react';
import { ApiError } from '../../api/api.helpers';
import ApiErrorHandler from '../Common/ApiError';
import BasicPopover from '../Common/Popover';
import { searchProject } from '../../api/common.api';
import { Search } from '@mui/icons-material';

const ProjectSearchForm = ({ onSuccess }: { onSuccess: Function }) => {
  const [err, setError] = useState<ApiError | null>(null);
  const onSubmit: SubmitHandler<ProjectSearchFormSchemaType> = async (data) => {
    const res = await searchProject(data);
    console.log(data);
    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      onSuccess(res);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProjectSearchFormSchemaType>({
    resolver: zodResolver(projectSearch),
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues: {
      search: '',
      location: '',
      bedrooms: 30,
      bathrooms: 30,
      size: [0, 10000],
      price: [0, 10000000],
    },
  });

  const priceLabel = watch('price')
    .map((sz) => `$${sz}`)
    .join(' - ');
  const sizeLabel = watch('size')
    .map((sz) => `${sz} sqm`)
    .join(' - ');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="project-form-left w-[100%]  flex-col gap-1 items-center ">
        <ApiErrorHandler error={err} />
        {/* Search */}
        <Grid container alignItems={'stretch'} gap={2}>
          <Grid item alignItems="stretch">
            {/* <label className="font-semibold">Search</label> */}
            <TextField
              size="medium"
              className="w-[325px]"
              InputProps={{ startAdornment: <Search /> }}
              placeholder="Search by location, title, description"
              autoFocus
              InputLabelProps={{ className: '' }}
              onFocus={() => clearErrors('search')}
              error={Boolean(errors.search)}
              {...register('search')}
            />
          </Grid>

          {/* Beds and Baths */}
          <Grid item alignItems="stretch" display={'flex'}>
            <TextField
              disabled
              value={`${watch('bedrooms')} Bed - ${watch('bathrooms')} Bath`}
              sx={{ borderColor: '#c4c4c4', color: '#a2a2a2' }}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <BasicPopover>
                    <div className="p-5 w-[300px]">
                      <div className="flex flex-col gap-3 w-full justify-center">
                        <label className="font-semibold">Bedrooms</label>
                        <Controller
                          name="bedrooms"
                          control={control}
                          render={(props) => (
                            <Slider
                              {...props.field}
                              onChange={(_, value) => {
                                props.field.onChange(value);
                              }}
                              valueLabelDisplay="auto"
                              min={1}
                              max={30}
                              step={1}
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-3 w-full justify-center">
                        <label className="font-semibold">Bathrooms</label>
                        <Controller
                          name="bathrooms"
                          control={control}
                          render={(props) => (
                            <Slider
                              {...props.field}
                              onChange={(_, value) => {
                                props.field.onChange(value);
                              }}
                              valueLabelDisplay="auto"
                              min={1}
                              max={30}
                              step={1}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </BasicPopover>
                ),
              }}
            />
          </Grid>

          {/* Size */}
          <Grid item>
            <div className="flex flex-col gap-3 w-full justify-center">
              <TextField
                disabled
                value={sizeLabel}
                className="max-w-[200px]"
                InputLabelProps={{
                  style: { color: '#a2a2a2' },
                }}
                placeholder={watch('size')
                  .map((sz) => `${sz} sqm`)
                  .join(' - ')}
                InputProps={{
                  endAdornment: (
                    <BasicPopover>
                      <div className="flex flex-col gap-3 w-500 justify-center w-[300px] p-5">
                        <label className="font-semibold">Size in m&sup2;</label>
                        <Controller
                          name="size"
                          control={control}
                          render={(props) => (
                            <Slider
                              {...props.field}
                              onChange={(_, value) => {
                                props.field.onChange(value);
                              }}
                              valueLabelDisplay="auto"
                              max={10000}
                              step={10}
                            />
                          )}
                        />
                      </div>
                    </BasicPopover>
                  ),
                }}
              />
            </div>
          </Grid>

          {/* Price */}
          <Grid item>
            <div className="flex flex-col gap-3 w-full justify-center">
              <TextField
                disabled
                className="max-w-[200px]"
                value={priceLabel}
                InputProps={{
                  endAdornment: (
                    <BasicPopover>
                      <div className="flex flex-col gap-3 w-[300px] p-5 justify-center">
                        <label className="font-semibold">Price in $</label>
                        <Controller
                          name="price"
                          control={control}
                          render={(props) => (
                            <Slider
                              {...props.field}
                              onChange={(_, value) => {
                                props.field.onChange(value);
                              }}
                              valueLabelDisplay="auto"
                              max={10000000}
                              step={1000}
                            />
                          )}
                        />
                      </div>
                    </BasicPopover>
                  ),
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            display={'flex'}
            className="button-gradient rounded-md text-white"
          >
            <Button
              sx={{ color: 'white' }}
              variant="outlined"
              type="submit"
              disabled={isSubmitting || !isValid}
              className="text-white"
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* <div className="flex flex-col gap-3 w-full ">
          <label className="font-semibold">Location</label>
          <TextField
            className="max-w-[600px]"
            onFocus={() => clearErrors('location')}
            error={Boolean(errors.location)}
            helperText={errors?.location?.message || ' '}
            {...register('location')}
          />
        </div> */}
      </div>
    </form>
  );
};

export default ProjectSearchForm;

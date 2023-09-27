import {
  Button,
  Divider,
  Grid,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
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

const ProjectSearchForm = ({ onFormSubmit }: { onFormSubmit: Function }) => {
  const onSubmit: SubmitHandler<ProjectSearchFormSchemaType> = async (data) => {
    onFormSubmit(data);
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
    .map((sz) => `$${sz.toLocaleString()}`)
    .join(' - ');
  const sizeLabel = watch('size')
    .map((sz) => `${sz.toLocaleString()} sqm`)
    .join(' - ');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="project-form-left w-[100%]    items-center ">
        {/* Search */}
        <Grid display={'flex'} alignItems={'stretch'} gap={2}>
          <Grid item flexGrow={1} alignItems="stretch">
            {/* <label className="font-semibold">Search</label> */}
            <TextField
              size="medium"
              InputProps={{
                disableUnderline: true,
                startAdornment: <Search />,
              }}
              fullWidth
              placeholder="Search by location, title, description"
              autoFocus
              InputLabelProps={{ className: '' }}
              onFocus={() => clearErrors('search')}
              error={Boolean(errors.search)}
              {...register('search')}
            />
          </Grid>

          <Divider orientation="vertical" flexItem />
          {/* Beds and Baths */}
          <Grid item alignItems="stretch" display={'flex'} className="">
            <TextField
              disabled
              value={`${watch('bedrooms')} Bed - ${watch('bathrooms')} Bath`}
              InputProps={{
                disableUnderline: true,
                style: {
                  width: '200px',
                },
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
                              sx={{
                                '& .MuiSlider-valueLabel': {
                                  scale: 0.1,
                                  backgroundColor: 'transparent',
                                  top: 0,
                                  color: 'black',
                                  fontWeight: 'bold',
                                },
                              }}
                              min={1}
                              max={30}
                              step={1}
                              marks
                              valueLabelDisplay="on"
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-5 w-full justify-center">
                        <label className="font-semibold">Bathrooms</label>
                        <Controller
                          name="bathrooms"
                          control={control}
                          render={(props) => (
                            <Slider
                              valueLabelDisplay="on"
                              sx={{
                                '& .MuiSlider-valueLabel': {
                                  scale: 0.1,
                                  backgroundColor: 'transparent',
                                  top: 0,
                                  color: 'black',
                                  fontWeight: 'bold',
                                },
                              }}
                              marks
                              {...props.field}
                              onChange={(_, value) => {
                                props.field.onChange(value);
                              }}
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
                  disableUnderline: true,
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
                              sx={{
                                '& .MuiSlider-valueLabel': {
                                  scale: 0.1,
                                  backgroundColor: 'transparent',
                                  top: 0,
                                  color: 'black',
                                  fontWeight: 'bold',
                                },
                              }}
                              onChange={(_, value) => {
                                props.field.onChange(value);
                              }}
                              valueLabelDisplay="on"
                              valueLabelFormat={(value) =>
                                value.toLocaleString()
                              }
                              max={5000}
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
                sx={{ outline: '0px solid red !important' }}
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
                              sx={{
                                '& .MuiSlider-valueLabel': {
                                  scale: 0.1,
                                  backgroundColor: 'transparent',
                                  top: 0,
                                  color: 'black',
                                  fontWeight: 'bold',
                                },
                              }}
                              {...props.field}
                              onChange={(_, value) => {
                                props.field.onChange(value);
                              }}
                              valueLabelDisplay="on"
                              valueLabelFormat={(value) =>
                                value.toLocaleString()
                              }
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
            className="rounded-md text-white  button-gradient"
          >
            <Button
              className="text-white button-gradient py-5 "
              sx={{ color: 'white', paddingLeft: '30px', paddingRight: '30px' }}
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default ProjectSearchForm;

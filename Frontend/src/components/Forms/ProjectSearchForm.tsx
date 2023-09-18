import { Button, Slider, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectSearchFormSchemaType,
  projectSearch,
} from "../../validation/project.validation";
import { useState } from "react";
import { ApiError } from "../../api/api.helpers";
import ApiErrorHandler from "../Common/ApiError";
import BasicPopover from "../Common/Popover";
import { searchProject } from "../../api/common.api";

const ProjectSearchForm = ({ onSuccess }: { onSuccess: Function }) => {
  const [err, setError] = useState<ApiError | null>(null);
  const onSubmit: SubmitHandler<ProjectSearchFormSchemaType> = async (data) => {
    const res = await searchProject(data);
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
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProjectSearchFormSchemaType>({
    resolver: zodResolver(projectSearch),
    mode: "onTouched",
    criteriaMode: "firstError",
    defaultValues: {
      search: "",
      location: "",
      bedrooms: 2,
      bathrooms: 3,
      size: [0, 10000],
      price: [0, 10000000],
    },
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 w-full h-full justify-around  mt-20"
    >
      <div className="project-form-left w-[50%] flex flex-col gap-1 items-center ">
        <ApiErrorHandler error={err} />
        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Search</label>
          <TextField
            className="max-w-[600px]"
            autoFocus
            InputLabelProps={{ className: "" }}
            onFocus={() => clearErrors("search")}
            error={Boolean(errors.search)}
            helperText={errors?.search?.message || " "}
            {...register("search")}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold">Location</label>
          <TextField
            className="max-w-[600px]"
            onFocus={() => clearErrors("location")}
            error={Boolean(errors.location)}
            helperText={errors?.location?.message || " "}
            {...register("location")}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Bedrooms</label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: "" }}
            type="number"
            onFocus={() => clearErrors("bedrooms")}
            error={Boolean(errors.bedrooms)}
            helperText={errors?.bedrooms?.message || " "}
            {...register("bathrooms")}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Bathrooms</label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: "" }}
            type="number"
            onFocus={() => clearErrors("bathrooms")}
            error={Boolean(errors.bathrooms)}
            helperText={errors?.bathrooms?.message || " "}
            {...register("bathrooms")}
          />
        </div>
        <div className="flex flex-col gap-3 w-full justify-center">
          <TextField
            className="max-w-[200px]"
            placeholder={watch("size")
              .map((sz) => `${sz} sqm`)
              .join(" - ")}
            InputProps={{
              endAdornment: (
                <BasicPopover>
                  <div
                    className="flex flex-col gap-3 w-500 justify-center"
                    style={{ width: "400px", height: "100px", padding: "20px" }}
                  >
                    <label className="font-semibold">
                      Size in meter square
                    </label>
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
        <div className="flex flex-col gap-3 w-full justify-center">
          <TextField
            className="max-w-[200px]"
            placeholder={watch("price")
              .map((sz) => `${sz}$`)
              .join(" - ")}
            InputProps={{
              endAdornment: (
                <BasicPopover>
                  <div
                    className="flex flex-col gap-3 w-500 justify-center"
                    style={{ width: "400px", height: "100px", padding: "20px" }}
                  >
                    <label className="font-semibold">
                      Size in meter square
                    </label>
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
      </div>
      <div className="project-form-buttons flex justify-center gap-3s">
        <Button
          color="inherit"
          className="bg-red-200 text-red-200 font-extrabold"
          type="submit"
            disabled={isSubmitting || !isValid}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default ProjectSearchForm;

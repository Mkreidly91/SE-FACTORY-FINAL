import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth.api";
import {
  SignupFormSchemaType,
  signupFormSchema,
} from "../../validation/user.validation";
import { useState } from "react";
import { ApiError } from "../../api/api.helpers";
import ApiErrorHandler from "../Common/ApiError";

const SignupForm = () => {
  const navigate = useNavigate();
  const [err, setError] = useState<ApiError | null>(null);
  const onSubmit: SubmitHandler<SignupFormSchemaType> = async (data) => {
    const res = await signup(data);
    if (res.error) {
      setError(res.error);
    } else {
      navigate("/login");
    }
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    mode: "onTouched",
    criteriaMode: "firstError",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 w-full h-full justify-around  mt-20"
    >
      <div className="project-form-left w-[50%] flex flex-col gap-1 items-center ">
      <ApiErrorHandler error={err}/>
        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Full Name</label>
          <TextField
            className="max-w-[600px]"
            autoFocus
            required
            InputLabelProps={{ className: "" }}
            onFocus={() => clearErrors("name")}
            error={Boolean(errors.name)}
            helperText={errors?.name?.message || " "}
            {...register("name")}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold">Email</label>
          <TextField
            className="max-w-[600px]"
            required
            onFocus={() => clearErrors("email")}
            error={Boolean(errors.email)}
            helperText={errors?.email?.message || " "}
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Password</label>
          <TextField
            className="max-w-[600px]"
            InputLabelProps={{ className: "" }}
            required
            type="password"
            onFocus={() => clearErrors("password")}
            error={Boolean(errors.password)}
            helperText={errors?.password?.message || " "}
            {...register("password")}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">Confirm Password</label>
          <TextField
            className="max-w-[600px]"
            required
            type="password"
            InputLabelProps={{ className: "" }}
            onFocus={() => clearErrors("confirmPassword")}
            error={Boolean(errors.confirmPassword)}
            helperText={errors?.confirmPassword?.message || " "}
            {...register("confirmPassword")}
          />
        </div>

        <div className="flex flex-col gap-3 w-full justify-center">
          <label className="font-semibold">User Type</label>
          <TextField
            className="max-w-[600px]"
            type="number"
            InputLabelProps={{ className: "" }}
            onFocus={() => clearErrors("userType")}
            error={Boolean(errors.userType)}
            helperText={errors?.userType?.message || " "}
            {...register("userType", { valueAsNumber: true })}
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
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;

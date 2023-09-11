import { Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectFormSchema } from '../validation/company.validation';
import { z } from 'zod';
type FormSchemaType = z.infer<typeof projectFormSchema>;
const TestRHF = () => {
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, touchedFields, isValid },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    mode: 'onTouched',
    criteriaMode: 'firstError',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full h-full justify-center items-center"
    >
      <TextField
        className="w-[300px]"
        label="Name"
        InputLabelProps={{ className: '' }}
        onFocus={() => clearErrors('name')}
        error={Boolean(errors.name)}
        helperText={errors?.name?.message}
        size="small"
        {...register('name')}
      />
      <TextField
        className="w-[300px]"
        label="Description"
        onFocus={() => clearErrors('description')}
        error={Boolean(errors.description)}
        helperText={errors?.description?.message}
        {...register('description')}
      />
      <div className="error"> {Object.values(errors)[0]?.message || ''}</div>
      <Button
        color="inherit"
        className="bg-red-200 text-red-200 font-extrabold"
        style={{ color: 'red' }}
        type="submit"
        disabled={
          isSubmitting || !isValid || Object.keys(touchedFields).length !== 2
        }
      >
        submit
      </Button>
    </form>
  );
};

export default TestRHF;

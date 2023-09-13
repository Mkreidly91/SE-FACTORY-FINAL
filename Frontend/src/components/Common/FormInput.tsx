import { TextField } from '@mui/material';

interface FormInputProps {
  className?: string;
  name?: string;
  label?: string;
  labelStyles?: string;
  error?: boolean;
  helperText?: string;
  onFocus?: () => void;
  onChange?: () => void;
  register?: any;
}
const FormInput = ({
  className,
  name,
  label,
  labelStyles,
  onFocus,
  onChange,
  error,
  helperText,
  register,
}: FormInputProps) => {
  return (
    <div className={`flex flex-col gap-3 w-full justify-center ${className}`}>
      <label className={`font-semibold ${labelStyles}`}>{label}</label>
      <TextField
        className="max-w-[600px]"
        onFocus={onFocus}
        onChange={onChange}
        error={error}
        helperText={helperText}
        {...register('name')}
      />
    </div>
  );
};

import React from 'react';
import { Button, Spinner, ButtonProps } from '@material-tailwind/react';
import { CircularProgress } from '@mui/material';

// import { SubmitHandler, UseFormMethods } from 'react-hook-form';

interface SubmitButtonProps {
  conditions: {
    isSubmitting: boolean;
    isValid: boolean;
  };

  spinnerStyles?: string;
  buttonText: string;
  size?: string;
  //   ButtonProps: ButtonProps;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  conditions,
  spinnerStyles,
  buttonText,
  //   buttonProps,
  size = 'md',
}) => {
  const { isSubmitting, isValid } = conditions;

  return (
    <Button
      ripple
      type="submit"
      disabled={!isValid}
      variant={`gradient`}
      className="light-gradient p-4 font-sora font-normal uppercase tracking-wider px-10 cursor-pointer disabled"
      size={size as ButtonProps['size']}
    >
      {isSubmitting ? (
        <div className="flex items-center ">
          <Spinner className={`${spinnerStyles}`} />
        </div>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default SubmitButton;

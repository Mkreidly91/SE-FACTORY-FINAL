const UploadButton = ({
  onChange,
  accept,
  text,
  className,
}: {
  accept: string;
  onChange: (e: any) => void;
  text: string;
  className?: string;
}) => {
  return (
    <label
      className={` bg-white px-2 py-3 rounded-md button-gradient text-white text-sm ${className}`}
    >
      <span className="text-center">{text}</span>
      <input
        className=""
        accept={accept}
        hidden
        type="file"
        onChange={onChange}
        onClick={(e) => ((e.target as HTMLInputElement).value = '')}
      />
    </label>
  );
};

export default UploadButton;

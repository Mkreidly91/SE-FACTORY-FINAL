const UploadButton = ({
  onChange,
  accept,
  text,
}: {
  accept: string;
  onChange: (e: any) => void;
  text: string;
}) => {
  return (
    <label className=" bg-white px-2 py-3 rounded-md button-gradient text-white text-sm">
      <span> {text}</span>
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

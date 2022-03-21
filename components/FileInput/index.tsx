import { useEffect, useState } from "react";

interface FileInputProps {
  label: string;
  register: any;
  required?: boolean;
  id?: string;
  value?: FileList;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  register,
  id,
  required,
  value,
}) => {
  const [image, setImage] = useState<null | string>(null);

  useEffect(() => {
    if (!value) {
      return;
    }

    const file = value[0];

    if (!file) {
      return;
    }

    setImage(URL.createObjectURL(file));
  }, [value]);

  return (
    <>
      <label
        className="mb-1 block text-sm uppercase text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={` relative flex h-full items-center justify-center rounded-lg border-2 border-dotted border-slate-100 bg-gray-100 py-24 transition-opacity ${
          image ? `hover:opacity-50` : ``
        }`}
      >
        <div className="absolute">
          {!image ? (
            <div className="flex flex-col items-center">
              <img src="/upload.svg" className="mb-4 h-12 w-12"></img>
              <h1 className="text-lg font-bold">
                Click to upload or Drag and Drop
              </h1>
              <span className="block px-8 text-center font-normal text-gray-400">
                You can drag and drop your file here. .png, .jpg, and .gif are
                supported
              </span>
            </div>
          ) : (
            <img
              className="h-full w-full object-cover"
              src={image}
              alt="preview image"
            />
          )}
        </div>
        <input
          id={id}
          type="file"
          className="h-full w-full opacity-0"
          {...register(id, { required })}
        />
      </div>
    </>
  );
};

export default FileInput;

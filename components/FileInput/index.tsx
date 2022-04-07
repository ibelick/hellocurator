import { useEffect, useState } from "react";
import { compress } from "utils/image";

interface FileInputProps {
  label?: string;
  register: any;
  required?: boolean;
  id?: string;
  value?: FileList;
  accept?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  register,
  id,
  required,
  value,
  accept,
}) => {
  const [image, setImage] = useState<null | string>(null);

  useEffect(() => {
    const processImage = async () => {
      if (!Boolean(value?.length)) {
        setImage(null);
        return;
      }

      const file = value?.[0];

      if (!file) {
        return;
      }

      const compressedFile = await compress(file, 0.6, 2000, 2000, 1000);
      setImage(URL.createObjectURL(compressedFile));
    };

    processImage();
  }, [value]);

  return (
    <>
      {label ? (
        <label
          className="mb-1 block text-sm uppercase text-gray-500"
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}
      <div
        className={`relative flex h-full max-h-96 items-center justify-center overflow-hidden rounded-lg border-2 border-dotted border-slate-100 bg-gray-100 py-24 transition-opacity ${
          image ? `hover:opacity-50` : ``
        }`}
      >
        <div className="absolute flex h-full items-center">
          {!image ? (
            <div className="flex flex-col items-center">
              <img src="/upload.svg" className="mb-4 h-12 w-12" />
              <h1 className="text-lg font-bold">
                Click to upload or Drag and Drop
              </h1>
              <span className="block px-8 text-center font-normal text-gray-400">
                You can drag and drop your file here. .png, .jpg, and .gif are
                supported
              </span>
            </div>
          ) : (
            <img className="max-h-72" src={image} alt="preview image" />
          )}
        </div>
        <input
          id={id}
          type="file"
          className="h-full w-full opacity-0"
          accept={accept}
          {...register(id, { required })}
        />
      </div>
    </>
  );
};

export default FileInput;

interface TextareaProps {
  label: string;
  register: any;
  required?: boolean;
  placeholder?: string;
  id?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  register,
  required,
  placeholder,
  id,
  rows,
}) => {
  return (
    <>
      <label
        className="mb-1 block text-sm uppercase text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className="focus:shadow-outline w-full appearance-none rounded bg-gray-100 py-4 px-4 leading-tight text-gray-700 placeholder:text-gray-400 focus:outline-none"
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register(id, { required })}
      />
    </>
  );
};

export default Textarea;

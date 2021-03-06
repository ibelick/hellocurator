interface TextInputProps {
  label: string;
  register: any;
  required?: boolean;
  placeholder?: string;
  id?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  register,
  required,
  placeholder,
  id,
}) => {
  return (
    <>
      <label
        className="mb-1 block text-sm uppercase text-gray-500"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className="focus:shadow-outline w-full appearance-none rounded bg-gray-100 py-4 px-4 leading-tight text-gray-700 placeholder:text-gray-400 focus:outline-none"
        type="text"
        placeholder={placeholder}
        {...register(id, { required })}
      />
    </>
  );
};

export default TextInput;

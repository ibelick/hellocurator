interface TextInput {
  label: string;
  register: any;
  required: boolean;
  id?: string;
}

const TextInput: React.FC<TextInput> = ({ label, register, required, id }) => {
  return (
    <>
      <label className="mb-1 block text-sm text-gray-500" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        type="text"
        {...register(id, { required })}
      />
    </>
  );
};

export default TextInput;

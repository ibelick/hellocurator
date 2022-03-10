import Spinner from "../Spinner";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: string;
  size?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isBlock?: boolean;
}

const VARIANT_ENUM: { [key: string]: string } = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-primary-800 hover:bg-primary-900 text-white",
  tertiary: "bg-white border border-gray-200 hover:bg-gray-50",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading,
  type,
  isBlock,
  ...props
}) => {
  return (
    <button
      type={type ? type : "submit"}
      className={`inline-flex appearance-none items-center rounded-full px-6 py-3 text-sm font-medium drop-shadow-sm transition focus:ring-4 focus:ring-gray-300 ${
        isBlock ? `w-full justify-center` : null
      } ${VARIANT_ENUM[variant]} ${
        props.disabled
          ? `cursor-not-allowed bg-gray-400 text-gray-100 hover:bg-gray-400`
          : null
      }`}
      {...props}
    >
      <>
        {children}{" "}
        {isLoading ? (
          <span className="ml-4">
            <Spinner variant={variant} />{" "}
          </span>
        ) : null}
      </>
    </button>
  );
};

export default Button;

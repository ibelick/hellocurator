interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: string;
  size?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, type, ...props }) => {
  return (
    <button
      type={type ? type : "submit"}
      className="flex h-12 items-center rounded bg-slate-100 px-4"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <button
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-200"
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;

interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <button
      className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-200"
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;

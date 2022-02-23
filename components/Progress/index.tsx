interface ProgressProps {
  label?: string;
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ label, value }) => {
  return (
    <>
      {label ? (
        <div className="mb-1 flex items-center justify-between">
          <span className="text-base font-medium">{label}</span>
          <span className="text-sm font-medium">{value}%</span>
        </div>
      ) : null}
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-blue-600"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </>
  );
};

export default Progress;

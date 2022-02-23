interface ProgressProps {
  label?: string;
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ label, value }) => {
  return (
    <>
      {label ? (
        <div className="mb-1 flex items-center justify-between">
          <span className="text-base font-medium text-blue-700">{label}</span>
          <span className="text-sm font-medium text-blue-700">{value}%</span>
        </div>
      ) : null}
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full bg-blue-600"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </>
  );
};

export default Progress;

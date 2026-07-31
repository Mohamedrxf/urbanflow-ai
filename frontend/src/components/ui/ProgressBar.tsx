interface ProgressBarProps {
  percent: number;
  className?: string;
}

export default function ProgressBar({ percent, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full ${className}`.trim()}>
      <div
        className="h-2 rounded-full bg-blue-500"
        style={{ width: `${Math.max(0, Math.min(percent, 100))}%` }}
      ></div>
    </div>
  );
}

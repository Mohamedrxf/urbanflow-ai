interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-xl shadow-sm bg-white p-6 text-center">
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

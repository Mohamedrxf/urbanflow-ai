interface MapPlaceholderProps {
  title: string;
}

export default function MapPlaceholder({ title }: MapPlaceholderProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600 mb-3">{title}</h3>
      <div className="flex items-center justify-center min-h-[320px] text-sm text-gray-500">
        Interactive Map will be integrated here
      </div>
    </div>
  );
}
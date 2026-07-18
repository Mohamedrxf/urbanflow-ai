interface PredictionWidgetProps {
  accuracy: string;
  predictedDelay: string;
  optimizedRoutes: number;
}

export default function PredictionWidget({
  accuracy,
  predictedDelay,
  optimizedRoutes,
}: PredictionWidgetProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-600 mb-3">AI Predictions</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-900">
        <div className="flex justify-between">
          <span>Prediction Accuracy</span>
          <span>{accuracy}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Delay</span>
          <span>{predictedDelay}</span>
        </div>
        <div className="flex justify-between">
          <span>Optimized Routes</span>
          <span>{optimizedRoutes}</span>
        </div>
      </div>
    </div>
  );
}
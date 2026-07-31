import StatListCard from "./StatListCard";

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
    <StatListCard
      title="AI Predictions"
      rows={[
        { label: "Prediction Accuracy", value: accuracy },
        { label: "Estimated Delay", value: predictedDelay },
        { label: "Optimized Routes", value: optimizedRoutes },
      ]}
    />
  );
}

"""Traffic prediction module."""

from backend.ai.levels import level_value

_MAX_SCORE = 0.4 * 3 + 0.3 * 3 + 0.2 * 3 + 0.1 * 1


def predict_traffic(features):
    """Predict traffic conditions based on extracted features.

    Args:
        features: Processed features from the feature builder.

    Returns:
        Prediction results including congestion levels and confidence scores.
    """
    predictions = []

    for idx, feature in enumerate(features):
        congestion_level = (feature.get("congestion_level") or "").lower()
        traffic_density = feature.get("traffic_density")
        highest_severity = (feature.get("highest_severity") or "").lower()
        current_hour = feature.get("current_hour", 0)
        weekend_flag = feature.get("weekend_flag", 0)

        congestion_value = level_value(congestion_level)
        density_value = traffic_density if isinstance(traffic_density, (int, float)) else 0
        severity_value = level_value(highest_severity)

        is_peak_hour = 1 if (7 <= current_hour <= 10 or 17 <= current_hour <= 20) else 0

        score = (
            0.4 * congestion_value
            + 0.3 * density_value
            + 0.2 * severity_value
            + 0.1 * is_peak_hour
        )

        if score < 1.0:
            predicted_congestion = "LOW"
        elif score < 2.0:
            predicted_congestion = "MEDIUM"
        else:
            predicted_congestion = "HIGH"

        confidence = 0.70 + (score / _MAX_SCORE) * 0.29
        confidence = min(confidence, 0.99)

        current_congestion = congestion_level.upper() if congestion_level else "UNKNOWN"

        predictions.append(
            {
                "road_id": f"road_{idx}",
                "current_congestion": current_congestion,
                "predicted_congestion": predicted_congestion,
                "confidence": round(confidence, 2),
                "prediction_minutes": 15,
            }
        )

    return predictions

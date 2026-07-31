"""Builders for the WebSocket payloads shared by API routes and services."""

from datetime import datetime


def vehicle_event_payload(action: str, vehicle_id: str) -> dict:
    return {
        "event": "vehicle_updated",
        "action": action,
        "vehicle_id": vehicle_id,
        "timestamp": datetime.utcnow().isoformat(),
    }


def prediction_payload(prediction: dict) -> dict:
    return {
        "event": "prediction_updated",
        "road_id": prediction.get("road_id"),
        "current_congestion": prediction.get("current_congestion"),
        "predicted_congestion": prediction.get("predicted_congestion"),
        "confidence": prediction.get("confidence"),
        "prediction_minutes": prediction.get("prediction_minutes"),
    }

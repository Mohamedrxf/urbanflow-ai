from fastapi import APIRouter, Depends

from backend.ai.prediction_service import get_predictions
from backend.config.database import get_db
from backend.websocket.broadcast import broadcast_event
from sqlalchemy.orm import Session

router = APIRouter(prefix="/predictions", tags=["Predictions"])


@router.post("/")
async def create_prediction(db: Session = Depends(get_db)):
    predictions = get_predictions(db=db, input_data={})
    for prediction in predictions:
        payload = {
            "event": "prediction_updated",
            "road_id": prediction.get("road_id"),
            "current_congestion": prediction.get("current_congestion"),
            "predicted_congestion": prediction.get("predicted_congestion"),
            "confidence": prediction.get("confidence"),
            "prediction_minutes": prediction.get("prediction_minutes"),
        }
        await broadcast_event("prediction_updated", payload)
    return predictions


@router.put("/{road_id}")
async def update_prediction(road_id: str, db: Session = Depends(get_db)):
    predictions = get_predictions(db=db, input_data={})
    prediction = next((p for p in predictions if p.get("road_id") == road_id), None)
    if prediction is None:
        return {"detail": "Prediction not found"}
    payload = {
        "event": "prediction_updated",
        "road_id": prediction.get("road_id"),
        "current_congestion": prediction.get("current_congestion"),
        "predicted_congestion": prediction.get("predicted_congestion"),
        "confidence": prediction.get("confidence"),
        "prediction_minutes": prediction.get("prediction_minutes"),
    }
    await broadcast_event("prediction_updated", payload)
    return prediction


@router.get("/")
def get_predictions_endpoint(db: Session = Depends(get_db)):
    return get_predictions(db=db, input_data={})

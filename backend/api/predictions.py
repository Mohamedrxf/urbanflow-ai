from fastapi import APIRouter, Depends

from backend.ai.prediction_service import get_predictions
from backend.config.database import get_db
from backend.websocket.broadcast import broadcast_event
from backend.websocket.payloads import prediction_payload
from sqlalchemy.orm import Session

router = APIRouter(prefix="/predictions", tags=["Predictions"])


@router.post("/")
async def create_prediction(db: Session = Depends(get_db)):
    predictions = get_predictions(db=db, input_data={})
    for prediction in predictions:
        await broadcast_event("prediction_updated", prediction_payload(prediction))
    return predictions


@router.put("/{road_id}")
async def update_prediction(road_id: str, db: Session = Depends(get_db)):
    predictions = get_predictions(db=db, input_data={})
    prediction = next((p for p in predictions if p.get("road_id") == road_id), None)
    if prediction is None:
        return {"detail": "Prediction not found"}
    await broadcast_event("prediction_updated", prediction_payload(prediction))
    return prediction


@router.get("/")
def get_predictions_endpoint(db: Session = Depends(get_db)):
    return get_predictions(db=db, input_data={})

from fastapi import APIRouter, Depends

from backend.ai.prediction_service import get_predictions
from backend.config.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/predictions", tags=["Predictions"])


@router.get("/")
def get_predictions_endpoint(db: Session = Depends(get_db)):
    return get_predictions(db=db, input_data={})

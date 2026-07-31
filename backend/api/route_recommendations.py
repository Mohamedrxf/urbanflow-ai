from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.ai.route_service import get_route_recommendations
from backend.config.database import get_db
from backend.services.dashboard_context import load_dashboard_context

router = APIRouter(prefix="/route-recommendations", tags=["Route Recommendations"])


@router.get("/")
def get_route_recommendations_endpoint(db: Session = Depends(get_db)):
    context = load_dashboard_context(db)

    result, _ = get_route_recommendations(
        vehicles=context.vehicles,
        routes=[],
        traffic=context.traffic,
        predictions=context.predictions,
        incidents=context.incidents,
    )
    return result

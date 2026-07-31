from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.ai.route_service import get_fleet_optimization as build_fleet_optimization
from backend.services.dashboard_context import load_dashboard_context

router = APIRouter(prefix="/fleet-optimization", tags=["Fleet Optimization"])


@router.get("/")
def get_fleet_optimization(db: Session = Depends(get_db)):
    context = load_dashboard_context(db)
    fleet_results, fleet_score, _ = build_fleet_optimization(
        context.vehicles, context.routes, context.traffic, context.predictions
    )
    return {**fleet_score, "vehicles": fleet_results}

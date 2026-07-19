from fastapi import APIRouter

from backend.config.settings import settings

router = APIRouter()


@router.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "UrbanFlow AI Backend",
        "version": settings.APP_VERSION,
    }

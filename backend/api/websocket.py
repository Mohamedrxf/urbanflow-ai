import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from backend.websocket.connection_manager import ConnectionManager

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ws", tags=["WebSocket"])

manager = ConnectionManager()


@router.websocket("/dashboard")
async def websocket_dashboard(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
    except Exception:
        logger.exception("Unexpected error on dashboard WebSocket connection")
    finally:
        manager.disconnect(websocket)

from fastapi import APIRouter, WebSocket

from backend.websocket.connection_manager import ConnectionManager

router = APIRouter(prefix="/ws", tags=["WebSocket"])

manager = ConnectionManager()


@router.websocket("/dashboard")
async def websocket_dashboard(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        pass
    finally:
        manager.disconnect(websocket)

from fastapi import APIRouter, Depends, Query, WebSocket, status
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.core.deps import authenticate_websocket_token
from backend.websocket.connection_manager import ConnectionManager

router = APIRouter(prefix="/ws", tags=["WebSocket"])

manager = ConnectionManager()


@router.websocket("/dashboard")
async def websocket_dashboard(
    websocket: WebSocket,
    token: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    user = authenticate_websocket_token(token, db)
    if user is None:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        pass
    finally:
        manager.disconnect(websocket)

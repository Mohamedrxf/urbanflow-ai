import json
import logging

from fastapi import WebSocket

logger = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        stale_connections = []
        for connection in self.active_connections[:]:
            try:
                await connection.send_text(message)
            except Exception:
                logger.warning(
                    "Failed to send message to a WebSocket connection; dropping it",
                    exc_info=True,
                )
                stale_connections.append(connection)
        for connection in stale_connections:
            self.disconnect(connection)

    async def broadcast_route_recommendation(self, payload: dict):
        await self.broadcast(json.dumps(payload))

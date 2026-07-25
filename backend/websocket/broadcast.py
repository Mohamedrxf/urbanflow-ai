import json

from backend.websocket.connection_manager import manager


async def broadcast_event(event_name: str, payload: dict):
    await manager.broadcast(json.dumps({**payload, "event": event_name}))
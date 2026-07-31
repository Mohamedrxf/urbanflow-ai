import json

import pytest

from backend.websocket.connection_manager import ConnectionManager


class FakeWebSocket:
    def __init__(self, fail=False):
        self.fail = fail
        self.accepted = False
        self.messages = []

    async def accept(self):
        self.accepted = True

    async def send_text(self, message):
        if self.fail:
            raise RuntimeError("connection closed")
        self.messages.append(message)


@pytest.mark.asyncio
async def test_connect_accepts_and_tracks_connection():
    manager = ConnectionManager()
    websocket = FakeWebSocket()

    await manager.connect(websocket)

    assert websocket.accepted
    assert manager.active_connections == [websocket]


@pytest.mark.asyncio
async def test_disconnect_is_idempotent():
    manager = ConnectionManager()
    websocket = FakeWebSocket()
    await manager.connect(websocket)

    manager.disconnect(websocket)
    manager.disconnect(websocket)

    assert manager.active_connections == []


@pytest.mark.asyncio
async def test_send_personal_message():
    manager = ConnectionManager()
    websocket = FakeWebSocket()

    await manager.send_personal_message("hi", websocket)

    assert websocket.messages == ["hi"]


@pytest.mark.asyncio
async def test_broadcast_reaches_all_connections():
    manager = ConnectionManager()
    first, second = FakeWebSocket(), FakeWebSocket()
    await manager.connect(first)
    await manager.connect(second)

    await manager.broadcast("update")

    assert first.messages == second.messages == ["update"]


@pytest.mark.asyncio
async def test_broadcast_drops_failing_connections():
    manager = ConnectionManager()
    healthy, broken = FakeWebSocket(), FakeWebSocket(fail=True)
    await manager.connect(healthy)
    await manager.connect(broken)

    await manager.broadcast("update")

    assert manager.active_connections == [healthy]
    assert healthy.messages == ["update"]


@pytest.mark.asyncio
async def test_broadcast_route_recommendation_serialises_payload():
    manager = ConnectionManager()
    websocket = FakeWebSocket()
    await manager.connect(websocket)

    await manager.broadcast_route_recommendation({"event": "x", "route_score": 1})

    assert json.loads(websocket.messages[0]) == {"event": "x", "route_score": 1}

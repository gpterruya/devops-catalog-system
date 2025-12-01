import asyncio
from unittest.mock import AsyncMock, patch

from app.queue import enqueue_order


class DummyOrder:
    def __init__(self, data: dict):
        self._data = data

    def model_dump(self) -> dict:
        return self._data


def test_enqueue_order():
    mock_conn = AsyncMock()

    with patch("app.queue.redis.from_url", return_value=mock_conn):
        order = DummyOrder({"id": "abc123", "items": []})
        asyncio.run(enqueue_order(order))

    mock_conn.lpush.assert_called_once()
    assert mock_conn.lpush.call_args[0][0] == "orders_queue"

    mock_conn.aclose.assert_awaited_once()

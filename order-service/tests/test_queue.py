import json
from unittest.mock import AsyncMock, patch

from app.queue import enqueue_order

@patch("app.queue.redis.from_url")
async def test_enqueue_order(mock_redis):
    mock_conn = AsyncMock()
    mock_redis.return_value = mock_conn

    order = {"id": "abc123", "items": []}
    await enqueue_order(order)

    mock_conn.lpush.assert_called_once()
    mock_conn.aclose.assert_awaited()

import json
import redis.asyncio as redis
from app.schemas import Order

REDIS_URL = "redis://localhost:6379"
QUEUE_NAME = "orders_queue"


async def get_redis():
    return redis.from_url(REDIS_URL, decode_responses=True)


async def enqueue_order(order: Order):
    r = await get_redis()
    await r.lpush(QUEUE_NAME, json.dumps(order.model_dump()))
    await r.aclose()

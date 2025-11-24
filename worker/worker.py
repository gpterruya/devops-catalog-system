import json
import redis.asyncio as redis
import asyncio

REDIS_URL = "redis://redis:6379"
QUEUE_NAME = "orders_queue"

async def get_redis():
    return redis.from_url(REDIS_URL, decode_responses=True)

async def dequeue_order():
    r = await get_redis()
    _, data = await r.brpop(QUEUE_NAME)
    await r.aclose()
    return json.loads(data)

async def process_orders():
    print("Worker iniciado. Aguardando pedidos...")
    while True:
        order = await dequeue_order()
        print(f"🛒 Processando pedido: {order}")
        await asyncio.sleep(2)  # simula tempo de processamento

if __name__ == "__main__":
    asyncio.run(process_orders())

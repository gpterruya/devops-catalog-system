from fastapi import FastAPI
from app.schemas import Order
from app.queue import enqueue_order

app = FastAPI(title="Order Service")


@app.post("/orders")
async def create_order(order: Order):
    await enqueue_order(order)
    return {"status": "queued", "order_id": order.id, "order_total": order.total}

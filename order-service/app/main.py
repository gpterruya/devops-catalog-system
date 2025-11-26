from fastapi import FastAPI
from app.schemas import OrderCreate
from app.queue import enqueue_order
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Order Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # libera frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/orders")
async def create_order(order: OrderCreate):
    await enqueue_order(order)
    return {"message": "Order received"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "catalog-service"}

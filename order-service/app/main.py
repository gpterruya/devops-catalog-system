from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

import structlog
import uuid
import time

from app.schemas import OrderCreate
from app.queue import enqueue_order

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.EventRenamer("message"),
        structlog.processors.JSONRenderer(),
    ]
)

app = FastAPI(title="Order Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = request.headers.get("x-request-id", str(uuid.uuid4()))
    request.state.request_id = request_id
    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time
    logger = structlog.get_logger()
    logger.info(
        "incoming_request",
        path=request.url.path,
        method=request.method,
        status_code=response.status_code,
        request_id=request_id,
        process_time_ms=int(process_time * 1000),
    )

    response.headers["x-request-id"] = request_id
    return response


Instrumentator().instrument(app).expose(app, endpoint="/metrics")


@app.post("/orders")
async def create_order(order: OrderCreate, request: Request):
    log = structlog.get_logger()
    log.info("order_received", order_id=str(uuid.uuid4()), request_id=request.state.request_id)

    await enqueue_order(order)
    return {"message": "Order received", "request_id": request.state.request_id}


@app.get("/")
def root():
    log = structlog.get_logger()
    log.info("service_status", message="Order Service accessed", request_id="startup")
    return {"message": "Order Service is running 🚀"}


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "order-service"}

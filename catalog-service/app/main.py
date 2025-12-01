from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import products
from prometheus_fastapi_instrumentator import Instrumentator

import structlog
import uuid
import time

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.EventRenamer("message"),
        structlog.processors.JSONRenderer(),
    ]
)

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Catalog Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)


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


@app.get("/")
def root():
    log = structlog.get_logger()
    log.info("service_status", message="Catalog Service accessed", request_id="startup")
    return {"message": "Catalog Service is running 🚀"}


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "catalog-service"}

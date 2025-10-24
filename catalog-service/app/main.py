from fastapi import FastAPI
from .routers import products
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Catalog Service")

app.include_router(products.router)

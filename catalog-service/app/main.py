from fastapi import FastAPI
from app.database import Base, engine
from app.routers import products

# Cria as tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Catalog Service")

# Inclui as rotas
app.include_router(products.router)


@app.get("/")
def root():
    return {"message": "Catalog Service is running 🚀"}

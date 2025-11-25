from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import products

# Cria as tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Catalog Service")

# HABILITA CORS AQUI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # libera frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui as rotas
app.include_router(products.router)

@app.get("/")
def root():
    return {"message": "Catalog Service is running 🚀"}

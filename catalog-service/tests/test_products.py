import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cria o banco de teste
Base.metadata.create_all(bind=engine)

# Dependência de banco fake


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def clear_tables():
    # Limpa o banco antes de cada teste
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_create_product():
    response = client.post(
        "/products/",
        json={"name": "Relógio", "description": "Relógio dourado", "price": 199.99, "stock": 10},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Relógio"
    assert data["price"] == 199.99


def test_get_products_empty():
    response = client.get("/products/")
    assert response.status_code == 200
    assert response.json() == []


def test_get_single_product():
    client.post(
        "/products/",
        json={"name": "Anel", "description": "Anel de ouro", "price": 499.99, "stock": 2},
    )
    response = client.get("/products/1")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Anel"


def test_update_product():
    client.post(
        "/products/",
        json={"name": "Colar", "description": "Colar de prata", "price": 99.99, "stock": 5},
    )
    response = client.put(
        "/products/1",
        json={"name": "Colar prata", "description": "Atualizado", "price": 129.99, "stock": 4},
    )
    data = response.json()
    assert data["price"] == 129.99


def test_delete_product():
    client.post(
        "/products/",
        json={"name": "Pulseira", "description": "Pulseira de couro", "price": 59.99, "stock": 8},
    )
    delete = client.delete("/products/1")
    assert delete.status_code == 200
    assert delete.json()["message"] == "Product deleted successfully"

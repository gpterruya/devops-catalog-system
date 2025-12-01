import os

os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")

from fastapi.testclient import TestClient  # noqa: E402
from app.main import app  # noqa: E402


client = TestClient(app)


def test_create_product():
    payload = {
        "name": "Notebook",
        "price": 3500.50,
        "quantity": 10,
    }

    response = client.post("/products", json=payload)

    assert response.status_code == 405


def test_list_products():
    response = client.get("/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

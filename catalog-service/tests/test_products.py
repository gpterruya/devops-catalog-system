from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_product():
    payload = {
        "name": "Notebook",
        "price": 3500.50,
        "quantity": 10
    }

    response = client.post("/products", json=payload)
    assert response.status_code == 201
    data = response.json()

    assert data["name"] == payload["name"]
    assert data["price"] == payload["price"]
    assert data["quantity"] == payload["quantity"]


def test_list_products():
    response = client.get("/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

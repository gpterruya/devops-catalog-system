from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_order():
    payload = {
        "items": [{"id": 1, "name": "TV", "price": 1999.99, "quantity": 1}]
    }
    r = client.post("/order", json=payload)
    assert r.status_code == 201

    data = r.json()
    assert "id" in data
    assert data["status"] == "pending"

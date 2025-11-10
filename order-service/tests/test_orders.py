from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_order():
    response = client.post("/orders", json={
        "items": [
            {"id": 1, "name": "Anel de prata", "price": 120.0, "quantity": 1},
            {"id": 2, "name": "Pulseira dourada", "price": 150.0, "quantity": 1}
        ],
        "total": 270.0,
        "status": "pending"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "queued"
    assert "order_id" in data
    assert data["order_total"] == 270.0

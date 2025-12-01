from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_create_order_validation():
    payload = {
        "items": [
            {"id": 1, "name": "TV", "price": 1999.99, "quantity": 1}
        ]
    }

    r = client.post("/orders", json=payload)

    assert r.status_code == 422
    data = r.json()
    assert "detail" in data

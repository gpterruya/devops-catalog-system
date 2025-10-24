from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[dict])
def list_products():
    return [{"id": 1, "name": "Notebook", "price": 3500.0}]

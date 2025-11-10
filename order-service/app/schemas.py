from pydantic import BaseModel, Field
from typing import List
from uuid import uuid4


class Product(BaseModel):
    id: int
    name: str
    price: float
    quantity: int


class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    items: List[Product]
    total: float
    status: str = "pending"

from pydantic import BaseModel, Field
from typing import List
from uuid import uuid4


class OrderItem(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    items: List[OrderItem]


class Product(BaseModel):
    id: int
    name: str
    price: float


class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    items: List[OrderItem]
    total: float
    status: str = "pending"

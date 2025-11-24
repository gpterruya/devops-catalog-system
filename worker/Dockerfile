FROM python:3.11-slim AS builder
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
RUN useradd -m worker
WORKDIR /app

COPY --from=builder /usr/local /usr/local
ENV PATH=/root/.local/bin:$PATH

COPY worker.py .

USER worker

CMD ["python", "worker.py"]

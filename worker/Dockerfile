FROM python:3.11-slim AS builder
WORKDIR /app

COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
RUN useradd -m worker
WORKDIR /app

COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

COPY worker.py .

USER worker

CMD ["python", "worker.py"]

FROM python:3.11-slim AS builder
WORKDIR /app

COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
RUN useradd -m appuser
WORKDIR /app

COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

COPY app ./app
USER appuser

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

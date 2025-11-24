# ===========================
# Etapa 1: build
# ===========================
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ===========================
# Etapa 2: runtime
# ===========================
FROM python:3.11-slim

# Cria usuário não-root
RUN useradd -m appuser

WORKDIR /app

# Copia libs instaladas globalmente
COPY --from=builder /usr/local /usr/local

# Copia o código do serviço
COPY app ./app

USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

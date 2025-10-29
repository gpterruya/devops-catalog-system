# ===========================
# Etapa 1: build
# ===========================
FROM python:3.11-slim AS builder

WORKDIR /app

# Copia e instala dependências (em uma camada isolada)
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# ===========================
# Etapa 2: runtime
# ===========================
FROM python:3.11-slim

# Cria usuário não-root
RUN useradd -m appuser

WORKDIR /app

# Copia dependências da etapa anterior
COPY --from=builder /root/.local /root/.local

# Ajusta PATH
ENV PATH=/root/.local/bin:$PATH

# Copia o código do serviço
COPY app ./app

USER appuser

# Exposição padrão do FastAPI
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

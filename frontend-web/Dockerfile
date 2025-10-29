# ===========================
# Etapa 1: build
# ===========================
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===========================
# Etapa 2: serve estático
# ===========================
FROM nginx:1.27-alpine

# Remove default index
RUN rm -rf /usr/share/nginx/html/*

# Copia build da etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

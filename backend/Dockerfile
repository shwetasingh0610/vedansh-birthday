# ---------- Stage 1 : Build ----------
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npm run build


# ---------- Stage 2 : Production ----------
FROM node:20-bookworm-slim

WORKDIR /app

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
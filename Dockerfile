FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM node:20-alpine AS runner

ARG PREVIEW_PORT=25450
ENV PREVIEW_PORT=${PREVIEW_PORT}

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE ${PREVIEW_PORT}

CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PREVIEW_PORT}"]

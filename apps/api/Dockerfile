# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/database/package*.json ./packages/database/
COPY packages/types/package*.json ./packages/types/
RUN npm ci

COPY . .
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN npx turbo run build --filter=@magic-portfolio/api

# Stage 2: Runner
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist

EXPOSE 4000
CMD ["node", "apps/api/dist/main"]

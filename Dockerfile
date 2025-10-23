# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install --frozen-lockfile

# Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all files and run next
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY --from=builder /app .

# Change to the nodejs user
USER nodejs

EXPOSE 3000

CMD ["npm", "start"]
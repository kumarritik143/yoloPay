# Use a Node.js base image for building the React Native app
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
COPY package.json ./

# Install dependencies.  Use npm ci for production, npm install for development
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm install; fi

# Copy the rest of the application code
COPY . .

# Build the React Native application (no build step needed for bare react native)
# RUN npm run build # No build script provided, skipping

# Use a smaller base image for the final production image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on (default React Native port is 8081)
EXPOSE 8081

# Define environment variables (example)
ENV NODE_ENV production

# Health check (example - adjust to your app's needs)
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8081 || exit 1

# Command to start the application
CMD ["npm", "start"]
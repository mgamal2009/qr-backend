FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies (openssl + libc)
RUN apk add --no-cache openssl libc6-compat

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy all source code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build TypeScript
RUN pnpm build

# Expose backend port
EXPOSE 4000

# Start backend
CMD ["pnpm", "dev"]

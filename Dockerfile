# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Serve with Node.js backend
FROM node:20-alpine
WORKDIR /app/server
# Copy backend dependencies
COPY server/package*.json ./
RUN npm install --production
# Copy backend code
COPY server/ ./
# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/client/dist ../client/dist

EXPOSE 5000
CMD ["npm", "start"]

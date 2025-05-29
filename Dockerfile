# Stage 1: Build frontend
FROM node:20-alpine as frontend

WORKDIR /app/frontend
COPY todo-frontend/package*.json ./
RUN npm install
COPY todo-frontend .
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine as backend

WORKDIR /app

# Copy backend files
COPY package*.json tsconfig.json ./
COPY src ./src

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run build

# Copy frontend static files into public
RUN mkdir -p ./public
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000

CMD ["npm", "run", "start"]

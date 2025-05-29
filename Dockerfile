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

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

RUN mkdir -p ./public
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000
CMD ["npm", "run", "start"]

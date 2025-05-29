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
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npm install

RUN npx prisma generate

RUN npm run build

RUN ls -al dist/db

RUN mkdir -p ./public
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000

CMD ["npm", "run", "start"]

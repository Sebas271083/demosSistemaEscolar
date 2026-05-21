FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN npm install -g http-server

EXPOSE 3000

CMD ["http-server", "dist", "-p", "3000", "-c-1", "-a", "0.0.0.0", "--spa"]
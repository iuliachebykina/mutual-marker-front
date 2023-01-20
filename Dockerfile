FROM node:14.18.1-alpine3.14 AS build-img
WORKDIR main

COPY main/package.json ./package.json
RUN npm install
RUN npm run build

COPY main ./
RUN npm run prod-parallel

FROM nginx:latest
COPY --from=build-img main/dist /usr/share/nginx/html

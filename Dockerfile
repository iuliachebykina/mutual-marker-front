FROM node:14.18.1-alpine3.14 AS build-img
WORKDIR main

COPY main/package.json ./package.json
RUN npm install

COPY main ./
RUN npm run build

FROM nginx:latest
COPY --from=build-img main/dist /usr/share/nginx/html
EXPOSE 80

FROM node:14.18.1-alpine3.14 AS build-img
WORKDIR main

COPY main/package.json ./package.json
RUN npm install

COPY main ./
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-img /main/dist/project-proverka /usr/share/nginx/html
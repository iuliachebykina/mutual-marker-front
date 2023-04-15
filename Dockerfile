# Stage 1
FROM node:lts AS build-img
WORKDIR main

COPY main/package*.json ./

RUN npm install

COPY main .
RUN npm run build

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-img /main/dist/project-proverka  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
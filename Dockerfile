FROM node:12.10.0-alpine as node

#ARG ENVIRONMENT=dev

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/app/dist/force-Covid19-frontend /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

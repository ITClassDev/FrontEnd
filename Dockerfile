FROM node:19-alpine

WORKDIR /web
COPY ./app /web

RUN npm install pm2
RUN npm ci
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
#CMD [ "npx", "serve", "build" ]

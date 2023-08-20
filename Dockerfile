FROM node:19-alpine

WORKDIR /web
COPY ./app /web

RUN yarn add pm2
#RUN yarn install --frozen-lockfile
RUN yarn build
ENV NODE_ENV production
EXPOSE 3000
#CMD [ "npx", "serve", "build" ]
#CMD ["npx", "pm2", "serve", "build", "--spa", "--port", "3000"]
#CMD ["sleep", "infinity"]
#CMD ["tail", "-f", "/dev/null"]
#CMD ["npx", "pm2", "--no-daemon", "serve", "build", "--port", "3000"]


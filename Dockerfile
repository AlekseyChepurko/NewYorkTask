FROM node:alpine

RUN mkdir /server

WORKDIR /server

COPY app/package.json /server/package.json

RUN npm install

COPY app /server

EXPOSE 3000
EXPOSE 27017

CMD npm start
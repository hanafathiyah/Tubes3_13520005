FROM node:16
RUN mkdir -p /app

COPY . /app
RUN npm install 

CMD npm run migration ; npm run serve

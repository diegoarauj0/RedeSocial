FROM node:latest

WORKDIR /app/server
COPY . /app/server

RUN npm i 
RUN npm i -g typescript
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
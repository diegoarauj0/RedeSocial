FROM node:latest

WORKDIR /app/client
COPY . /app/client

RUN npm i 
RUN npm i -g typescript
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
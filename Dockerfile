FROM node:14.16.0 

WORKDIR /home/node/app

COPY . .
RUN npm i
EXPOSE 2314
CMD ["npm", "start"]
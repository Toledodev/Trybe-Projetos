FROM node:14-alpine AS build
COPY . /app
EXPOSE 3000
WORKDIR /app
ADD node_modules.tar.gz .
CMD ["npm", "start"]


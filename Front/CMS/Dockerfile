FROM node:13.8.0-alpine3.11

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install any needed packages
RUN npm i

# Bundle app source
COPY . .

EXPOSE 2000

CMD [ "npm", "start" ]